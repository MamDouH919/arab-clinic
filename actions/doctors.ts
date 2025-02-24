
"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import { AddDoctorsSchema, UpdateClientsSchema } from "@/schemas"
import { storage } from '@/firebase'
import { deleteObject, ref } from 'firebase/storage'
import { saveImage } from "./saveImage"

export async function getDoctorById(id: string) {
    const doctor = await db.doctors.findUnique({
        where: { id },
        select: {
            id: true,
            nameAr: true,
            name: true,
            imagePath: true,
            expertise: true,
            expertiseAr: true,
            createdAt: true,
            imageName: true,
            branchId: true,
            serviceId: true
        }
    });
    return doctor;
}

export async function getDoctors(filters?: {
    serviceId?: string
    name?: string
    nameAr?: string
}) {
    const doctor = await db.doctors.findMany({
        where: filters ?
            {
                ...(filters.name && {
                    name: {
                        contains: filters.name,
                    }
                }),
                ...(filters.nameAr && {
                    nameAr: {
                        contains: filters.nameAr,
                    }
                }),
                ...(filters.serviceId && {
                    serviceId: filters.serviceId
                }),
            }
            : {},
        select: {
            id: true,
            nameAr: true,
            name: true,
            imagePath: true,
            expertise: true,
            expertiseAr: true,
        }
    });
    return doctor;
}


export async function deleteDoctor(id: string) {
    const doctor = await db.doctors.delete({ where: { id } })

    if (doctor == null) return notFound()

    const imageName = doctor.imageName
    if (imageName) {
        const desertRef = ref(storage, imageName);
        deleteObject(desertRef)
    }


    revalidatePath("/")
    revalidatePath("/admin/doctors")
}

export async function addDoctor(formData: FormData) {
    const name = formData.get("name") as string;
    const nameAr = formData.get("nameAr") as string;
    const branchId = formData.get("branchId") as string;
    const expertise = formData.get("expertise") as string;
    const serviceId = formData.get("serviceId") as string;
    const expertiseAr = formData.get("expertiseAr") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        name,
        nameAr,
        branchId,
        expertise,
        serviceId,
        expertiseAr,
        ...(image && { image })
    };

    const result = AddDoctorsSchema.safeParse(parsedData)

    if (!result.success) {
        return {
            status: "error",
            data: result.error.formErrors.fieldErrors
        };
    }

    const data = result.data;

    if (data.image) {
        const { imagePath, imageName } = await saveImage(data.image!, "doctors", data.name + "-" + data.nameAr)

        await db.doctors.create({
            data: {
                nameAr: data.nameAr,
                name: data.name,
                expertise: data.expertise,
                imagePath: imagePath,
                imageName: imageName,
                expertiseAr: data.expertiseAr,
                branchId: data.branchId,
                serviceId: data.serviceId
            }
        })
    } else {
        await db.doctors.create({
            data: {
                nameAr: data.nameAr,
                name: data.name,
                expertise: data.expertise,
                expertiseAr: data.expertiseAr,
                branchId: data.branchId,
                serviceId: data.serviceId
            }
        })
    }

    revalidatePath("/")
    revalidatePath("/clients")
    revalidatePath("/admin/clients")
}

export async function updateDoctor(formData: FormData, id: string) {
    const name = formData.get("name") as string;
    const nameAr = formData.get("nameAr") as string;
    const branchId = formData.get("branchId") as string;
    const expertise = formData.get("expertise") as string;
    const serviceId = formData.get("serviceId") as string;
    const expertiseAr = formData.get("expertiseAr") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        name,
        nameAr,
        branchId,
        expertise,
        serviceId,
        expertiseAr,
        ...(image && { image })
    };

    const result = AddDoctorsSchema.safeParse(parsedData)

    if (!result.success) {
        return {
            status: "error",
            data: result.error.formErrors.fieldErrors
        };
    }

    const data = result.data
    const doctor = await db.doctors.findUnique({ where: { id } })

    if (doctor == null) return notFound()

    let prevImageName = doctor.imageName

    if (data.image != null && prevImageName && data.image.size > 0) {
        const desertRef = ref(storage, prevImageName);
        deleteObject(desertRef)

        const { imagePath, imageName } = await saveImage(data.image!, "doctors", data.name + "-" + data.nameAr)
        await db.doctors.update({
            where: { id },
            data: {
                nameAr: data.nameAr,
                name: data.name,
                expertise: data.expertise,
                imagePath: imagePath,
                imageName: imageName,
                expertiseAr: data.expertiseAr,
                branchId: data.branchId,
                serviceId: data.serviceId
            },
        })

        return {
            status: "done",
            data: {
                id: id,
                nameAr: data.nameAr,
                name: data.name,
                expertise: data.expertise,
                expertiseAr: data.expertiseAr,
                branchId: data.branchId,
                serviceId: data.serviceId,
                imagePath: imagePath,
            }
        }
    } else {
        await db.doctors.update({
            where: { id },
            data: {
                nameAr: data.nameAr,
                name: data.name,
                expertise: data.expertise,
                expertiseAr: data.expertiseAr,
                branchId: data.branchId,
                serviceId: data.serviceId
            },
        })

        return {
            status: "done",
            data: {
                id: id,
                nameAr: data.nameAr,
                name: data.name,
                expertise: data.expertise,
                expertiseAr: data.expertiseAr,
                branchId: data.branchId,
                serviceId: data.serviceId
            }
        }
    }
}

"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import { AddSchedulesSchema, UpdateSchedulesSchema } from "@/schemas"
import { saveImage } from "./saveImage"
import { storage } from "@/firebase"
import { deleteObject, ref } from "firebase/storage"

export async function getSchedules(filters?: {
    branchId?: string
}) {
    const schedules = await db.schedules.findMany({
        where: filters ?
            {
                ...(filters.branchId && {
                    branchId: filters.branchId
                }),

            }
            : {},
        select: {
            id: true,
            imageName: true,
            imagePath: true,
            branchId: true,
        },
        orderBy: { createdAt: "asc" },
    })

    console.log(schedules);


    return schedules
}

export async function deleteSchedule(id: string) {
    const schedule = await db.schedules.delete({ where: { id } })

    if (schedule == null) return notFound()

    const imageName = schedule.imageName
    const desertRef = ref(storage, imageName);

    deleteObject(desertRef)

    revalidatePath("/")
    revalidatePath("/admin/schedules")
}

export async function addSchedule(formData: FormData) {
    const branchId = formData.get("branchId") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        branchId,
        image,
    };

    const result = AddSchedulesSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    if (data.image) {
        const { imagePath, imageName } = await saveImage(data.image!, "schedules", "schedules")

        await db.schedules.create({
            data: {
                branchId: data.branchId,
                imageName: imageName,
                imagePath: imagePath,
            }
        })
    }

    revalidatePath("/")
    revalidatePath("/schedules")
    revalidatePath("/admin/schedules")
}

export async function updateSchedule(formData: FormData, id: string) {
    const branchId = formData.get("branchId") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        branchId,
        ...(image && { image })
    };

    const result = UpdateSchedulesSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data
    const schedule = await db.schedules.findUnique({ where: { id } })

    if (schedule == null) return notFound()

    let prevImageName = schedule.imageName

    if (data.image != null && data.image.size > 0) {
        const desertRef = ref(storage, prevImageName);
        deleteObject(desertRef)

        const { imagePath, imageName } = await saveImage(data.image!, "schedules", "schedules")
        await db.schedules.update({
            where: { id },
            data: {
                branchId: data.branchId,
                imageName: imageName,
                imagePath: imagePath,
            },
        })
    } else {
        await db.schedules.update({
            where: { id },
            data: {
                branchId: data.branchId,
            },
        })
    }

    revalidatePath("/")
    revalidatePath("/schedules")
    revalidatePath("/admin/schedules")
}

export async function getScheduleById(id: string) {
    const schedules = await db.schedules.findUnique({
        where: { id },
        select: {
            id: true,
            branchId: true,
            imageName: true,
            imagePath: true,
        }
    });
    return schedules;
}

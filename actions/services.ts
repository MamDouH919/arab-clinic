"use server"

import db from "@/db/db"
import { revalidatePath } from "next/cache"
import { AddServicesSchema, ServicesImagesSchema, UpdateServicesSchema } from "@/schemas";
import { notFound } from "next/navigation";
import { saveImage } from "./saveImage";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/firebase";

export async function getServices() {
    const services = await db.services.findMany({
        select: {
            id: true,
            title: true,
            titleAr: true,
        }
    });
    return services;
}

export async function deleteServiceImage(id: string, imageName: string) {
    const desertRef = ref(storage, imageName);
    deleteObject(desertRef)
    await db.servicesImages.delete({ where: { id } })

    return "done"
}

export async function saveServiceImage(id: string, formData: FormData) {
    const image = formData.get("image") as File | null;

    const result = ServicesImagesSchema.safeParse({ image });
    const data = result.data;

    if (!result.success) {
        return {
            status: "error",
            errors: result.error.formErrors.fieldErrors
        }
    } else {
        const { imagePath, imageName } = await saveImage(data?.image!, "services", "services-image");

        const imageData = await db.servicesImages.create({
            data: {
                imageName: imageName,
                imagePath: imagePath,
                serviceId: id
            }
        });

        return {
            status: "done",
            data: imageData
        }
    }
}

export async function getServicesById(id: string) {
    const service = await db.services.findUnique({
        where: { id },
        select: {
            id: true,
            titleAr: true,
            title: true,
            descriptionAr: true,
            description: true,
            coverImgName: true,
            coverImgPath: true,
            iconName: true,
            iconPath: true,
            servicesImages: true,
            minDescription: true,
            minDescriptionAr: true,
            videos: true
        }
    });
    return service;
}

export async function deleteService(id: string) {
    try {
        // Find the service and its associated images
        const service = await db.services.findUnique({
            where: { id },
            include: { servicesImages: true } // Include images in the service object
        });

        if (!service) {
            return notFound();
        }

        // Delete images from storage
        await Promise.all(
            service.servicesImages.map(async (element) => {
                const desertRef = ref(storage, element.imageName);
                await deleteObject(desertRef); // Deleting image from storage
            })
        );

        // Delete images from the database
        await db.servicesImages.deleteMany({ where: { serviceId: id } });

        // Now delete the service itself
        await db.services.delete({ where: { id } });

        // Delete icon and cover images from storage
        const desertRefIcon = ref(storage, service.iconName);
        const desertRefCover = ref(storage, service.coverImgName);
        await Promise.all([
            deleteObject(desertRefIcon),
            deleteObject(desertRefCover),
        ]);

        // Revalidate paths
        revalidatePath("/");
        revalidatePath("/admin/services");

    } catch (error) {
        console.error("Error deleting service:", error);
        // Handle error appropriately
    }
}


export async function addServices(formData: FormData) {
    const titleAr = formData.get("titleAr") as string;
    const title = formData.get("title") as string;
    const minDescriptionAr = formData.get("minDescriptionAr") as string;
    const minDescription = formData.get("minDescription") as string;
    const descriptionAr = formData.get("descriptionAr") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const videos = formData.get("videos") as string;
    const coverImg = formData.get("coverImg") as File;
    const imgOne = formData.get("imgOne") as File | null;
    const imgTwo = formData.get("imgTwo") as File | null;
    const imgThree = formData.get("imgThree") as File | null;

    const parsedData = {
        titleAr,
        title,
        descriptionAr,
        description,
        icon,
        coverImg,
        videos,
        minDescriptionAr,
        minDescription,
        ...(imgOne && { imgOne: imgOne }),
        ...(imgTwo && { imgTwo: imgTwo }),
        ...(imgThree && { imgThree: imgThree }),
    };

    const result = AddServicesSchema.safeParse(parsedData);
    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    if (data.icon && data.coverImg) {
        // Save the icon and cover image
        const { imagePath: iconImagePath, imageName: iconImageName } = await saveImage(data.icon!, "services", data.title + "-" + data.titleAr);
        const { imagePath: coverImagePath, imageName: coverImageName } = await saveImage(data.coverImg!, "services", data.title + "-" + data.titleAr);

        // Create the service in the database
        await db.services.create({
            data: {
                title: data.title,
                titleAr: data.titleAr,
                minDescriptionAr: data.minDescriptionAr,
                minDescription: data.minDescription,
                descriptionAr: data.descriptionAr,
                description: data.description,
                iconPath: iconImagePath,
                iconName: iconImageName,
                coverImgName: coverImageName,
                coverImgPath: coverImagePath,
                videos: data.videos
            },
        });
    }

    // Revalidate paths to update the frontend
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/services");
}

export async function updateServices(formData: FormData, id: string) {
    const titleAr = formData.get("titleAr") as string;
    const title = formData.get("title") as string;
    const descriptionAr = formData.get("descriptionAr") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as File | null;
    const imgOne = formData.get("imgOne") as File | null;
    const imgTwo = formData.get("imgTwo") as File | null;
    const imgThree = formData.get("imgThree") as File | null;
    const coverImg = formData.get("coverImg") as File | null;
    const videos = formData.get("videos") as string | null;
    const minDescriptionAr = formData.get("minDescriptionAr") as string;
    const minDescription = formData.get("minDescription") as string;

    const parsedData = {
        titleAr,
        title,
        descriptionAr,
        description,
        minDescriptionAr,
        minDescription,
        ...(imgOne && { imgOne }),
        ...(imgTwo && { imgTwo }),
        ...(imgThree && { imgThree }),
        ...(icon && { icon }),
        ...(coverImg && { coverImg }),
        videos,
    };

    const result = UpdateServicesSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data
    const service = await db.services.findUnique({ where: { id } })

    if (service == null) return notFound()

    let prevIconName = service.iconName
    let prevCoverImgName = service.coverImgName

    if ((data.icon != null && data.icon.size > 0) || (data.coverImg != null && data.coverImg.size > 0)) {
        let newIconPath, newIconName, newCoverPath, newCoverName

        if (data.icon != null && data.icon.size > 0) {
            const desertRef = ref(storage, prevIconName);
            deleteObject(desertRef)

            const { imagePath, imageName } = await saveImage(data.icon!, "services", data.title + "-" + data.titleAr)
            newIconPath = imagePath
            newIconName = imageName
        }
        if (data.coverImg != null && data.coverImg.size > 0) {
            const desertRef = ref(storage, prevCoverImgName);
            deleteObject(desertRef)

            const { imagePath, imageName } = await saveImage(data.coverImg!, "services", data.title + "-" + data.titleAr)
            newCoverPath = imagePath
            newCoverName = imageName
        }


        await db.services.update({
            where: { id },
            data: {
                title: data.title,
                titleAr: data.titleAr,
                minDescriptionAr: data.minDescriptionAr,
                minDescription: data.minDescription,
                descriptionAr: data.descriptionAr,
                description: data.description,
                videos: data.videos,
                ...(newIconPath && {
                    iconPath: newIconPath,
                    iconName: newIconName,
                }),
                ...(newCoverPath && {
                    coverImgName: newCoverName,
                    coverImgPath: newCoverPath,
                })
            },
        })
    }
    else {
        await db.services.update({
            where: { id },
            data: {
                title: data.title,
                minDescription: data.minDescription,
                minDescriptionAr: data.minDescriptionAr,
                titleAr: data.titleAr,
                descriptionAr: data.descriptionAr,
                description: data.description,
                ...(data.videos && { videos: data.videos })
            },
        })
    }

    revalidatePath("/")
    revalidatePath("/services")
    revalidatePath("/admin/services")
}
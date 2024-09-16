"use server"

import db from "@/db/db"
import { revalidatePath } from "next/cache"
import fs from "fs/promises"
import { AddServicesSchema, UpdateServicesSchema } from "@/schemas";
import { notFound } from "next/navigation";
import { isValidObjectId } from "@/component/helperFunctions/isValidObjectId";

export async function getServicesById(id: string) {
    const check = isValidObjectId(id)
    if (!check) return null

    const service = await db.services.findUnique({
        where: { id },
        select: {
            id: true,
            titleAr: true,
            title: true,
            descriptionAr: true,
            description: true,
            coverImg: true,
            icon: true,
            imgOne: true,
            imgTwo: true,
            imgThree: true,
        }
    });
    return service;
}

export async function addServices(formData: FormData) {
    const titleAr = formData.get("titleAr") as string;
    const title = formData.get("title") as string;
    const descriptionAr = formData.get("descriptionAr") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const imgOne = formData.get("imgOne") as string | null;
    const imgTwo = formData.get("imgTwo") as string | null;
    const imgThree = formData.get("imgThree") as string | null;
    const coverImg = formData.get("coverImg") as File;

    const parsedData = {
        titleAr,
        title,
        descriptionAr,
        description,
        icon,
        ...(imgOne && { imgOne: imgOne }),
        ...(imgTwo && { imgTwo: imgTwo }),
        ...(imgThree && { imgThree: imgThree }),
        coverImg,
    };

    const result = AddServicesSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    if (data.icon && data.coverImg) {
        await fs.mkdir("public/services", { recursive: true })
        const icon = `/services/${crypto.randomUUID()}-${data.icon.name}`
        const coverImg = `/services/${crypto.randomUUID()}-${data.coverImg.name}`
        let imgOne, imgTwo, imgThree
        await fs.writeFile(
            `public${icon}`,
            Buffer.from(await data.icon.arrayBuffer())
        )
        await fs.writeFile(
            `public${coverImg}`,
            Buffer.from(await data.coverImg.arrayBuffer())
        )

        if (data.imgOne) {
            imgOne = `/services/${crypto.randomUUID()}-${data.imgOne.name}`
            await fs.writeFile(
                `public${imgOne}`,
                Buffer.from(await data.imgOne.arrayBuffer())
            )
        }

        if (data.imgTwo) {
            imgTwo = `/services/${crypto.randomUUID()}-${data.imgTwo.name}`
            await fs.writeFile(
                `public${imgTwo}`,
                Buffer.from(await data.imgTwo.arrayBuffer())
            )
        }

        if (data.imgThree) {
            imgThree = `/services/${crypto.randomUUID()}-${data.imgThree.name}`
            await fs.writeFile(
                `public${imgThree}`,
                Buffer.from(await data.imgThree.arrayBuffer())
            )
        }

        await db.services.create({
            data: {
                title: data.title,
                titleAr: data.titleAr,
                descriptionAr: data.descriptionAr,
                description: data.description,
                icon,
                coverImg,
                ...(imgOne && { imgOne: imgOne }),
                ...(imgTwo && { imgTwo: imgTwo }),
                ...(imgThree && { imgThree: imgThree }),
            }
        })
    }

    revalidatePath("/")
    revalidatePath("/services")
    revalidatePath("/admin/services")
}

export async function updateServices(formData: FormData, id: string) {
    const titleAr = formData.get("titleAr") as string;
    const title = formData.get("title") as string;
    const descriptionAr = formData.get("descriptionAr") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as File | null;
    const imgOne = formData.get("imgOne") as string | null;
    const imgTwo = formData.get("imgTwo") as string | null;
    const imgThree = formData.get("imgThree") as string | null;
    const coverImg = formData.get("coverImg") as File | null;

    const parsedData = {
        titleAr,
        title,
        descriptionAr,
        description,
        icon,
        ...(imgOne && { imgOne: imgOne }),
        ...(imgTwo && { imgTwo: imgTwo }),
        ...(imgThree && { imgThree: imgThree }),
        coverImg,
    };

    console.log(parsedData);


    const result = UpdateServicesSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data
    const service = await db.services.findUnique({ where: { id } })

    if (service == null) return notFound()

    let iconPath = service.icon
    if (data.icon != null && data.icon.size > 0) {
        await fs.unlink(`public${service.icon}`)
        iconPath = `/services/${crypto.randomUUID()}-${data.icon.name}`
        await fs.writeFile(
            `public${iconPath}`,
            Buffer.from(await data.icon.arrayBuffer())
        )
    }
    let coverImgPath = service.coverImg
    if (data.coverImg != null && data.coverImg.size > 0) {
        await fs.unlink(`public${service.coverImg}`)

        coverImgPath = `/services/${crypto.randomUUID()}-${data.coverImg.name}`
        await fs.writeFile(
            `public${coverImgPath}`,
            Buffer.from(await data.coverImg.arrayBuffer())
        )
    }
    let imgOnePath = service.imgOne
    if (data.imgOne != null && data.imgOne.size > 0) {
        if (service.imgOne) {
            await fs.unlink(`public${service.imgOne}`)
        }
        imgOnePath = `/services/${crypto.randomUUID()}-${data.imgOne.name}`
        await fs.writeFile(
            `public${imgOnePath}`,
            Buffer.from(await data.imgOne.arrayBuffer())
        )
    }
    let imgTwoPath = service.imgTwo
    if (data.imgTwo != null && data.imgTwo.size > 0) {
        if (service.imgTwo) {
            await fs.unlink(`public${service.imgTwo}`)
        }
        imgTwoPath = `/services/${crypto.randomUUID()}-${data.imgTwo.name}`
        await fs.writeFile(
            `public${imgTwoPath}`,
            Buffer.from(await data.imgTwo.arrayBuffer())
        )
    }
    let imgThreePath = service.imgThree
    if (data.imgThree != null && data.imgThree.size > 0) {
        if (service.imgThree) {
            await fs.unlink(`public${service.imgThree}`)
        }
        imgThreePath = `/services/${crypto.randomUUID()}-${data.imgThree.name}`
        await fs.writeFile(
            `public${imgThreePath}`,
            Buffer.from(await data.imgThree.arrayBuffer())
        )
    }

    await db.services.update({
        where: { id },
        data: {
            title: data.title,
            titleAr: data.titleAr,
            descriptionAr: data.descriptionAr,
            description: data.description,
            icon: iconPath,
            coverImg: coverImgPath,
            ...(imgOnePath && { imgOne: imgOnePath }),
            ...(imgTwoPath && { imgTwo: imgTwoPath }),
            ...(imgThreePath && { imgThree: imgThreePath }),
        },
    })


    revalidatePath("/")
    revalidatePath("/services")
    revalidatePath("/admin/services")
}
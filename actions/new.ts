
"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import fs from "fs/promises"
import * as z from "zod"
import { AddNewsSchema, UpdateNewsSchema } from "@/schemas"

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
    file => file.size === 200 || file.type.startsWith("image/")
)

export async function deleteNews(id: string) {
    const news = await db.news.delete({ where: { id } })

    if (news == null) return notFound()

    await fs.unlink(`public${news.image}`)

    revalidatePath("/")
    revalidatePath("/admin/news")
}

export async function addNews(formData: FormData) {
    const titleAr = formData.get("titleAr") as string;
    const title = formData.get("title") as string;
    const descriptionAr = formData.get("descriptionAr") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        titleAr,
        title,
        descriptionAr,
        description,
        image,
    };

    const result = AddNewsSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    if (data.image) {
        await fs.mkdir("public/news", { recursive: true })
        const image = `/news/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(
            `public${image}`,
            Buffer.from(await data.image.arrayBuffer())
        )

        await db.news.create({
            data: {
                titleAr: data.titleAr,
                title: data.title,
                descriptionAr: data.descriptionAr,
                description: data.description,
                image,
            }
        })
    }

    revalidatePath("/")
    revalidatePath("/news")
    revalidatePath("/admin/news")
}

export async function updateNews(formData: FormData, id: string) {
    const titleAr = formData.get("titleAr") as string;
    const title = formData.get("title") as string;
    const descriptionAr = formData.get("descriptionAr") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        titleAr,
        title,
        descriptionAr,
        description,
        image,
    };

    const result = UpdateNewsSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data
    const news = await db.news.findUnique({ where: { id } })

    if (news == null) return notFound()

    let imagePath = news.image
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${news.image}`)
        imagePath = `/news/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(
            `public${imagePath}`,
            Buffer.from(await data.image.arrayBuffer())
        )
    }

    await db.news.update({
        where: { id },
        data: {
            titleAr: data.titleAr,
            title: data.title,
            descriptionAr: data.descriptionAr,
            description: data.description,
            image: imagePath,
        },
    })

    revalidatePath("/")
    revalidatePath("/news")
    revalidatePath("/admin/news")
}

export async function getNewsById(id: string) {
    const news = await db.news.findUnique({
        where: { id },
        select: {
            id: true,
            titleAr: true,
            title: true,
            descriptionAr: true,
            description: true,
            image: true,
        }
    });
    return news;
}

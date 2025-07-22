
"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import { AddArticlesSchema, UpdateArticlesSchema } from "@/schemas"
import { saveImage } from "./saveImage"
import { deleteObject, ref } from "firebase/storage"
import { storage } from "@/firebase"

export async function deleteArticles(id: string) {
    const articles = await db.articles.delete({ where: { id } })

    if (articles == null) return notFound()

    const imageName = articles.imageName
    const desertRef = ref(storage, imageName);
    deleteObject(desertRef)

    revalidatePath("/")
    revalidatePath("/admin/articles")
}

export async function addArticles(formData: FormData) {
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

    const result = AddArticlesSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    if (data.image) {
        const { imagePath, imageName } = await saveImage(data.image!, "articles", data.title + "-" + data.titleAr)
        await db.articles.create({
            data: {
                titleAr: data.titleAr,
                title: data.title,
                descriptionAr: data.descriptionAr,
                description: data.description,
                imagePath: imagePath,
                imageName: imageName,
            }
        })
    }

    revalidatePath("/")
    revalidatePath("/articles")
    revalidatePath("/admin/articles")
}

export async function updateArticles(formData: FormData, id: string) {
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
        ...(image && { image })
    };

    const result = UpdateArticlesSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data
    const articles = await db.articles.findUnique({ where: { id } })

    if (articles == null) return notFound()

    let prevImageName = articles.imageName

    if (data.image != null && data.image.size > 0) {
        const desertRef = ref(storage, prevImageName);
        deleteObject(desertRef)

        const { imagePath, imageName } = await saveImage(data.image!, "articles", data.title + "-" + data.titleAr)
        await db.articles.update({
            where: { id },
            data: {
                titleAr: data.titleAr,
                title: data.title,
                descriptionAr: data.descriptionAr,
                description: data.description,
                imageName: imageName,
                imagePath: imagePath
            },
        })
    } else {
        await db.articles.update({
            where: { id },
            data: {
                titleAr: data.titleAr,
                title: data.title,
                descriptionAr: data.descriptionAr,
                description: data.description,
            },
        })
    }



    revalidatePath("/")
    revalidatePath("/articles")
    revalidatePath("/admin/articles")
}

export async function getArticlesById(id: string) {
    const articles = await db.articles.findUnique({
        where: { id },
        select: {
            id: true,
            titleAr: true,
            title: true,
            descriptionAr: true,
            description: true,
            imagePath: true,
        }
    });
    return articles;
}

"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { AddHighlightsSchema } from "@/schemas"

export async function getHighlight(id: number) {
    const highlight = await db.highlights.findUnique({ where: { id } });
    return highlight;
}

export async function addHighlights(formData: z.infer<typeof AddHighlightsSchema>) {
    const result = AddHighlightsSchema.safeParse(formData)
    console.log(result)

    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    await db.highlights.create({
        data: {
            nameEn: result.data.nameEn,
            nameAr: result.data.nameAr,
            number: result.data.number,
        }
    })
}

export async function updateHighlights(formData: z.infer<typeof AddHighlightsSchema>, id: number) {
    const result = AddHighlightsSchema.safeParse(formData)

    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    await db.highlights.update({
        where: { id },
        data: {
            nameEn: result.data.nameEn,
            nameAr: result.data.nameAr,
            number: result.data.number,
        }
    })

    revalidatePath("/admin")
    revalidatePath("/admin/highlights")
}

export async function deleteHighlights(id: number) {
    const product = await db.highlights.delete({ where: { id } })

    if (product == null) return notFound()

    revalidatePath("/")
    revalidatePath("/admin/highlights")
}


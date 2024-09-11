
"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import fs from "fs/promises"
import * as z from "zod"
import { AddClientsSchema, UpdateClientsSchema } from "@/schemas"
import { ClientType } from "@prisma/client"

// export async function getBranches() {
//     const branches = await db.branches.findMany({
//         select: {
//             id: true,
//             image: true,
//             nameAr: true,
//             name: true,
//             locationAr: true,
//             location: true,
//             mobile: true,
//             whatsApp: true,
//         },
//         orderBy: { createdAt: "asc" },
//     })

//     return branches
// }

export async function getClientsById(id: string) {
    const client = await db.clients.findUnique({
        where: { id },
        select: {
            id: true,
            nameAr: true,
            name: true,
            type: true,
            createdAt: true,
            image: true,
        }
    });
    return client;
}


export async function deleteClient(id: string) {
    const client = await db.clients.delete({ where: { id } })

    if (client == null) return notFound()

    await fs.unlink(`public${client.image}`)

    revalidatePath("/")
    revalidatePath("/admin/clients")
}

export async function addClient(formData: FormData) {
    const name = formData.get("name") as string;
    const nameAr = formData.get("nameAr") as string;
    const type = formData.get("type") as ClientType;
    const image = formData.get("image") as File | null;

    const parsedData = {
        name,
        nameAr,
        type,
        image,
    };

    const result = AddClientsSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    if (data.image) {
        await fs.mkdir("public/clients", { recursive: true })
        const image = `/clients/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(
            `public${image}`,
            Buffer.from(await data.image.arrayBuffer())
        )

        await db.clients.create({
            data: {
                nameAr: data.nameAr,
                name: data.name,
                type: ClientType[data.type as keyof typeof ClientType],
                image,
            }
        })
    }

    revalidatePath("/")
    revalidatePath("/clients")
    revalidatePath("/admin/clients")
}

export async function updateClient(formData: FormData, id: string) {
    const name = formData.get("name") as string;
    const nameAr = formData.get("nameAr") as string;
    const type = formData.get("type") as string;
    const image = formData.get("image") as File | null;;

    const parsedData = {
        name,
        nameAr,
        type,
        image,
    };
    const result = UpdateClientsSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data
    const client = await db.clients.findUnique({ where: { id } })

    if (client == null) return notFound()

    let imagePath = client.image
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${client.image}`)
        imagePath = `/clients/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(
            `public${imagePath}`,
            Buffer.from(await data.image.arrayBuffer())
        )
    }

    await db.clients.update({
        where: { id },
        data: {
            nameAr: data.nameAr,
            name: data.name,
            type: ClientType[data.type as keyof typeof ClientType],
            image: imagePath,
        },
    })

    revalidatePath("/")
    revalidatePath("/clients")
    revalidatePath("/admin/clients")
}
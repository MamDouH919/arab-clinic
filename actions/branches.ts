
"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import fs from "fs/promises"
import * as z from "zod"
import { AddBranchesSchema, UpdateBranchesSchema } from "@/schemas"
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
    file => file.size === 200 || file.type.startsWith("image/")
)

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID || 'AKIA4AQ3UJQNGJGUI6YZ',
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY || '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',
    },
});

async function uploadFileToS3(file: any, fileName: string) {
    const fileBuffer = file

    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
        Key: `${fileName}`,
        Body: fileBuffer,
        ContentType: "image/jpg",
    };

    const command = new PutObjectCommand(params);
    try {
        const response = await s3Client.send(command);
        console.log("File uploaded successfully:", response);
        return fileName;
    } catch (error) {
        throw error;
    }
}


export async function getBranches() {
    const branches = await db.branches.findMany({
        select: {
            id: true,
            image: true,
            nameAr: true,
            name: true,
            locationAr: true,
            location: true,
            mobile: true,
            whatsApp: true,
        },
        orderBy: { createdAt: "asc" },
    })

    return branches
}

export async function getBranchesDropDown() {
    const branches = await db.branches.findMany({
        select: {
            nameAr: true,
            name: true,
        },
        orderBy: { createdAt: "asc" },
    })

    return branches
}



export async function deleteBranch(id: string) {
    const branch = await db.branches.delete({ where: { id } })

    if (branch == null) return notFound()

    await fs.unlink(`public${branch.image}`)

    revalidatePath("/")
    revalidatePath("/admin/branches")
}

export async function addBranch(formData: FormData) {
    const name = formData.get("name") as string;
    const nameAr = formData.get("nameAr") as string;
    const locationAr = formData.get("locationAr") as string;
    const location = formData.get("location") as string;
    const whatsApp = formData.get("whatsApp") as string;
    const mobile = formData.get("mobile") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        name,
        nameAr,
        locationAr,
        location,
        whatsApp,
        mobile,
        image,
    };

    const result = AddBranchesSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    if (data.image) {
        // await fs.mkdir("public/branches", { recursive: true })
        const image = `/branches/${crypto.randomUUID()}-${data.image.name}`
        // await fs.writeFile(
        //     `public${image}`,
        //     Buffer.from(await data.image.arrayBuffer())
        // )

        const buffer = Buffer.from(await data.image.arrayBuffer());
        await uploadFileToS3(buffer, image);

        await db.branches.create({
            data: {
                nameAr: data.nameAr,
                name: data.name,
                locationAr: data.locationAr,
                location: data.location,
                whatsApp: data.whatsApp,
                mobile: data.mobile,
                image,
            }
        }).catch((error) => {
            console.log(error)

            return error
        })
    }

    revalidatePath("/")
    revalidatePath("/branches")
    revalidatePath("/admin/branches")
}

export async function updateBranch(formData: FormData, id: string) {
    const name = formData.get("name") as string;
    const nameAr = formData.get("nameAr") as string;
    const locationAr = formData.get("locationAr") as string;
    const location = formData.get("location") as string;
    const whatsApp = formData.get("whatsApp") as string;
    const mobile = formData.get("mobile") as string;
    const image = formData.get("image") as File | null;

    const parsedData = {
        name,
        nameAr,
        locationAr,
        location,
        whatsApp,
        mobile,
        image,
    };

    const result = UpdateBranchesSchema.safeParse(parsedData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data
    const branch = await db.branches.findUnique({ where: { id } })

    if (branch == null) return notFound()

    let imagePath = branch.image
    if (data.image != null && data.image.size > 0) {
        console.log(imagePath);
        const param = {
            Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME || 'arabclinic',
            Key: imagePath,
        }
        var deleteObjectRequest = new DeleteObjectCommand(param)
        await s3Client.send(deleteObjectRequest);

        imagePath = `/branches/${crypto.randomUUID()}-${data.image.name}`
        const buffer = Buffer.from(await data.image.arrayBuffer());
        await uploadFileToS3(buffer, imagePath);
        // await fs.unlink(`public${branch.image}`)
        // imagePath = `/branches/${crypto.randomUUID()}-${data.image.name}`
        // await fs.writeFile(
        //     `public${imagePath}`,
        //     Buffer.from(await data.image.arrayBuffer())
        // )
    }

    await db.branches.update({
        where: { id },
        data: {
            nameAr: data.nameAr,
            name: data.name,
            locationAr: data.locationAr,
            location: data.location,
            whatsApp: data.whatsApp,
            mobile: data.mobile,
            image: imagePath,
        },
    })

    revalidatePath("/")
    revalidatePath("/branches")
    revalidatePath("/admin/branches")
}

export async function getBranchById(id: string) {
    const branches = await db.branches.findUnique({
        where: { id },
        select: {
            id: true,
            nameAr: true,
            name: true,
            locationAr: true,
            location: true,
            whatsApp: true,
            mobile: true,
            image: true,
        }
    });
    return branches;
}

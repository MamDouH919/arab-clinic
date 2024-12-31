"use server"

import db from "@/db/db"

export async function getBranchesDropDown() {
    const branches = await db.branches.findMany({
        select: {
            nameAr: true,
            name: true,
            id: true
        },
        orderBy: { createdAt: "asc" },
    })

    return branches
}

export async function getServicesDropDown() {
    const services = await db.services.findMany({
        select: {
            title: true,
            titleAr: true,
            id: true
        },
        orderBy: { createdAt: "asc" },
    })

    return services
}

import About from '@/component/sections/About'
import Banner from '@/component/sections/Banner'
import BannerSwiper from '@/component/sections/BannerSwiper'
import Branches from '@/component/sections/Branches'
import Clients from '@/component/sections/Clients'
import Contact from '@/component/sections/Contact'
import Highlights from '@/component/sections/Highlights'
import Services from '@/component/sections/Services'
import db from '@/db/db'
import { cache } from '@/lib/cache'
import React from 'react'

// const getHighlightsData = cache(
//     () => {
//         return db.highlights.findMany({
//             select: {
//                 id: true,
//                 nameAr: true,
//                 nameEn: true,
//                 number: true,
//             }
//         })
//     },
//     ["/", "getHighlightsData"],
//     { revalidate: 60 * 60 * 24 }
// )
// // async function getHighlightsData() {
// //     const data = await db.highlights.findMany({
// //         select: {
// //             id: true,
// //             nameAr: true,
// //             nameEn: true,
// //             number: true,
// //         }
// //     })
// //     return data
// // }

// async function getBranchesData() {
//     const data = await db.branches.findMany({
//         select: {
//             id: true,
//             name: true,
//             nameAr: true,
//             location: true,
//             locationAr: true,
//             mobile: true,
//             whatsApp: true,
//             image: true,
//         }
//     })
//     return data
// }

// async function getClientsData() {
//     const data = await db.clients.findMany({
//         select: {
//             id: true,
//             name: true,
//             nameAr: true,
//             image: true,
//         }
//     })
//     return data
// }

// async function getServicesData() {
//     const data = await db.services.findMany({
//         select: {
//             id: true,
//             title: true,
//             titleAr: true,
//             icon: true,
//             description: true,
//             descriptionAr: true
//         }
//     })
//     return data
// }

async function fetchHighlightsFromAPI() {
    const response = await fetch(`${process.env.BACKEND}/api/highlights`, {
        cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
        throw new Error("Failed to fetch highlights data from API");
    }
    return response.json();
}

async function fetchBranchesFromAPI() {
    const response = await fetch(`${process.env.BACKEND}/api/branches`, {
        cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
        throw new Error("Failed to fetch highlights data from API");
    }
    return response.json();
}
async function fetchClientsFromAPI() {
    const response = await fetch(`${process.env.BACKEND}/api/clients`, {
        cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
        throw new Error("Failed to fetch highlights data from API");
    }
    return response.json();
}
async function fetchServicesFromAPI() {
    const response = await fetch(`${process.env.BACKEND}/api/services`, {
        cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
        throw new Error("Failed to fetch highlights data from API");
    }
    return response.json();
}



const Page = async () => {
    const [branchesData, clientsData, servicesData, highlightsData] = await Promise.all([
        fetchBranchesFromAPI(),
        fetchClientsFromAPI(),
        fetchServicesFromAPI(),
        fetchHighlightsFromAPI()
    ])

    // const highlightsData = await getHighlightsData()
    // const branchesData = await getBranchesData()
    // const clientsData = await getClientsData()
    // const servicesData = await getServicesData()

    return (
        <div>
            <BannerSwiper />
            <Highlights data={highlightsData.data} />
            <About />
            <Services data={servicesData.data} />
            <Contact />
            <Branches data={branchesData.data} />
            <Clients data={clientsData.data} />
        </div>
    )
}

export default Page

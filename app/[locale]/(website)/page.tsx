import About from '@/component/sections/About'
import Banner from '@/component/sections/Banner'
import BannerSwiper from '@/component/sections/BannerSwiper'
import Branches from '@/component/sections/Branches'
import Clients from '@/component/sections/Clients'
import Contact from '@/component/sections/Contact'
import Highlights from '@/component/sections/Highlights'
import Services from '@/component/sections/Services'
import db from '@/db/db'
import React from 'react'

async function getHighlightsData() {
    const data = await db.highlights.findMany({
        select: {
            id: true,
            nameAr: true,
            nameEn: true,
            number: true,
        }
    })
    return data
}

async function getBranchesData() {
    const data = await db.branches.findMany({
        select: {
            id: true,
            name: true,
            nameAr: true,
            location: true,
            locationAr: true,
            mobile: true,
            whatsApp: true,
            image: true,
        }
    })
    return data
}

async function getClientsData() {
    const data = await db.clients.findMany({
        select: {
            id: true,
            name: true,
            nameAr: true,
            image: true,
        }
    })
    return data
}

async function getServicesData() {
    const data = await db.services.findMany({
        select: {
            id: true,
            title: true,
            titleAr: true,
            icon: true,
            description: true,
            descriptionAr: true
        }
    })
    return data
}


const Page = async () => {
    const [highlightsData, branchesData, clientsData, servicesData] = await Promise.all([
        getHighlightsData(),
        getBranchesData(),
        getClientsData(),
        getServicesData()
    ])

    return (
        <div>
            <BannerSwiper />
            <Highlights data={highlightsData} />
            <About />
            <Services data={servicesData} />
            <Contact />
            <Branches data={branchesData} />
            <Clients data={clientsData} />
        </div>
    )
}

export default Page

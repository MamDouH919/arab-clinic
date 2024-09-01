import About from '@/component/sections/About'
import Banner from '@/component/sections/Banner'
import BannerSwiper from '@/component/sections/BannerSwiper'
import Contact from '@/component/sections/Contact'
import Highlights from '@/component/sections/Highlights'
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


const Page = async () => {
    const highlightsData = await getHighlightsData()
    return (
        <div>
            <BannerSwiper />
            <Highlights data={highlightsData} />
            <About />
            <Contact />
        </div>
    )
}

export default Page

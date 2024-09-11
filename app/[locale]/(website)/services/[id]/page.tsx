import { getServicesById } from '@/actions/services'
import ServicesProfile from '@/component/sections/ServicesProfile'
import React from 'react'

const Page = async ({ params: { id, locale } }: { params: { id: string, locale: string } }) => {
    const fff = await getServicesById(id)
    console.log(fff);

    return (
        <div>
            <ServicesProfile />
        </div>
    )
}

export default Page

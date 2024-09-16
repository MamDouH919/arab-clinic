import { getServicesById } from '@/actions/services'
import ServicesProfile from '@/component/sections/ServicesProfile'
import React from 'react'
import { Metadata } from "next";
import { config } from "@/config";
import db from '@/db/db';
import { isValidObjectId } from '@/component/helperFunctions/isValidObjectId';

type Props = {
    params: { locale: string, id: string };
};

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const check = isValidObjectId(params.id)
    const service = check ? await db.services.findUnique({
        where: { id: params.id },
        select: {
            titleAr: true,
            title: true,
        }
    }) : null
    console.log(service);
    

    return {
        title: params.locale === "ar" ? service?.titleAr ?? "لا يوجد خدمة" : service?.title ?? "No Service",
    };
}

const Page = async ({ params: { id, locale } }: { params: { id: string, locale: string } }) => {
    const fff = await getServicesById(id)
    console.log(fff);

    return (
        <div>
            <ServicesProfile data={fff} />
        </div>
    )
}

export default Page

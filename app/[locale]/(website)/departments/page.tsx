import BreadCrumb from '@/component/ui/BreadCrumb'
import React from 'react'
import NoData from '@/component/ui/NoData'
import initTranslations from '@/app/i18n'
import { Container } from '@mui/material'
import Services from '@/component/sections/Services'

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
    return (
        <div>
            <BreadCrumb pageLink={"services"} bgImage='/staticImages/departments-bg.webp'/>
            <div style={{ margin: "80px 0" }}>
                <ServicesData locale={locale} />
            </div>
        </div>
    )
}

export default Page


const ServicesData = async ({ locale }: { locale: string }) => {
    const { t } = await initTranslations(locale, ['website'])

    async function fetchServicesFromAPI() {
        const response = await fetch(`${process.env.BACKEND}/api/services`, {
            cache: 'no-store', // Disable caching
        });

        if (!response.ok) {
            throw new Error("Failed to fetch highlights data from API");
        }
        return response.json();
    }


    const services = await fetchServicesFromAPI()

    if (services.length === 0) return <NoData label={t("noData")} />

    return <Container maxWidth="lg">
        <Services data={services.data} />
    </Container>
}
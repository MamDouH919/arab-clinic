import BreadCrumb from '@/component/ui/BreadCrumb'
import React from 'react'
import { getAvailableBranches } from './_actions'
import NoData from '@/component/ui/NoData'
import initTranslations from '@/app/i18n'
import ContactForm from './_component/ContactForm'

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
    const availableBranches = await getAvailableBranches()

    const data = availableBranches.map((branch) => ({
        id: branch.id,
        name: branch.name,
        nameAr: branch.nameAr,
        latitude: branch.latitude,
        longitude: branch.longitude

    }))

    const { t } = await initTranslations(locale, ['website'])

    return (
        <div>
            <BreadCrumb pageLink={"contact"} />
            <div style={{ margin: "80px 0" }}>
                {data.length === 0 ? <NoData label={t("noData")} /> : <ContactForm availableBranches={data} />}
            </div>
        </div>
    )
}

export default Page

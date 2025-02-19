import BreadCrumb from '@/component/ui/BreadCrumb'
import React from 'react'
import EmploymentForm from './_component/EmploymentForm'
import { getAvailableJobs } from './_actions'
import NoData from '@/component/ui/NoData'
import initTranslations from '@/app/i18n'
import { Stack } from '@mui/material'

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
    const availableJobs = await getAvailableJobs()

    const data = availableJobs.map((job) => ({
        id: job.id,
        labelEn: job.jobNameEn,
        labelAr: job.jobNameAr,
    }))

    const { t } = await initTranslations(locale, ['website'])


    return (
        <div>
            <BreadCrumb pageLink={"employment"} bgImage='/staticImages/employments-bg.webp' />
            <Stack py={10}>
                {data.length === 0 ? <NoData label={t("noAvailableJobs")} /> : <EmploymentForm availableJobs={data} />}
            </Stack>
        </div>
    )
}

export default Page

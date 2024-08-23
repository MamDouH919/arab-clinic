import BreadCrumb from '@/component/ui/BreadCrumb'
import React from 'react'
import EmploymentForm from './_component/EmploymentForm'
import { getAvailableJobs } from './_actions'

const Page = async () => {
    const availableJobs = await getAvailableJobs()

    const data = availableJobs.map((job) => ({
        id: job.id,
        labelEn: job.jobNameEn,
        labelAr: job.jobNameAr,
    }))

    return (
        <div>
            <BreadCrumb pageLink={"employment"} />
            <div style={{ margin: "80px 0" }}>
                <EmploymentForm availableJobs={data} />
            </div>
        </div>
    )
}

export default Page

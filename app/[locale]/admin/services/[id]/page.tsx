import React from 'react'
// import Form from '../_Form'
// import NoData from '@/component/ui/NoData'
// import { getNewsById } from '@/actions/new'
// import initTranslations from '@/app/i18n'

const Page = async ({ params: { id, locale } }: { params: { id: string, locale: string } }) => {
    // // const { t } = await initTranslations(locale, ['website'])
    // // const data = await getNewsById(Number(id))
    // // if (data == null) return <NoData label={t("noData")} />

    // return <Form id={Number(id)} data={data} />
    return <div>test</div>
}

export default Page

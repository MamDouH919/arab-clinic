import { getServicesDropDown } from '@/actions/dropDown'
import MainPage from './_MainPage'

const Page = async () => {
    const services = await getServicesDropDown()

    const servicesData = services.map((service) => ({
        id: service.id,
        title: service.title,
        titleAr: service.titleAr,
    }))

    return (
        <MainPage servicesData={servicesData} />
    )
}

export default Page

import { getServicesDropDown } from '@/actions/dropDown'
import MainPage from './_MainPage'

// async function getClientsNqData() {
//     const data = await db.doctors.findMany({
//         // where: { id: "syndicates" },
//         select: {
//             id: true,
//             name: true,
//             nameAr: true,
//             imagePath: true,
//         }
//     })
//     return data
// }

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

"use client"
import React, { useEffect, useState } from 'react'
import Doctor from '@/component/sections/Doctor'
import BreadCrumb from '@/component/ui/BreadCrumb'
import NoData from '@/component/ui/NoData'
import db from '@/db/db'
import { Container, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { getDoctors } from '@/actions/doctors'
import { useTranslation } from 'react-i18next'
import Loading from '@/component/ui/Loading'
import ControlMUITextField from '@/component/ui/ControlMUItextField'
import { useForm } from 'react-hook-form'
import LoadingButton from '@mui/lab/LoadingButton'
import Select from '@/component/MUI/Select'

const MainPage = ({
    servicesData
}: {
    servicesData: {
        id: string,
        title: string,
        titleAr: string
    }[]
}) => {
    const [loading, setLoading] = useState(true)
    const [filterLoading, setFilterLoading] = useState(false)
    const [doctors, setDoctors] = useState<any>([])

    const { control, handleSubmit } = useForm()

    const { t, i18n } = useTranslation(["dashboard"])

    useEffect(() => {
        getDoctors().then((data) => {
            setDoctors(data)
            setLoading(false)
        })
        return () => { }
    }, [])

    const onSubmit = (data: any) => {
        setFilterLoading(true)
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== null && value !== "")
        );

        getDoctors(filteredData).then((data) => {
            setFilterLoading(false)
            setDoctors(data)
            setLoading(false)
        })
    }

    return (
        <div>
            <BreadCrumb pageLink={"doctors"} bgImage='/staticImages/doctors-bg.webp' />
            <Container maxWidth="lg">
                <Stack py={5} spacing={2} alignItems={"center"}>
                    <Typography textAlign={"center"} variant='h1' fontSize={28} textTransform={"capitalize"}>
                        {t("doctors")}
                    </Typography>
                    <Grid container spacing={2} justifyContent={"center"} component={"form"} onSubmit={handleSubmit(onSubmit)} width={"100%"}>
                        <Grid xs={12} md={4} sm={6}>
                            <ControlMUITextField
                                label={t("name")}
                                control={control}
                                name={i18n.language === "ar" ? "nameAr" : "name"}
                                variant='outlined'
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={12} md={4} sm={6}>
                            <Select
                                fullWidth
                                name='serviceId'
                                variant='outlined'
                                label={t('service')}
                                control={control}
                                data={servicesData.map(e => ({ key: i18n.language === "ar" ? e.titleAr : e.title, value: e.id }))}
                            />
                        </Grid>
                        <Grid xs={12} md={4} sm={6}>
                            <LoadingButton
                                fullWidth
                                loading={loading || filterLoading}
                                variant='contained'
                                type='submit'>{t("search")}</LoadingButton>
                        </Grid>
                    </Grid>
                    {!loading && doctors.length > 0 &&
                        <Grid container spacing={4} justifyContent={"center"} width={"100%"}>
                            {doctors.map((doctor: any) =>
                                <Grid xs={12} md={3} sm={6}  key={doctor.id}>
                                    <Doctor doctor={doctor} showService />
                                </Grid>
                            )}
                        </Grid>
                    }
                    {!loading && doctors.length === 0 && <NoData label={"noDoctors"} />}
                    {loading && <Loading height='350px' />}
                </Stack>
            </Container>
        </div>
    )
}

export default MainPage
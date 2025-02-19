"use client"
import { getSchedules } from '@/actions/schedules'
import Select from '@/component/MUI/Select'
import Carousel from '@/component/ui/Carousel'
import Fancybox from '@/component/ui/FancyBox'
import Loading from '@/component/ui/Loading'
import NoData from '@/component/ui/NoData'
import LoadingButton from '@mui/lab/LoadingButton'
import { Container, Paper, Stack } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type BranchType = {
    id: string;
    name: string;
    nameAr: string;
}

const Content = ({
    availableBranches
}: {
    availableBranches: BranchType[]
}) => {
    const [loading, setLoading] = useState(true)
    const [filterLoading, setFilterLoading] = useState(false)
    const [schedules, setSchedules] = useState<any>([])

    const { control, handleSubmit } = useForm()

    const { t, i18n } = useTranslation(["dashboard"])

    useEffect(() => {
        getSchedules().then((data) => {
            setSchedules(data)
            setLoading(false)
        })
        return () => { }
    }, [])

    const onSubmit = (data: any) => {
        setFilterLoading(true)
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== null && value !== "")
        );

        getSchedules(filteredData).then((data) => {
            setFilterLoading(false)
            setSchedules(data)
            setLoading(false)
        })
    }

    return (
        <Stack spacing={2}>
            <Stack width={"100%"}>
                <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                    component={"form"}
                    onSubmit={handleSubmit(onSubmit)}
                    width={"100%"}
                    m={0}
                >
                    <Grid xs={12} md={4} sm={6}>
                        <Select
                            fullWidth
                            name='branchId'
                            variant='outlined'
                            label={t('branch')}
                            control={control}
                            data={availableBranches.map(e => ({ key: i18n.language === "ar" ? e.nameAr : e.name, value: e.id }))}
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
            </Stack>
            {!filterLoading && !loading && schedules.length > 0 &&
                <Stack>
                    <Container maxWidth="md">
                        <Fancybox
                            // Sample options
                            options={{
                                loop: true,
                                Carousel: {
                                    infinite: true,
                                },
                            }}
                        >
                            <Carousel
                                // Sample options
                                options={{ infinite: true }}
                            >
                                {schedules.map((schedule: any) =>
                                    <div
                                        key={schedule.id}
                                        className="f-carousel__slide"
                                        data-fancybox="gallery"
                                        data-src={schedule.imagePath}
                                        data-thumb-src={schedule.imagePath}
                                    >
                                        <img
                                            alt={schedule.imageName}
                                            src={schedule.imagePath}
                                            width="100%"
                                            height="100%"
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "10px"
                                            }}
                                        />
                                    </div>
                                )}
                            </Carousel>
                        </Fancybox>
                    </Container>
                </Stack>
            }
            {!filterLoading && !loading && schedules.length === 0 && <NoData label={"noDoctors"} />}
            {(loading || filterLoading) && <Loading height='350px' />}
        </Stack>
    )
}

export default Content
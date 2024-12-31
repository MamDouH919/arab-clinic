"use client"
import React from 'react'
import { styled } from "@mui/material/styles";
import { Container, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SwiperSection from './swiper';
import YouTube from 'react-youtube';
import { isMobile } from 'react-device-detect';
import NoData from '../ui/NoData';
import { useTranslation } from 'react-i18next';
import DangerouslySetInnerHTML from '../DangerouslySetInnerHTML';
import Image from 'next/image';
import clsx from 'clsx';
import Doctor from './Doctor';

const PREFIX = "ServicesProfile";
const classes = {
    bannerBackground: `${PREFIX}-bannerBackground`,
    video: `${PREFIX}-video`,
    headerH: `${PREFIX}-headerH`,
};

const Root = styled("div")(({ theme }) => ({
    [`& .${classes.bannerBackground}`]: {
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100dvh", // Use '100vh' if '100dvh' is not supported
        width: "100%",
        backgroundAttachment: "fixed", // Default style, fallback for mobile
    },
    [`& .${classes.video}`]: {
        width: "100%",
        height: "100%",
        "& iframe": {
            width: "100%",
        }
    },
    [`& .${classes.headerH}`]: {
        height: "71px",
    },

    // Feature query for iOS devices
    "@supports (-webkit-overflow-scrolling: touch)": {
        [`& .${classes.bannerBackground}`]: {
            backgroundAttachment: "scroll",
        }
    },

}));

interface inputProps {
    data: {
        title: string;
        id: string;
        titleAr: string;
        description: string;
        descriptionAr: string;
        coverImgPath: string;
        videos: string | null
        servicesImages: []
        Doctors: []
    } | null
}

const ServicesProfile = (props: inputProps) => {
    const { data } = props
    const { t, i18n } = useTranslation()

    if (!data) {
        return <Stack height={"100vh"}>
            <NoData />
        </Stack>
    }

    console.log(data.Doctors);


    return (
        <Root>
            <div className={classes.headerH}></div>
            <Stack width={"100%"} height={400}>
                <img
                    src={data.coverImgPath}
                    alt={`${data.title}-cover`}
                    width={"100%"}
                    height={"100%"}
                    style={{ objectFit: "cover" }}
                />
            </Stack>
            {/* <div className={classes.bannerBackground}
                style={{
                    backgroundImage: `url('${data.coverImgPath}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundAttachment: isMobile ? "inherit" : "fixed",
                    maxHeight: "500px"
                }}>

            </div> */}
            <Container maxWidth={'lg'} sx={{ my: 10 }}>
                <Stack spacing={5} alignItems={"center"}>
                    {/* <Typography variant="body1" sx={{ fontWeight: "bold" }} color={"text.secondary"}> */}
                    <DangerouslySetInnerHTML data={i18n.language === "en" ? data.description : data.descriptionAr} />
                    {/* </Typography> */}
                    {/* <Grid container spacing={4} m={0} alignItems={"center"} justifyContent={"center"}>
                        <Grid sm={12} md={3}>
                            <Stack alignContent={"center"} justifyContent={"center"} spacing={2}>
                                <Typography textAlign={"center"}>
                                    SERVICES
                                </Typography>
                                <Divider orientation="horizontal" flexItem />
                                <Typography textAlign={"center"}>
                                    {dataFiltered.data?.services}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid sm={12} md={3}>
                            <Stack alignContent={"center"} justifyContent={"center"} spacing={2}>
                                <Typography textAlign={"center"}>
                                    Creative Director
                                </Typography>
                                <Divider orientation="horizontal" flexItem />
                                <Typography textAlign={"center"}>
                                    {dataFiltered.data?.creativeDirector}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid sm={12} md={3}>
                            <Stack alignContent={"center"} justifyContent={"center"} spacing={2}>
                                <Typography textAlign={"center"}>
                                    Destination
                                </Typography>
                                <Divider orientation="horizontal" flexItem />
                                <Typography textAlign={"center"}>
                                    {dataFiltered.data?.destination}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid sm={12} md={3}>
                            <Stack alignContent={"center"} justifyContent={"center"} spacing={2}>
                                <Typography textAlign={"center"}>
                                    YEAR
                                </Typography>
                                <Divider orientation="horizontal" flexItem />
                                <Typography textAlign={"center"}>
                                    {dataFiltered.data?.year}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid> */}
                </Stack>
            </Container>
            <Stack bgcolor={"primary.light"} py={4}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent={"center"}>
                        <Grid xs={12}>
                            <Typography textAlign={"center"} variant='h5' textTransform={"capitalize"} color={"#fff"}>
                                {t("doctors")} {t("in")} {i18n.language === "ar" ? data.titleAr : data.title}
                            </Typography>
                        </Grid>

                        {
                            data.Doctors.length > 0 ? data.Doctors.map((doctor: any) =>
                                <Grid xs={12} md={4} sm={6} key={doctor.id}>
                                    <Doctor doctor={doctor} />
                                </Grid>
                            ) : <Grid>
                                <NoData label={"noDoctors"} height='160px' />
                            </Grid>
                        }

                    </Grid>
                </Container>
            </Stack>
            {data.servicesImages && data.servicesImages.length > 0 && <SwiperSection
                title={i18n.language === "en" ? data.title : data.titleAr}
                images={data.servicesImages}
            />}
            {data.videos && JSON.parse(data.videos).length > 0 &&
                <Container maxWidth={'lg'} sx={{ my: 20 }}>
                    <Grid container spacing={4} m={0}>
                        {
                            JSON.parse(data.videos).map((e: string) =>
                                <Grid xs={12} md={6} key={e}>
                                    <YouTube
                                        videoId={e}
                                        className={classes.video}
                                        title="Video string"
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                </Container>
            }
        </Root>
    )
}

export default ServicesProfile

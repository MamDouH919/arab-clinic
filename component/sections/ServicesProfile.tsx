"use client"
import React from 'react'
import { styled } from "@mui/material/styles";
import { Container, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SwiperSection from './swiper';
import YouTube from 'react-youtube';
import { isMobile } from 'react-device-detect';
import NoData from '../ui/NoData';
import { useTranslation } from 'react-i18next';

const PREFIX = "Navbar";
const classes = {
    bannerBackground: `${PREFIX}-bannerBackground`,
    video: `${PREFIX}-video`,
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

    // Feature query for iOS devices
    "@supports (-webkit-overflow-scrolling: touch)": {
        [`& .${classes.bannerBackground}`]: {
            backgroundAttachment: "scroll",
        }
    }
}));

interface inputProps {
    data: {
        title: string;
        id: string;
        titleAr: string;
        description: string;
        descriptionAr: string;
        icon: string;
        coverImg: string;
        imgOne: string | null;
        imgTwo: string | null;
        imgThree: string | null;
    } | null
}

const ServicesProfile = (props: inputProps) => {
    const { data } = props
    console.log(data);
    const { t, i18n } = useTranslation()

    if (!data) {
        return <Stack height={"100vh"}>
            <NoData />
        </Stack>
    }
    return (
        <Root>
            <div className={classes.bannerBackground} style={{
                backgroundImage: `url('${data.coverImg}')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundAttachment: isMobile ? "inherit" : "fixed",
            }}></div>
            <Container maxWidth={'lg'} sx={{ my: 20 }}>
                <Stack spacing={5} alignItems={"center"}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }} color={"text.secondary"}>
                        <div
                            dangerouslySetInnerHTML={{ __html: i18n.language === "en" ? data.description : data.descriptionAr }}
                        />
                    </Typography>
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
            {(data.imgOne || data.imgTwo || data.imgThree) && <SwiperSection
                title={i18n.language === "en" ? data.title : data.titleAr}
                imgOne={data.imgOne ?? undefined}
                imgTwo={data.imgTwo ?? undefined}
                imgThree={data.imgThree ?? undefined}
            />}
            <Container maxWidth={'lg'} sx={{ my: 20 }}>
                <Grid container spacing={4} m={0}>
                    <Grid xs={12} md={6}>
                        <YouTube
                            videoId="mS3tCWnNRqk"
                            className={classes.video}
                            title="Video string"
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <YouTube
                            className={classes.video}
                            videoId="mS3tCWnNRqk" />
                    </Grid>
                </Grid>
            </Container>
        </Root>
    )
}

export default ServicesProfile

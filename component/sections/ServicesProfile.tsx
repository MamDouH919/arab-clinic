"use client"
import React from 'react'
import { styled } from "@mui/material/styles";
import { Container, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SwiperSection from './swiper';
import YouTube from 'react-youtube';
import { isMobile } from 'react-device-detect';

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

const ServicesProfile = () => {
    return (
        <Root>
            <div className={classes.bannerBackground} style={{
                backgroundImage: `url('/staticImages/contactDark.png')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundAttachment: isMobile ? "inherit" : "fixed",
            }}></div>
            <Container maxWidth={'lg'} sx={{ my: 20 }}>
                <Stack spacing={5} >
                    <Typography variant="body1" sx={{ fontWeight: "bold" }} color={"text.secondary"} textAlign={"center"}>
                        sdjfsdhfj
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
            <SwiperSection />
            <Container maxWidth={'lg'} sx={{ my: 20 }}>
                <Grid container spacing={4} m={0}>
                    <Grid xs={12} md={6}>
                        <YouTube videoId="mS3tCWnNRqk" className={classes.video} />
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

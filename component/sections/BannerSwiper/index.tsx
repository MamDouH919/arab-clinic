"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from "@mui/material/styles";
import { Box, Typography } from '@mui/material';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';

import 'swiper/css/effect-fade';

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Root = styled(Box)(({ theme }) => ({
    [`& .swiper-pagination-bullet`]: {
        width: "20px",
        height: "20px",
        backgroundColor: "#fff",
        borderRadius: "50%",
        margin: "0 5px",
        opacity: "0.2",
    },
    [`& .swiper-pagination-bullet-active`]: {
        width: "20px",
        height: "20px",
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "50%",
        margin: "0 5px",
        opacity: "1",
    },
    [`& .navigation-button`]: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "60px",
        opacity: "0.5",
        margin: "0 10px",
        color: theme.palette.text.secondary,
        zIndex: 10,
        display: "flex",
        cursor: "pointer",
        [theme.breakpoints.down("md")]: {
            fontSize: "50px",
        },
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },

    },
    [`& .navigation-button.next`]: {
        right: "0",
    },
    [`& .navigation-button.prev`]: {
        left: "0",
    },
}));


const BannerSwiper = () => {
    const { t, i18n } = useTranslation("custom");
    return (
        <Root sx={{ height: { xs: "500px", md: "100dvh", lg: "100dvh" }, position: "relative" }}>
            <>
                <Swiper
                    spaceBetween={0}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.next',
                        prevEl: '.prev',
                    }}
                    loop={true}
                    modules={[EffectFade, Navigation, Pagination, Autoplay]}
                    effect={'fade'}
                    className="bannerSwiper"
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                >
                    {[1, 2].map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='content-background'></div>
                            {/* <Typography variant='h1' fontSize={{ xs: "35px", md: "60px", lg: "80px" }} width={"80%"} className='content'>{"sdfsd"}</Typography> */}
                            <img src={'/staticImages/about/about.webp'} alt={"dksfjkd"} srcSet={'/staticImages/about/about.webp'} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="navigation-button next">
                    {i18n.language === "en" ? <FaArrowRight /> : <FaArrowLeft />}
                </div>
                <div className="navigation-button prev">
                    {i18n.language === "en" ? <FaArrowLeft /> : <FaArrowRight />}
                </div>
            </>
        </Root>
    )
}

export default BannerSwiper

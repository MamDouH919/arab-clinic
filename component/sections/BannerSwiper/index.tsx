"use client";
import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from "@mui/material/styles";
import { Box } from '@mui/material';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import './style.css';

// import 'swiper/css/effect-fade';

// import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
// import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';

const Root = styled(Box)(({ theme }) => ({
    // backgroundImage: `url('/staticImages/about/banner.mp4')`,
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
    [`& video`]: {
        objectFit: "cover",
    },
}));


const BannerSwiper = () => {
    // const { t, i18n } = useTranslation("custom");
    // const { palette } = useTheme()
    return (
        <Root sx={{ height: { xs: "400px", md: "100dvh", lg: "100dvh" }, position: "relative" }}>
            <video autoPlay muted playsInline loop id="myVideo" height={"100%"} width={"100%"}>
                <source src="/staticImages/banner.mp4" type="video/mp4" />
            </video>
            {/* <>
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
                            <img src={'/staticImages/about/about.webp'} alt={"dksfjkd"} srcSet={'/staticImages/about/about.webp'} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="navigation-button next">
                    {i18n.language === "en" ? <FaArrowRight color={palette.primary.main} /> : <FaArrowLeft color={palette.primary.main} />}
                </div>
                <div className="navigation-button prev">
                    {i18n.language === "en" ? <FaArrowLeft color={palette.primary.main}/> : <FaArrowRight color={palette.primary.main}/>}
                </div>
            </> */}
        </Root>
    )
}

export default BannerSwiper

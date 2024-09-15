import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from "@mui/material/styles";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

import { Box } from '@mui/material';
import Image from 'next/image';

const Root = styled(Box)(({ theme }) => ({
    [`& .swiper-pagination-bullet`]: {
        width: "15px",
        height: "15px",
        backgroundColor: "#fff",
        borderRadius: "50%",
        margin: "0 5px",
        opacity: "0.2",
    },
    [`& .swiper-pagination-bullet-active`]: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "50%",
        margin: "0 5px",
        opacity: "1",
    },
    [`& .navigation-button`]: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "50px",
        color: theme.palette.secondary.main,
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

interface inputProps {
    imgOne?: string
    imgTwo?: string
    imgThree?: string
    title: string
}


const SwiperSection = (props: inputProps) => {
    const {
        imgOne,
        imgTwo,
        imgThree,
        title
    } = props
    return (
        <Root id={"id"}>
            <Box sx={{ height: "100dvh", position: "relative" }}>
                <Swiper
                    spaceBetween={0}
                    className="profileSwiper"
                    loop={true}
                >
                    {imgOne &&
                        <SwiperSlide>
                            <Image
                                src={imgOne}
                                alt={title}
                                width={1200}
                                height={1200}
                                layout="responsive"
                                objectFit='contain'
                                style={{ width: '100%', height: "100%" }}
                            />
                        </SwiperSlide>
                    }
                    {imgTwo &&
                        <SwiperSlide>
                            <Image
                                src={imgTwo}
                                alt={title}
                                width={1200}
                                height={1200}
                                objectFit='contain'
                                layout="responsive"
                                style={{ width: '100%', height: "100%" }}
                            />
                        </SwiperSlide>
                    }
                    {imgThree &&
                        <SwiperSlide>
                            <Image
                                src={imgThree}
                                alt={title}
                                width={1200}
                                height={1200}
                                objectFit='contain'
                                layout="responsive"
                                style={{ width: '100%', height: "100%" }}
                            />
                        </SwiperSlide>
                    }
                </Swiper>
            </Box>
        </Root>
    )
}

export default SwiperSection;

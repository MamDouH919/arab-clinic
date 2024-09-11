import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from "@mui/material/styles";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

import { Box } from '@mui/material';

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

const SwiperSection = () => {
    return (
        <Root id={"id"}>
            <Box sx={{ height: "100dvh", position: "relative", }}>
                <Swiper
                    spaceBetween={0}
                    className="profileSwiper"
                >
                    {/* {[{
                        image: image,
                        title: 'Work 1',
                    }, {
                        image: image2,
                        title: 'Work 2',
                    }, {
                        image: image3,
                        title: 'Work 3',
                    }, {
                        image: image4,
                        title: 'Work 4',
                    }, {
                        image: image5,
                        title: 'Work 5',
                    }].map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={item.image} alt="" />
                        </SwiperSlide>
                    ))} */}
                </Swiper>
            </Box>
        </Root>
    )
}

export default SwiperSection;

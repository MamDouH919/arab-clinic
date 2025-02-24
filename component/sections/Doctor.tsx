"use client"
import { Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import clsx from 'clsx';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from "@mui/material/styles";

const PREFIX = "Doctor";
const classes = {
    bannerBackground: `${PREFIX}-bannerBackground`,
    video: `${PREFIX}-video`,
    headerH: `${PREFIX}-headerH`,
    image: `${PREFIX}-image`,
    docName: `${PREFIX}-docName`,
    bgPaper: `${PREFIX}-bgPaper`,
    bgPaperLeft: `${PREFIX}-bgPaperLeft`,
    bgPaperRight: `${PREFIX}-bgPaperRight`,
    wrapperBgPaper: `${PREFIX}-wrapperBgPaper`,
};

const Root = styled("div")(({ theme }) => ({
    '&:hover': {
        [`& .${classes.bgPaper}`]: {
            width: "100%",
            transition: "width 0.3s ease-in-out", // Smooth transition
        },
        [`& .${classes.bgPaperLeft}`]: {
            transition: "all 0.3s ease-in-out", // Smooth transition
            borderTopLeftRadius: "17px"
        },
        [`& .${classes.bgPaperRight}`]: {
            transition: "all 0.3s ease-in-out", // Smooth transition
            borderBottomRightRadius: "17px"
        },
    },
    width: "100%",
    [`& .${classes.image}`]: {
        objectFit: "cover"
    },
    [`& .${classes.docName}`]: {
        position: "absolute",
        bottom: 10,
        left: "50%",
        width: "90%",
        margin: "auto",
        transform: "translateX(-50%)"
    },
    [`& .${classes.wrapperBgPaper}`]: {
        boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;",
    },
    [`& .${classes.bgPaper}`]: {
        background: theme.palette.secondary.main,
        position: "absolute",
        zIndex: -1,
        width: 70,
        height: 30,
        transition: "width 0.3s ease-in-out", // Smooth transition
    },
    [`& .${classes.bgPaperLeft}`]: {
        top: "-3px",
        right: "-3px",
        borderTopRightRadius: "17px",
        transition: "all 0.3s ease-in-out", // Smooth transition
    },
    [`& .${classes.bgPaperRight}`]: {
        bottom: "-3px",
        left: "-3px",
        borderBottomLeftRadius: "17px",
        transition: "all 0.3s ease-in-out", // Smooth transition
    },
}));

const Doctor = ({
    doctor,
    showService = false
}: {
    doctor: {
        imagePath?: string
        nameAr: string
        name: string
        expertiseAr: string
        expertise: string
        service: {
            title: string
            titleAr: string
        }
    },
    showService: boolean
}) => {
    const { t, i18n } = useTranslation()

    console.log(doctor);

    return (
        <Root>
            <Stack component={Paper} width={"100%"} height={400} position={"relative"} overflow={"hidden"}>
                <img
                    src={doctor.imagePath ?? "/logo-footer.webp"}
                    alt={i18n.language === "ar" ? doctor.nameAr : doctor.name}
                    width={"100%"}
                    height={"100%"}
                    className={classes.image}
                />

                <Stack className={classes.docName} >
                    <Stack
                        className={classes.wrapperBgPaper}
                        width={"100%"}
                        bgcolor={"Background"}
                        height={"100%"}
                        position={"relative"}
                        px={2}
                        py={1}
                        borderRadius={1.5}
                    >
                        <Stack className={clsx(classes.bgPaper, classes.bgPaperRight)} />
                        <Stack className={clsx(classes.bgPaper, classes.bgPaperLeft)} />
                        <Typography fontSize={15}>{i18n.language === "ar" ? doctor.nameAr : doctor.name}</Typography>
                        <Typography fontSize={12} color={"text.secondary"}>{i18n.language === "ar" ? doctor.expertiseAr : doctor.expertise}</Typography>
                        {showService && <Typography fontSize={12} color={"text.secondary"}>{i18n.language === "ar" ? doctor.service.titleAr : doctor.service.title}</Typography>}
                    </Stack>
                </Stack>
            </Stack>
        </Root>
    )
}

export default Doctor
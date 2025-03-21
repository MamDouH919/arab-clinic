"use client"
import { Avatar, Box, Container, Paper, Stack, Typography } from '@mui/material'
import { styled } from "@mui/material/styles";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { FaFacebookF, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../ui/SectionTitle';
import Image from 'next/image';
import { LocationOnOutlined } from '@mui/icons-material';

const PREFIX = "Team";

const classes = {
    bgStyle: `${PREFIX}-bgStyle`,
    social: `${PREFIX}-social`,
};

const Root = styled(Box)(({ theme }) => ({
    position: "relative",
    [`& .${classes.bgStyle}`]: {
        background: theme.palette.secondary.main,
        position: "absolute",
        top: "200px",
        left: 0,
        width: "100%",
        height: "120px",
        zIndex: 1,
    },
    [`& .${classes.social}`]: {
        // display: "flex",
        // flexWrap: "wrap",
        // width: 40,
        // height: 40,
        background: theme.palette.divider,
        // borderRadius: "50%",
        "& a": {
            color: theme.palette.secondary.main,
            fontSize: 22,
            display: "flex"
            // "&:hover": {
            //     background: theme.palette.primary.main,
            //     color: theme.palette.common.white,
            // },
        },
    },
}));

const socialIcons = {
    whatsapp: <FaWhatsapp />,
    phone: <FaPhone size={18} />,
    facebook: <FaFacebookF />,
    location: <LocationOnOutlined fontSize='inherit' />
};


const Branches = ({ data }: {
    data: {
        id: string,
        name: string,
        nameAr: string,
        location: string,
        locationAr: string,
        mobile: string,
        whatsApp: string,
        imagePath: string,
        gps: string
    }[]
}) => {
    const { t, i18n } = useTranslation(["dashboard"])


    if (data.length === 0 || !data) {
        return null
    }

    return (
        <Root sx={{ background: (theme) => theme.palette.background.paper }} py={2}>
            <SectionTitle
                sectionTitle={t("branches")}
            />
            <Box my={4}>
                <div className={classes.bgStyle}></div>
                <Container maxWidth={'lg'} style={{ position: "relative", zIndex: 2 }}>
                    <Grid container spacing={2} m={0} justifyContent={"center"} alignItems={"stretch"}>
                        {data.map((item, index) => {
                            return (
                                <Grid md={4} xs={12} key={index}>
                                    <Stack
                                        alignItems={"center"}
                                        component={Paper}
                                        spacing={2}
                                        pb={2}
                                        height={"100%"}
                                        px={2}
                                        elevation={3}

                                    >
                                        <Image src={item.imagePath} height={220} alt='ss' width={210} style={{ borderRadius: "10px" }} />
                                        <Typography variant='body1' fontSize={"20px"}>
                                            {i18n.language === "ar" ? item.nameAr : item.name}
                                        </Typography>
                                        <Typography variant='body1' textAlign={"center"}>
                                            {i18n.language === "ar" ? item.locationAr : item.location}
                                        </Typography>
                                        <Stack direction={"row"} spacing={2} flexWrap={"wrap"} useFlexGap>
                                            <Avatar className={classes.social}>
                                                <a title={(i18n.language === "ar" ? item.nameAr : item.name) + " " + t("phone")} target='_blank' rel="noopener noreferrer" href={`tel:${item.mobile}`}>
                                                    {socialIcons.phone}
                                                </a>
                                            </Avatar>
                                            <Avatar className={classes.social}>
                                                <a title={(i18n.language === "ar" ? item.nameAr : item.name) + " " + t("whatsApp")} target='_blank' rel="noopener noreferrer" href={`https://wa.me/${item.whatsApp}`}>
                                                    {socialIcons.whatsapp}
                                                </a>
                                            </Avatar>
                                            <Avatar className={classes.social}>
                                                <a title={(i18n.language === "ar" ? item.nameAr : item.name) + " " + t("location")} target='_blank' rel="noopener noreferrer" href={item.gps}>
                                                    {socialIcons.location}
                                                </a>
                                            </Avatar>
                                        </Stack>

                                    </Stack>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </Box>

        </Root>
    )
}

export default Branches

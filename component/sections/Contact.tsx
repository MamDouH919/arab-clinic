"use client";
import { Box, Button, Container, Stack } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import contactUsImage from "@/public/staticImages/contactDark.png";
import { styled } from "@mui/material/styles";
import { isMobile } from 'react-device-detect';
import Image from 'next/image';
import SectionTitle from '../ui/SectionTitle';
import ControlMUITextField from '../ui/ControlMUItextField';

const PREFIX = "Contact";

const classes = {
    bannerBack: `${PREFIX}-bannerBack`,
    content: `${PREFIX}-content`,
    qrLink: `${PREFIX}-qrLink`,
};

const Root = styled(Box)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    [`& .${classes.content}`]: {
        paddingTop: theme.spacing(10),
        background: theme.palette.divider,
    },
    [`& .${classes.bannerBack}`]: {
        [`& svg`]: {
            [`& path`]: {
                fill: theme.palette.divider,
            },
        },
    },
    [`& .${classes.qrLink}`]: {
        color: theme.palette.primary.main,
        margin: 0,
        fontSize: 20,
        textDecoration: "none",
        [`&:hover`]: {
            textDecoration: "underline",
        },
    },
}));

const Contact = () => {
    const { t, i18n } = useTranslation()
    const { control, handleSubmit } = useForm()

    function createWhatsAppLink(phoneNumber: any, text: any) {
        const encodedText = encodeURIComponent(text);
        return `https://wa.me/${phoneNumber}/?text=${encodedText}`;
    }

    const onSubmit = (formData: any) => {
        //         if (data.whatsApp) {
        //             // Example usage:
        //             const messageAr = `اهلا بحضرتك يا فندم 
        // الاسم: ${formData.fullName}
        // الايميل: ${formData.email} 
        // رقم الموبايل: ${formData.mobile} 
        // الفرع الاقرب: ${formData.branch} 
        // رسالتك: ${formData.message}`
        //             const message = `Hello, sir/madam,
        // Name: ${formData.fullName}
        // Email: ${formData.email}
        // Mobile number: ${formData.mobile}
        // Nearest branch: ${formData.branch}
        // Your message: ${formData.message}`
        //             const whatsappLink = createWhatsAppLink(data.whatsApp, i18n.language === "ar" ? messageAr : message);
        //             window.open(whatsappLink, '_blank');
        //         }
    }

    return (
        <Stack sx={{ background: (theme) => theme.palette.background.paper }}>
            {/* <a href="https://wa.me/+201157143609/?text=urlencodedtext" target='_blank' rel="noreferrer">sdfsd</a> */}
            <Root
                sx={{
                    background: `url(${true ? contactUsImage : contactUsImage}) no-repeat top / cover`,
                    backgroundAttachment: isMobile ? "inherit" : "fixed",
                }}
                py={2}
            >
                <SectionTitle
                    sectionTitle={"contactUs"}
                    subSectionTitle={"contactUs"}
                />
                <div style={{ margin: "32px 0", }}>
                    <Container maxWidth={'md'}>
                        <Grid container m={0} spacing={2} alignItems={"center"}>
                            <Grid md={4} xs={12}>
                                <Stack alignItems={"center"} spacing={2}>
                                    <Image src={'/staticImages/arab-clinic-qr.png'} alt='Qr' width={"150"} height={"150"} />
                                    <a href={''} rel="noopener noreferrer" target="_blank">
                                        <Button variant='contained'>{t("forMoreInformation")}</Button>
                                    </a>
                                </Stack>
                            </Grid>
                            <Grid md={8} xs={12}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Box width={"100%"}>
                                        <Grid container spacing={2} m={0} alignItems={"center"} justifyContent={"center"} >
                                            <Grid md={12} xs={12}>
                                                <ControlMUITextField
                                                    name="fullName"
                                                    label={t("fullName")}
                                                    
                                                    control={control}
                                                />
                                            </Grid>
                                            <Grid md={12} xs={12}>
                                                <ControlMUITextField
                                                    name="email"
                                                    label={t("email")}
                                                    
                                                    control={control}
                                                />
                                            </Grid>
                                            <Grid md={12} xs={12}>
                                                <ControlMUITextField
                                                    name="branch"
                                                    label={t("nearBranch")}
                                                    
                                                    control={control}
                                                />
                                            </Grid>
                                            <Grid md={12} xs={12}>
                                                <ControlMUITextField
                                                    name="mobile"
                                                    label={t("mobile")}
                                                    
                                                    control={control}
                                                />
                                            </Grid>
                                            <Grid md={12} xs={12}>
                                                <ControlMUITextField
                                                    name="message"
                                                    label={t("message")}
                                                    control={control}
                                                    rows={3}
                                                />
                                            </Grid>
                                            <Grid md={12} xs={12}>
                                                <Button type='submit' variant='contained' fullWidth>{t("send")}</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </form>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Root>
        </Stack>
    )
}

export default Contact
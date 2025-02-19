"use client";
import { Container, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaInstagram,
    FaWhatsapp,
    FaTiktok,
    FaPhone,
    FaYoutube,
    FaSlack,
    FaRegCopyright,
} from "react-icons/fa";
import Image from "next/image";
import { config } from "@/config";
import Grid from "@mui/material/Unstable_Grid2";
import StyledLink, { StyledScroll } from "./StyledLink";
import { getServices } from "@/actions/services";
import { NavLinks } from "./Navbar";
import { usePathname, useRouter } from "next/navigation";
import { getBranches } from "@/actions/branches";

const PREFIX = "Footer";
const classes = {
    social: `${PREFIX}-social`,
    company: `${PREFIX}-company`,
};

const Root = styled(Stack)(({ theme }) => ({
    background: theme.palette.divider,
    borderTop: `2px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[5],
    [`& .${classes.social}`]: {
        display: "flex",
        flexWrap: "wrap",
        width: 40,
        height: 40,
        background: theme.palette.divider,
        borderRadius: "50%",
        "& a": {
            color: theme.palette.primary.main,
            fontSize: 22,
            display: "flex",
        },
    },
    [`& .${classes.company}`]: {
        fontSize: "18px",
        color: theme.palette.text.primary,
    },
}));

const socialIcons: { [key: string]: JSX.Element } = {
    facebook: <FaFacebookF />,
    linkedin: <FaLinkedinIn />,
    instagram: <FaInstagram />,
    whatsapp: <FaWhatsapp />,
    tiktok: <FaTiktok />,
    phone: <FaPhone />,
    youtube: <FaYoutube />,
    slack: <FaSlack />,
};


const Footer = () => {
    const { t, i18n } = useTranslation(["custom"]);
    const [services, setServices] = useState<{ id: string; title: string; titleAr: string }[]>([]);
    const [branches, setBranches] = useState<{ id: string; name: string; nameAr: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname()

    const newPathName = pathname.includes("/ar")
        ? pathname.replace("/ar", pathname === "/ar" ? "/" : "")
        : pathname;


    useEffect(() => {
        const loadServices = async () => {
            const servicesData = await getServices();
            setServices(servicesData);
            setLoading(false)
        };
        const loadBranches = async () => {
            const branchesData = await getBranches();
            setBranches(branchesData);
            setLoading(false)
        };

        loadServices();
        loadBranches();
    }, []);

    const handleScroll = (id: string) => {
        router.push("/");

        // Wait until after navigation to scroll
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100); // Adjust delay if necessary
    };

    return (
        <Root alignItems={"center"} spacing={2} py={3}>
            <Stack spacing={2} alignItems={"center"}>
                <Container maxWidth="lg">
                    <Grid container spacing={2} m={0}>
                        <Grid xs={12} sm={6} md={3}>
                            <Stack spacing={3}>
                                <Image
                                    src={"/logo-footer.webp"}
                                    alt="logo"
                                    width={80}
                                    height={80}
                                />
                                <Typography>
                                    {t("footerDescription")}
                                </Typography>
                                <Stack direction={"row"} spacing={2} flexWrap={"wrap"} useFlexGap>
                                    {config.socialLinks.map((link) => {
                                        const Icon = socialIcons[link.name];
                                        return (
                                            <Stack
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                key={link.name}
                                                className={classes.social}
                                            >
                                                <a rel="noopener noreferrer" href={link.link} target="_blank">
                                                    {Icon}
                                                </a>
                                            </Stack>
                                        );
                                    })}
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid xs={12} sm={6} md={3}>
                            <Stack spacing={2}>
                                <TypoHeadFooter label={t("services")} />
                                <Stack>
                                    {loading && [1, 2, 3, 4, 5].map((e) => (
                                        <Skeleton variant="text" key={e} width={"90px"} />
                                    ))}
                                    {services.map((service) => (
                                        <StyledLink key={service.id} href={newPathName.startsWith("/departments") ? (newPathName === "/departments" ? ("departments/" + service.id) : service.id) : "departments/" + service.id}>
                                            {i18n.language === "ar" ? service.titleAr : service.title}
                                        </StyledLink>
                                    ))}
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid xs={12} sm={6} md={3}>
                            <Stack spacing={2}>
                                <TypoHeadFooter label={t("usefulLinks")} />
                                <Stack spacing={1}>
                                    {NavLinks.map((link) =>
                                        <StyledLink key={link.label} href={link.href}>
                                            {t(link.label)}
                                        </StyledLink>
                                    )}
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid xs={12} sm={6} md={3}>
                            <Stack spacing={2}>
                                <TypoHeadFooter label={t("branches")} />
                                <Stack>
                                    {loading && [1, 2, 3, 4, 5].map((e) => (
                                        <Skeleton variant="text" key={e} width={"90px"} />
                                    ))}
                                    {branches.map((branch) => (
                                        <Typography key={branch.id} color={"text.secondary"}>
                                            {i18n.language === "ar" ? branch.nameAr : branch.name}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>


                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                    <FaRegCopyright />
                    <Typography variant="body1" fontSize={"20px"}>
                        {t("poweredDate")}
                    </Typography>
                    <Typography variant="body1" fontSize={"20px"}>
                        {t("poweredBy")}
                    </Typography>
                    <a
                        className={classes.company}
                        href="https://mountain-egy.site/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {t("companyName")}
                    </a>
                </Stack>
            </Stack>
        </Root>
    );
};

export default Footer;

const TypoHeadFooter = ({ label }: { label: string }) => {
    return <Typography fontSize={18} textTransform={"capitalize"} color={"secondary.main"}>
        {label}
    </Typography>
}

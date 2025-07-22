"use client";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Divider, MenuItem, Stack } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { styled } from "@mui/material/styles";
import { keyframes } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { config } from '@/config';
import LanguageMenu from '../Language';
import { useTranslation } from 'react-i18next';
// import DarkModeIcon from './DarkModeIcon';
import { ArrowDownward, ArrowDropDown, ArrowLeft, ArrowRight } from '@mui/icons-material';

const PREFIX = "Navbar";
const classes = {
    stickyHeader: `${PREFIX}-stickyHeader`,
    animationFade: `${PREFIX}-animationFade`,
    activeLink: `${PREFIX}-activeLink`,
    whiteColor: `${PREFIX}-whiteColor`,
};

const animationFade = keyframes`
    0% {
        top: -50px;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    100% {
        top: 0;
        -webkit-transform: none;
        transform: none;
    }
`;

const Root = styled(AppBar)(({ theme }) => ({
    borderBottom: `none`,
    boxShadow: "none",
    top: 0,
    zIndex: 1049,
    background: theme.palette.background.default,
    [`&.${classes.animationFade}`]: {
        display: "flex !important",
        animation: `${animationFade} 1s both`,
    },
    [`&.${classes.stickyHeader}`]: {
        top: "-50px",
        display: "none",
        background: theme.palette.background.default,
        boxShadow: theme.shadows[5]
    },
    [`& .${classes.activeLink}`]: {
        color: `${theme.palette.primary.main} !important`,
    },
    [`& .${classes.whiteColor}`]: {
        color: "#fff",
    },
}));

const LinkFontSize = 12
const StyledHeaderLinkPath = styled(Link)(({ theme }) => ({
    display: "inline-block",
    textDecoration: "none",
    textTransform: "uppercase",
    fontSize: LinkFontSize,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 1.5),
    },
    "&:hover": {
        color: `${theme.palette.primary.main} !important`,
        cursor: "pointer",
    },
    [theme.breakpoints.down("md")]: {
        textAlign: "center",
        padding: theme.spacing(1, 0),

        width: "100%",
        color: theme.palette.text.secondary,
    },
}));

const MenuItemStyle = styled(MenuItem)(({ theme }) => ({
    padding: 0,
    "& a": {
        padding: theme.spacing(2),
        textDecoration: "none",
        color: theme.palette.text.secondary,
        "&:hover": {
            color: `${theme.palette.primary.main} !important`,
            cursor: "pointer",
        },
    }
}));
const StackStyle = styled(Stack)(({ theme }) => ({
    cursor: "pointer"
}));

const HeaderLinkPath = (props: any) => {
    const { to, className, } = props;
    // const theme = useTheme();
    return (
        <StyledHeaderLinkPath
            href={to}
            className={className}
        >
            {props.children}
        </StyledHeaderLinkPath>
    );
};

export const NavLinks = [
    { href: "/", label: "home" },
    { href: "/clients", label: "clients" },
    { href: "/employment", label: "employment" },
    { href: "/news", label: "news" },
    { href: "/articles", label: "articles" },
    { href: "/departments", label: "services" },
    { href: "/contact-us", label: "contact" },
    { href: "/clinics-schedule", label: "schedules" },
]

function Navbar({
    servicesData
}: {
    servicesData: {
        id: string,
        title: string,
        titleAr: string,
    }[]
}) {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [shouldShowHeader, setShouldShowHeader] = useState<boolean>(false);
    const [animationClass, setAnimationClass] = useState<string>('');
    const pathname = usePathname()

    const newPathName = pathname.includes("/ar")
        ? pathname.replace("/ar", pathname === "/ar" ? "/" : "")
        : pathname;

    const { t, i18n } = useTranslation();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const listenToScroll = () => {
        setShouldShowHeader(window.pageYOffset > 300);
    };

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", listenToScroll);
        };
    }, []);

    useEffect(() => {
        if (shouldShowHeader) {
            setAnimationClass(classes.animationFade);
        } else {
            setAnimationClass('');
        }
    }, [shouldShowHeader]);

    const [anchorService, setAnchorElService] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorService);
    const handleOpenServices = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElService(event.currentTarget);
    };
    const handleCloseServices = () => {
        setAnchorElService(null);
    };

    const menuPaper = <Menu
        anchorEl={anchorService}
        id="account-menu"
        open={open}
        onClose={handleCloseServices}
        onClick={handleCloseServices}

        transformOrigin={{ horizontal: i18n.dir() === "ltr" ? "right" : 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: i18n.dir() === "ltr" ? "right" : 'left', vertical: 'bottom' }}
    >
        {servicesData.map(e =>
            <MenuItemStyle key={e.id}>
                <Link href={newPathName.startsWith("/departments") ? (newPathName === "/departments" ? ("departments/" + e.id) : e.id) : "departments/" + e.id} >
                    {i18n.language === "ar" ? e.titleAr : e.title}
                </Link>
            </MenuItemStyle>
        )}
    </Menu>

    const serviceMenuIcon = (href: string) => <StackStyle
        onClick={handleOpenServices}
        alignItems={"center"}
        justifyContent={"center"}
        color={"text.secondary"}
        // className={clsx({ [classes.whiteColor]: !shouldShowHeader })}
    >
        {anchorService ? <ArrowDropDown /> : i18n.language === "ar" ? <ArrowLeft /> : <ArrowRight />}
    </StackStyle>


    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            handleCloseNavMenu()
        }
    };


    return (
        <Root
            position={shouldShowHeader ? "fixed" : "absolute"}
            className={clsx({
                [classes.stickyHeader]: shouldShowHeader,
                [animationClass]: shouldShowHeader,
            })}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 1 }}>
                    <Stack mx={2}>
                        <Link href='/' passHref>
                            <Image
                                src={"/logo.webp"}
                                alt="logo"
                                width={150}
                                height={55}
                            />

                        </Link>
                    </Stack>
                    <Stack direction={"row"} spacing={1} useFlexGap alignItems={"center"}>
                        <Stack direction={"row"} alignItems={"center"} spacing={1} useFlexGap sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {NavLinks.map((link, index) => {
                                if (link.label === "services") {
                                    return (
                                        <Stack key={index} direction={"row"} alignItems={"center"}>
                                            {menuPaper}
                                            <HeaderLinkPath
                                                to={link.href}
                                                className={clsx({
                                                    [classes.activeLink]: newPathName === link.href,
                                                    // [classes.whiteColor]: !shouldShowHeader
                                                })}
                                            >
                                                {t(link.label)}
                                            </HeaderLinkPath>
                                            {serviceMenuIcon(link.href)}
                                        </Stack>
                                    )
                                }
                                return (
                                    <HeaderLinkPath
                                        key={index}
                                        to={link.href}
                                        className={clsx({
                                            [classes.activeLink]: newPathName === link.href,
                                            // [classes.whiteColor]: !shouldShowHeader
                                        })}
                                    >
                                        {t(link.label)}
                                    </HeaderLinkPath>
                                )
                            })}
                            <Stack direction={"row"} spacing={1}>
                                {config.app.languages.length !== 1 && <LanguageMenu />}
                            </Stack>
                        </Stack>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="default"
                            >
                                <MenuIcon color='primary' />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <Stack p={2} spacing={1}>
                                    <Stack direction={"row"} spacing={1} justifyContent={"center"}>
                                        {config.app.languages.length !== 1 && <LanguageMenu />}
                                        {/* <Divider orientation="vertical" flexItem />
                                        <DarkModeIcon /> */}
                                    </Stack>
                                    {NavLinks.map((link, index) => {
                                        if (link.label === "services") {
                                            return (
                                                <>
                                                    <Stack key={index} direction={"row"} alignItems={"center"}>
                                                        {menuPaper}
                                                        <HeaderLinkPath

                                                            to={link.href}
                                                            className={clsx({
                                                                [classes.activeLink]: newPathName === link.href,
                                                                // [classes.whiteColor]: !shouldShowHeader && newPathName !== link.href && newPathName === "/"
                                                            })}
                                                        >
                                                            {t(link.label)}
                                                        </HeaderLinkPath>
                                                        {serviceMenuIcon(link.href)}
                                                    </Stack>
                                                    {<Divider flexItem />}
                                                </>
                                            )
                                        }
                                        return (
                                            <Fragment key={index}>
                                                <MenuItem onClick={handleCloseNavMenu}>
                                                    <HeaderLinkPath to={link.href} className={clsx({ [classes.activeLink]: newPathName === link.href })}>
                                                        {t(link.label)}
                                                    </HeaderLinkPath>
                                                </MenuItem>
                                                {index !== NavLinks.length - 1 && <Divider flexItem />}
                                            </Fragment>
                                        )
                                    })}
                                </Stack>
                            </Menu>
                        </Box>
                    </Stack>
                </Toolbar>
            </Container>
        </Root>
    );
}

export default Navbar;

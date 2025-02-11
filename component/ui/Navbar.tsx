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
import DarkModeIcon from './DarkModeIcon';
import { ArrowDownward, ArrowDropDown, ArrowLeft } from '@mui/icons-material';

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
        color: theme.palette.primary.main,
    },
    [`& .${classes.whiteColor}`]: {
        color: "#fff",
    },
}));

const StyledHeaderLinkPath = styled(Link)(({ theme }) => ({
    display: "inline-block",
    textDecoration: "none",
    textTransform: "uppercase",
    fontSize: 15,
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
const StyledHeaderLink = styled(Stack)(({ theme }) => ({
    display: "inline-block",
    textDecoration: "none",
    textTransform: "uppercase",
    fontSize: 15,
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
        color: "#fff",
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

const NavLinks = [
    { href: "/", label: "home" },
    { href: "/clients", label: "clients" },
    { href: "/employment", label: "employment" },
    { href: "/news", label: "news" },
    { href: "/services", label: "services" },
    { href: "contact-us", label: "contact" },
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
        slotProps={{
            paper: {
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            },
        }}
        transformOrigin={{ horizontal: i18n.dir() === "ltr" ? "right" : 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: i18n.dir() === "ltr" ? "right" : 'left', vertical: 'bottom' }}
    >
        {servicesData.map(e =>
            <MenuItemStyle key={e.id}>
                <Link href={newPathName.startsWith("/services") ? (newPathName === "/services" ? ("services/" + e.id) : e.id) : "services/" + e.id} >
                    {i18n.language === "ar" ? e.titleAr : e.title}
                </Link>
            </MenuItemStyle>
        )}
    </Menu>

    const serviceMenuIcon = (link: any) => <StackStyle
        onClick={handleOpenServices}
        alignItems={"center"}
        justifyContent={"center"}
        color={"text.secondary"}
    >
        {anchorService ? <ArrowDropDown /> : <ArrowLeft />}
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
            sx={{ background: (theme) => pathname.includes("/services") ? theme.palette.background.default : "transparent" }}
            className={clsx({
                [classes.stickyHeader]: shouldShowHeader,
                [animationClass]: shouldShowHeader,
            })}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 2 }}>
                    <Stack mx={2}>
                        <Image src={"/logo.webp"} alt="logo" width={80} height={80} objectFit='contain' />
                        {/* <img src={logo} alt='logo' height={80} srcSet={logo} /> */}
                    </Stack>
                    <Stack direction={"row"} spacing={1} useFlexGap alignItems={"center"}>
                        <Stack direction={"row"} alignItems={"center"} spacing={1} useFlexGap sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {NavLinks.map((link, index) => {
                                if (link.label === "contact") {
                                    return (
                                        <StyledHeaderLink
                                            key={index}
                                            direction={"row"}
                                            alignItems={"center"}
                                            onClick={() => handleScroll(link.href)}
                                        >
                                            {t(link.label)}
                                        </StyledHeaderLink>
                                    )
                                }
                                if (link.label === "services") {
                                    return (
                                        <Stack key={index} direction={"row"} alignItems={"center"}>
                                            {menuPaper}
                                            <HeaderLinkPath

                                                to={link.href}
                                                className={clsx({ [classes.activeLink]: newPathName === link.href, [classes.whiteColor]: !shouldShowHeader && newPathName !== link.href && newPathName === "/" })}
                                            >
                                                {t(link.label)}
                                            </HeaderLinkPath>
                                            {serviceMenuIcon(link)}
                                        </Stack>
                                    )
                                }
                                return (
                                    <HeaderLinkPath
                                        key={index}
                                        to={link.href}
                                        className={clsx({ [classes.activeLink]: newPathName === link.href, [classes.whiteColor]: !shouldShowHeader && newPathName !== link.href && newPathName === "/" })}
                                    >
                                        {t(link.label)}
                                    </HeaderLinkPath>
                                )
                            })}
                            {/* {webLinks && webLinks()} */}
                            <Stack direction={"row"} spacing={1}>
                                {/* {websiteData.app.key === "mountain" && <Settings />} */}
                                {config.app.languages.length !== 1 && <LanguageMenu />}
                                <DarkModeIcon />
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
                                        <Divider orientation="vertical" flexItem />
                                        <DarkModeIcon />
                                    </Stack>
                                    {NavLinks.map((link, index) => {
                                        if (link.label === "contact") {
                                            return (
                                                <StyledHeaderLink
                                                    key={index}
                                                    direction={"row"}
                                                    alignItems={"center"}
                                                    onClick={() => handleScroll(link.href)}
                                                >
                                                    {t(link.label)}
                                                </StyledHeaderLink>
                                            )
                                        }
                                        if (link.label === "services") {
                                            return (
                                                <>
                                                    <Stack key={index} direction={"row"} alignItems={"center"}>
                                                        {menuPaper}
                                                        <HeaderLinkPath

                                                            to={link.href}
                                                            className={clsx({ [classes.activeLink]: newPathName === link.href, [classes.whiteColor]: !shouldShowHeader && newPathName !== link.href && newPathName === "/" })}
                                                        >
                                                            {t(link.label)}
                                                        </HeaderLinkPath>
                                                        {serviceMenuIcon(link)}

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

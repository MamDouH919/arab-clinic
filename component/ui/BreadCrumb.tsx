"use client";
import { Box, Breadcrumbs, Container, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { useTranslation } from "react-i18next";
import Link from "next/link";

const PREFIX = "BreadCrumb";
const classes = {
    activeLink: `${PREFIX}-activeLink`,
    breadcrumbs: `${PREFIX}-breadcrumbs`,
    content: `${PREFIX}-content`,
};

interface RootProps {
    image?: string;
}

const Root = styled(Stack)<RootProps>(({ theme, image }) => ({
    // background: theme.palette.background.paper,
    backgroundImage: image ? `url("${image}")` : theme.palette.background.default,
    paddingTop: "70px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: 600,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
        height: 400,
    },
    "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `rgba(0, 0, 0, 0.65)`,
    },
    [`& .${classes.activeLink}`]: {
        color: theme.palette.primary.main,
        // color: "#fff",
        fontSize: "1.1rem",
        textDecoration: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "capitalize",
        [`&:hover`]: {
            opacity: 1,
            textDecoration: "underline",
        },
    },
    [`& .${classes.breadcrumbs} .MuiBreadcrumbs-ol`]: {
        position: "relative",
        zIndex: 10,
        justifyContent: "flex-start",
    },
    [`& .${classes.content}`]: {
        position: "relative",
        zIndex: 10,
        color: "#fff",
    },
}));

interface inputProps {
    pageLink: string;
    prevLink?: {
        name: string;
        link: string;
    };
    description?: string;
    bgImage?: string;
}

const BreadCrumb = (props: inputProps) => {
    const { pageLink, prevLink, description, bgImage } = props;
    const { t } = useTranslation();
    return (
        <Root image={bgImage} justifyContent={"center"} alignItems={"flex-start"}>
            <Container maxWidth="lg">
                <Stack className={classes.content} spacing={1}>
                    <Typography
                        variant="h1"
                        fontSize={{ xs: 24, md: 50 }}
                        textTransform="capitalize"
                        lineHeight={1}
                    >
                        {t(pageLink)}
                    </Typography>
                    {description && <Typography fontSize={22} textTransform="capitalize">
                        {t(description)}
                    </Typography>}
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        className={classes.breadcrumbs}
                        separator={<Box color={"#fff"}>/</Box>}
                    >
                        <Link
                            href={"/"}
                            className={classes.activeLink}
                        >
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {t("home")}
                        </Link>
                        {prevLink && <Link href={`/${prevLink.link}`} className={classes.activeLink}>
                            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {t(prevLink.name)}
                        </Link>}
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            fontSize={"1.1rem"}
                            color="#fff"
                            textTransform="capitalize"
                        >
                            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {t(pageLink)}
                        </Stack>
                    </Breadcrumbs>
                </Stack>
            </Container>
        </Root>
    )
}

export default BreadCrumb

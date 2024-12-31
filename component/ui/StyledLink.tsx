"use client"
import React from 'react'
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { Typography } from '@mui/material';

const PREFIX = "StyledLink";
const classes = {
    link: `${PREFIX}-link`,
};

const Root = styled("div")(({ theme }) => ({
    cursor: "pointer",
    [`& .${classes.link}`]: {
        textDecoration: "none",
        color: theme.palette.text.secondary,
        transition: "all 0.5s",
        "&:hover": {
            textDecoration: "underline",
            color: theme.palette.primary.main,
        },
    }
}))

export const StyledScroll = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
    return (
        <Root>
            <Typography onClick={onClick} className={classes.link}>
                {children}
            </Typography>
        </Root>
    )
}

const StyledLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    return (
        <Root>
            <Link href={href} className={classes.link}>
                {children}
            </Link>
        </Root>
    )
}

export default StyledLink

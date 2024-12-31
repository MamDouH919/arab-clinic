import React from 'react'
import { styled } from '@mui/material/styles';
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaSnapchatGhost, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { ArrowForward } from '@mui/icons-material';
import { IoLocationSharp } from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';
import { HiUserGroup } from 'react-icons/hi';
import { FcShare } from 'react-icons/fc';
import { GiWorld } from 'react-icons/gi';
import Link from 'next/link';

const PREFIX = 'InfoQr';

const classes = {
    paper: `${PREFIX}-paper`,
    avatar: `${PREFIX}-avatar`,
};

const Root = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    display: "flex",
    width: "100%",
    // [`& .${classes.paper}`]: {
    //     borderRadius: "25px",
    // },
    [`& .${classes.avatar}`]: {
        background: theme.palette.divider
    },
}));

const Icons = {
    facebook: <FaFacebookF color='#1877F2' size={20} />,
    instagram: <FaInstagram color='#DD2A7B' size={20} />,
    tikTok: <FaTiktok color='#000' size={20} />,
    twitter: <FaXTwitter color='#000' size={20} />,
    snapChat: <FaSnapchatGhost color='#FFFC00' size={20} />,
    phone: <FaPhoneAlt color='green' size={20} />,
    location: <IoLocationSharp color='#EA4335' size={30} />,
    whatsApp: <FaWhatsapp color='#25D366' size={30} />,
    youtube: <FaYoutube color='#FF0000' size={30} />,
    group: <HiUserGroup color='#1877F2' size={30} />,
    Share: <FcShare size={30} />,
    website: <GiWorld color='grey' size={30} />,
}

const SocialCard = ({
    type,
    to,
    title,
}: {
    type: "facebook" |
    "instagram" |
    "tikTok" |
    "twitter" |
    "snapChat" |
    "phone" |
    "location" |
    "whatsApp" |
    "youtube" |
    "group" |
    "Share" |
    "website"
    to: string
    title: string
}) => {
    const DATA = <Stack
        width={"100%"}
        component={Paper}
        px={2}
        py={1}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        className={classes.paper}
        elevation={2}
    >
        <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
        >
            <Avatar className={classes.avatar}>
                {Icons[type]}
            </Avatar>
            <Typography fontSize={15}>
                {title ?? type}
            </Typography>
        </Stack>
    </Stack>
    return (
        <Root href={to} target='_blank'>
            {DATA}
        </Root>
    )
}

export default SocialCard
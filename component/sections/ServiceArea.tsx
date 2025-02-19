"use client"
import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import { Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import CustomDialog from '../ui/customDialog';
import SocialCard from '../ui/SocialCard';
import ButtonLink from '../ui/ButtonLink';

const PREFIX = "service-area";
const classes = {
    title: `${PREFIX}-title`,
    desc: `${PREFIX}-desc`,
};

const Root = styled(Stack)(({ theme }) => ({
    background: theme.palette.primary.light,
    borderTop: `2px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[5],
    [`& .${classes.title}`]: {
        color: theme.palette.getContrastText(theme.palette.primary.light),
    },
    [`& .${classes.desc}`]: {
        color: "#eee",
    },
}));

type BranchType = {
    id: string,
    name: string,
    nameAr: string,
    location: string,
    locationAr: string,
    mobile: string,
    whatsApp: string,
    imagePath: string,
    gps: string
}

const ServiceArea = ({ branches }: { branches: BranchType[] }) => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const { t } = useTranslation(["dashboard"])

    const [branchSelected, setBranchSelected] = useState<string>()

    useEffect(() => {
        setBranchSelected(branches[0].id)
        return () => { }
    }, [branches])

    const handleChange = (event: SelectChangeEvent) => {
        setBranchSelected(event.target.value as string);
    };

    return (
        <Root py={5} >
            {open && <CustomDialog
                open={open}
                handleClose={handleClose}
                title={t("bookYourAppointment")}
                maxWidth='xs'
                content={
                    <Stack p={2} spacing={2} alignItems={"center"}>
                        <Grid container spacing={2} m={0} width={"100%"}>
                            <Grid xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{t("branch")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={branchSelected}
                                        label={t("branch")}
                                        onChange={handleChange}
                                        size='small'
                                    >
                                        {branches.map(e => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid sm={6} xs={12} >
                                <SocialCard
                                    to={`tel:${branches.find(e => e.id === branchSelected)?.mobile}`}
                                    type={"phone"}
                                    title={branches.find(e => e.id === branchSelected)?.mobile.replace("+20", "")!}
                                />
                            </Grid>
                            <Grid sm={6} xs={12} >
                                <SocialCard
                                    to={`https://wa.me/${branches.find(e => e.id === branchSelected)?.whatsApp}`}
                                    type={"whatsApp"}
                                    title={branches.find(e => e.id === branchSelected)?.whatsApp.replace("+20", "")!}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                }
                actions={
                    <Stack>
                        <Button color='inherit' onClick={handleClose}>{t("cancel")}</Button>
                    </Stack>
                }
            />}
            <Container maxWidth="lg">
                <Grid container spacing={2} m={0} justifyContent={"center"} alignItems={"center"}>
                    <ServiceData
                        title={t("bookYourAppointment")}
                        src="/staticImages/appo.png"
                        desc={t("serviceDataDesc1")}
                        btn={
                            <Button size='small' variant='contained' color='secondary' onClick={handleOpen}>
                                {t("makeAnAppointment")}
                            </Button>
                        }
                    />
                    <ServiceData
                        desc={t("serviceDataDesc2")}
                        title={t("findADoctor")}
                        src='/staticImages/doc.png'
                        btn={
                            <ButtonLink href='/doctors' size='small' variant='contained' color='secondary' linkLabel={t("doctorList")} />
                        }
                    />
                    <ServiceData
                        desc={t("serviceDataDesc3")}
                        title={t("services")}
                        src="/staticImages/depart.png"
                        btn={
                            <ButtonLink href='/departments' size='small' variant='contained' color='secondary' linkLabel={t("servicesList")} />
                        }
                    />
                </Grid>
            </Container>
        </Root >
    )
}

export default ServiceArea


const ServiceData = ({
    title,
    src,
    desc,
    btn
}: {
    title: string
    src: string
    desc: string
    btn: any
}) => {
    return (
        <Grid md={4} sm={6} xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Stack alignItems={"center"} spacing={1}>
                <Image
                    src={src}
                    alt={title}
                    width={50}
                    height={50}
                />
                <Typography className={classes.title} fontSize={19}>
                    {title}
                </Typography>
                <Typography className={classes.desc} fontSize={15} textAlign={"center"}>
                    {desc}
                </Typography>
                {btn}
            </Stack>
        </Grid>
    )
}
"use client"
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from "@mui/material/styles";
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import StyledLink from '../ui/StyledLink';

const PREFIX = "Services";
const classes = {
    serviceWrapper: `${PREFIX}-serviceWrapper`,
    imageWhite: `${PREFIX}-imageWhite`,
    serviceGrid: `${PREFIX}-serviceGrid`,
};
const Root = styled("div")(({ theme }) => ({
    [`& .${classes.serviceGrid}`]: {
        display: "flex",
    },
    [`& .${classes.serviceWrapper}`]: {
        overflow: "hidden",
    }
}));

interface inputProps {
    data: {
        id: string,
        title: string,
        titleAr: string,
        iconPath: string,
        description: string,
        descriptionAr: string,
        minDescription: string,
        minDescriptionAr: string
    }[]
}

const BoxStyle = styled(Box)(({ theme }) => ({
    background: theme.palette.background.default,
}));

const Services = (props: inputProps) => {
    const { data } = props
    const { t, i18n } = useTranslation()

    return (
        <BoxStyle py={2}>
            <Root style={{ margin: "32px 0" }}>
                <Container maxWidth={'lg'}>
                    <Stack justifyContent={"center"} alignItems={"center"}>
                        <Grid container spacing={4} m={0} alignItems={"stretch"} justifyContent={"center"} zIndex={1} width={"100%"}>
                            {data.map((service, index) => {
                                return (
                                    <Grid md={4} sm={6} xs={12} key={index} className={classes.serviceGrid}>
                                        <Stack component={Paper} alignItems={"center"} spacing={2} width={"100%"} className={classes.serviceWrapper}>
                                            <Box position={"relative"} width={"100%"} height={"350px"}>
                                                <Image
                                                    src={service.iconPath}
                                                    alt={service.title}
                                                    layout="fill"
                                                    objectFit="cover" // Adjust this if needed (cover, contain, etc.)
                                                />
                                            </Box>
                                            <Typography textAlign={"center"} fontSize={25}>
                                                {i18n.language === "en" ? service.title : service.titleAr}
                                            </Typography>
                                            <Typography textAlign={"center"} fontSize={15} color={"text.secondary"} minHeight={"50px"}>
                                                {i18n.language === "en" ? service.minDescription : service.minDescriptionAr}
                                            </Typography>
                                            {/* <DangerouslySetInnerHTML limit data={i18n.language === "en" ? service.description : service.descriptionAr} /> */}
                                            <Stack pb={1}>
                                                <StyledLink href={`/departments/${service.id}`}>
                                                    {t("readMore")} ...
                                                </StyledLink>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                )
                            }
                            )}
                        </Grid>
                    </Stack>
                </Container>
            </Root>
        </BoxStyle>
    )
}

export default Services
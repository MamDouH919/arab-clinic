"use client"
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { styled } from "@mui/material/styles";
import { keyframes } from '@mui/system';
import SectionTitle from '../ui/SectionTitle';
// import { useAppSelector } from '../store/store';

const PREFIX = "Clients";
const classes = {
    slider: `${PREFIX}-slider`,
    sliderTrack: `${PREFIX}-sliderTrack`,
    slide: `${PREFIX}-slide`,
};


const Root = styled(Box)(({ theme }) => ({
    [`& .${classes.slider}`]: {
        height: "200px",
        margin: "auto",
        position: "relative",
        width: "100%",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
    },
    [`& .${classes.sliderTrack}`]: {
        display: "flex",

        [`&:hover`]: {
            animationPlayState: "paused"
        },
    },
    [`& .${classes.slide}`]: {
        height: "200px",
        width: "180px",
        display: "flex",
        alignItems: "center",
        padding: "15px",
        [`& img`]: {
            width: "100%",
            borderRadius: "50%"
        }
    }
}));


const Clients = ({ data }: { data: { id: number, name: string, nameAr: string, image: string }[] }) => {
    const scrollToRight = keyframes`
    0% {transform: translateX(0);}
    100% {transform: translateX(calc(-250px * ${data.length / 2}));`;

    const scrollToLeft = keyframes`
    0% {transform: translateX(0);}
    100% {transform: translateX(calc(250px * ${data.length / 2}));}`;


    const { i18n } = useTranslation()

    return (
        <Root sx={{ background: (theme) => theme.palette.background.default }} py={2}>
            <SectionTitle
                sectionTitle={"sectionTitle"}
                subSectionTitle={"subSectionTitle"}
            />
            <div className={classes.slider} style={{ direction: i18n.language === "ar" ? "ltr" : "rtl" }}>

                <Box className={`${i18n.language === "ar" ? "right" : "left"} ${classes.sliderTrack}`}
                    sx={{
                        width: `calc(250px * ${data.length * 2})`,
                        overflow: "hidden",
                        [`&.right`]: {
                            animation: `${scrollToRight} 50s linear infinite`,
                        },
                        [`&.left`]: {
                            animation: `${scrollToLeft} 50s linear infinite`,
                        },
                    }}
                >
                    {data.map((client, index) => (
                        <div className={classes.slide} key={index}>
                            <img src={client.image} alt={`data`} />
                        </div>
                    ))}
                    {data.map((client, index) => (
                        <div className={classes.slide} key={index}>
                            <img src={client.image} alt={`data`} />
                        </div>
                    ))}
                </Box>
            </div>
            {/* {viewAllClients} */}
        </Root>
    )
}

export default Clients
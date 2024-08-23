import React from 'react'
import { Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import db from '@/db/db';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteItem from './component/delete';
import AddIcon from '@mui/icons-material/Add';
import FormItem from './component/form';
import EditHighlight from './component/getById';
import { ListHeaderTitle } from '@/component/ui/ListHeader';
import initTranslations from '@/app/i18n';
import NoData from '@/component/ui/NoData';


const Page = async ({
    params: { locale }
}: {
    params: { locale: string }
}) => {
    const { t } = await initTranslations(locale, ['dashboard']);
    return (
        <Stack spacing={2}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} useFlexGap>
                <ListHeaderTitle title={"highlights"} />
                <FormItem>
                    <Button variant="contained" color="primary" size="medium">
                        {t("New")}
                    </Button>
                </FormItem>
            </Stack>
            <Grid container spacing={2} m={0} alignItems={"stretch"}>
                <HighlightsData locale={locale} />
            </Grid>
        </Stack>
    )
}

export default Page

const HighlightsData = async ({ locale }: { locale: string }) => {
    const highlights = await db.highlights.findMany({
        select: {
            id: true,
            nameAr: true,
            nameEn: true,
            number: true,
            createdAt: true,
        },
        orderBy: { createdAt: "asc" },
    })

    if (highlights.length === 0) return <NoData locale={locale} />

    return highlights.map((highlight) => (
        <Grid display={"flex"} key={highlight.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Paper sx={{ padding: "20px", width: "100%" }}>
                <Stack spacing={2}>
                    <Typography variant="h6" fontSize={30}>{locale === "en" ? highlight.nameEn : highlight.nameAr}</Typography>
                    <Typography variant="h6" fontSize={30}>{highlight.number}</Typography>
                    <Stack direction={"row"} spacing={2} >
                        <FormItem id={highlight.id}>
                            <IconButton size="small">
                                <EditIcon fontSize='small' />
                            </IconButton>
                        </FormItem>
                        <DeleteItem id={highlight.id}>
                            <IconButton size="small">
                                <DeleteIcon fontSize='small' />
                            </IconButton>
                        </DeleteItem>
                    </Stack>
                </Stack>
            </Paper>
        </Grid>
    ))
}
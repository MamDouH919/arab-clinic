import React from 'react'
import { Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import db from '@/db/db';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
// import FormItem from './component/form';
import { ListHeaderTitle } from '@/component/ui/ListHeader';
import initTranslations from '@/app/i18n';
import NoData from '@/component/ui/NoData';
import DeleteItem from '../_component/delete';
import ButtonLink from '@/component/ui/ButtonLink';
import Image from 'next/image';
import Link from 'next/link';
import { deleteNews } from '@/actions/new';


const Page = async ({
    params: { locale }
}: {
    params: { locale: string }
}) => {
    const { t } = await initTranslations(locale, ['dashboard']);
    return (
        <Stack spacing={2}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} useFlexGap>
                <ListHeaderTitle title={"news"} />
                <ButtonLink href='/admin/services/create' linkLabel={t("New")} />
            </Stack>
            <Grid container spacing={2} m={0} alignItems={"stretch"}>
                <NewsData locale={locale} />
            </Grid>
        </Stack>
    )
}

export default Page

const NewsData = async ({ locale }: { locale: string }) => {
    const news = await db.services.findMany({
        select: {
            id: true,
            icon: true,
            title: true,
            titleAr: true
        },
        orderBy: { createdAt: "asc" },
    })

    if (news.length === 0) return <NoData />

    return news.map((item) => (
        <Grid display={"flex"} key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Paper sx={{ padding: "20px", width: "100%" }}>
                <Stack spacing={2}>
                    <Image
                        src={item.icon}
                        alt={item.title}
                        width={200} // Required for Next.js Image optimization
                        height={200} // Required for Next.js Image optimization
                        layout="responsive" // Allows the image to be responsive
                        objectFit="cover" // Ensures the image covers the entire area
                        style={{ width: '100%', height: '200px' }} // Forces the image to take full width and fixed height
                    />
                    <Typography variant="h6" fontSize={25} textAlign={"center"}>{locale === "en" ? item.title : item.titleAr}</Typography>

                    <Stack direction={"row"} spacing={1} >
                        <IconButton size="small" component={Link} href={`/admin/news/${item.id}`}>
                            <EditIcon fontSize='small' />
                        </IconButton>
                        <DeleteItem deleteFun={deleteNews} id={item.id}>
                            <IconButton size="small">
                                <DeleteIcon fontSize='small' color='error' />
                            </IconButton>
                        </DeleteItem>
                    </Stack>
                </Stack>
            </Paper>
        </Grid>
    ))
}
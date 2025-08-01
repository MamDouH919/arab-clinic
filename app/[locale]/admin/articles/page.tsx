import React from 'react'
import { Button, Paper, Stack, Typography } from '@mui/material';
import db from '@/db/db';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ListHeaderTitle } from '@/component/ui/ListHeader';
import initTranslations from '@/app/i18n';
import NoData from '@/component/ui/NoData';
import DeleteItem from '../_component/delete';
import ButtonLink from '@/component/ui/ButtonLink';
import Image from 'next/image';
import { deleteArticles } from '@/actions/articles';


const Page = async ({
    params: { locale }
}: {
    params: { locale: string }
}) => {
    const { t } = await initTranslations(locale, ['dashboard']);
    return (
        <Stack spacing={2}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} useFlexGap>
                <ListHeaderTitle title={"articles"} />
                <ButtonLink href='/admin/articles/create' linkLabel={t("New")} />
            </Stack>
            <Grid container spacing={2} m={0} alignItems={"stretch"}>
                <ArticlesData locale={locale} />
            </Grid>
        </Stack>
    )
}

export default Page

const ArticlesData = async ({ locale }: { locale: string }) => {
    const { t } = await initTranslations(locale, ['dashboard']);

    const articles = await db.articles.findMany({
        select: {
            id: true,
            description: true,
            descriptionAr: true,
            imagePath: true,
            title: true,
            titleAr: true,
            createdAt: true,
        },
        orderBy: { createdAt: "asc" },
    })

    if (articles.length === 0) return <NoData />

    return articles.map((item) => (
        <Grid display={"flex"} key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Paper sx={{ padding: "20px", width: "100%" }}>
                <Stack spacing={2}>
                    <Image
                        src={item.imagePath}
                        alt={item.title}
                        width={200} // Required for Next.js Image optimization
                        height={200} // Required for Next.js Image optimization
                        layout="responsive" // Allows the image to be responsive
                        objectFit="cover" // Ensures the image covers the entire area
                        style={{ width: '100%', height: '200px' }} // Forces the image to take full width and fixed height
                    />
                    <Typography variant="h6" fontSize={25} textAlign={"center"}>{locale === "en" ? item.title : item.titleAr}</Typography>
                    <div
                        style={{
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 3, /* number of lines to show */
                            lineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                        }}
                        dangerouslySetInnerHTML={{ __html: locale === "en" ? item.description : item.descriptionAr }}
                    />

                    <Stack direction={"row"} spacing={1}>
                        <Stack width={"100%"}>
                            <ButtonLink
                                size="small"
                                fullWidth
                                href={`/admin/articles/${item.id}`}
                                linkLabel={t("edit")}
                                startIcon={<EditIcon fontSize='small' />}
                            />
                        </Stack>
                        <Stack width={"100%"}>
                            <DeleteItem deleteFun={deleteArticles} id={item.id}>
                                <Button size="small" variant='contained' fullWidth color="error" endIcon={<DeleteIcon fontSize='small' />}>
                                    {t("delete")}
                                </Button>
                            </DeleteItem>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </Grid>
    ))
}
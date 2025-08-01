import BreadCrumb from '@/component/ui/BreadCrumb'
import React from 'react'
import NoData from '@/component/ui/NoData'
import initTranslations from '@/app/i18n'
import db from '@/db/db'
import Image from 'next/image'
import { Container, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import StyledLink from '@/component/ui/StyledLink'
import { cache } from '@/lib/cache'

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
    return (
        <div>
            <BreadCrumb pageLink={"articles"} bgImage='/staticImages/news-bg.webp' />
            <Stack py={10}>
                <ArticlesData locale={locale} />
            </Stack>
        </div>
    )
}

export default Page


const ArticlesData = async ({ locale }: { locale: string }) => {
    const { t } = await initTranslations(locale, ['website'])

    const getProducts = cache(() => {
        return db.articles.findMany({
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
    }, ["/articles", "getProducts"])

    const articles = await getProducts()

    if (articles.length === 0) return <NoData label={t("noArticles")} />

    return <Container maxWidth="lg">
        <Grid container spacing={2} m={0} alignItems={"stretch"} justifyContent={"center"}>
            {articles.map((item) => (
                <Grid display={"flex"} key={item.id} xs={12} md={4}>
                    <Paper sx={{ padding: "20px", width: "100%" }}>
                        <Stack spacing={2}>
                            <Image
                                src={item.imagePath}
                                alt={item.title}
                                width={200} // Required for Next.js Image optimization
                                height={200} // Required for Next.js Image optimization
                                layout="responsive" // Allows the image to be responsive
                                objectFit="cover" // Ensures the image covers the entire area
                                style={{ width: '100%', maxHeight: '350px', minHeight: '350px' }} // Forces the image to take full width and fixed height
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
                            <StyledLink href={`/articles/${item.id}`}>
                                {t("readMore")} ...
                            </StyledLink>
                        </Stack>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    </Container>
}
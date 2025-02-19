import React from 'react'
import { Button, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormItem from './component/form';
import { ListHeaderTitle } from '@/component/ui/ListHeader';
import NoData from '@/component/ui/NoData';
import initTranslations from '@/app/i18n';
import DeleteItem from '../_component/delete';
import Image from 'next/image';
import { deleteSchedule, getSchedules } from '@/actions/schedules';

const Page = async ({
    params: { locale }
}: {
    params: { locale: string }
}) => {
    const { t } = await initTranslations(locale, ['dashboard']);

    return (
        <Stack spacing={2}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} useFlexGap>
                <ListHeaderTitle title={"schedules"} />
                <FormItem>
                    <Button variant="contained" color="primary" size="medium">
                        {t("New")}
                    </Button>
                </FormItem>

            </Stack>
            <Grid container spacing={2} m={0} alignItems={"stretch"}>
                <SchedulesData locale={locale} />
            </Grid>
        </Stack>
    )
}

export default Page

const SchedulesData = async ({ locale }: { locale: string }) => {
    const { t } = await initTranslations(locale, ['dashboard']);

    const schedules = await getSchedules()

    if (schedules.length === 0) return <NoData />

    return schedules.map((schedule) => (
        <Grid display={"flex"} key={schedule.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Paper sx={{ padding: "20px", width: "100%" }}>
                <Stack spacing={2} alignItems={"center"}>
                    <Image
                        src={schedule.imagePath}
                        alt={schedule.imageName}
                        width={200}
                        height={200}
                        layout="responsive"
                        objectFit="cover"
                        style={{ width: '100%', maxHeight: '250px', minHeight: '250px' }}
                    />
                    <Stack direction={"row"} spacing={1}>
                        <Stack width={"100%"}>
                            <FormItem id={schedule.id}>
                                <Button
                                    size="small"
                                    variant='contained'
                                    fullWidth
                                    endIcon={<EditIcon fontSize='small' />}
                                >
                                    {t("edit")}
                                </Button>
                            </FormItem>
                        </Stack>
                        <Stack width={"100%"}>
                            <DeleteItem deleteFun={deleteSchedule} id={schedule.id}>
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
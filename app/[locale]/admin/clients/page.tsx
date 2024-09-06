import React from 'react'
import { Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import db from '@/db/db';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { ListHeaderTitle } from '@/component/ui/ListHeader';
import initTranslations from '@/app/i18n';
import NoData from '@/component/ui/NoData';
import List from './_List';
import FormItem from './component/form';


const Page = async ({
    params: { locale }
}: {
    params: { locale: string }
}) => {
    const { t } = await initTranslations(locale, ['dashboard']);
    return (
        <Stack spacing={2} height={"100%"} overflow={"hidden"}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} useFlexGap>
                <ListHeaderTitle title={"clients"} />
                <FormItem>
                    <Button variant="contained" color="primary" size="medium">
                        {t("New")}
                    </Button>
                </FormItem>
            </Stack>

            <ClientsData locale={locale} />

        </Stack>
    )
}

export default Page

const ClientsData = async ({ locale }: { locale: string }) => {
    const totalClients = await db.clients.count();
    if (totalClients === 0) return <NoData />

    return <List totalClients={totalClients} />
}
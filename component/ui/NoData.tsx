import initTranslations from '@/app/i18n';
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { BsDatabaseFillSlash } from "react-icons/bs";

const NoData = async ({ locale }: { locale: string }) => {
    const { t } = await initTranslations(locale, ['dashboard']);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 180px)', width: '100%' }}>
            <Stack spacing={3} alignItems='center'>
                <BsDatabaseFillSlash size={60} />
                <Typography variant='h5' >
                    {t("noData")}
                </Typography>
            </Stack>
        </Box>
    )
}

export default NoData

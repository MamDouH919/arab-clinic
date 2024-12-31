"use client"
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form';
import { Box, Container, Paper, Stack, Typography } from '@mui/material'

import * as z from "zod"
import { AddContactsSchema, addJobSchema } from "@/schemas"
import LoadingButton from '@mui/lab/LoadingButton'
import Select from '@/component/MUI/Select'
import ControlMUITextField from '@/component/ui/ControlMUItextField';
import { addContacts } from '@/actions/contacts';
import { enqueueSnackbarFunc } from '@/component/helperFunctions/snackBar';

type BranchType = {
    id: string;
    name: string;
    nameAr: string;
    latitude: number;
    longitude: number;
}
const ContactForm = ({
    availableBranches
}: {
    availableBranches: BranchType[]
}) => {
    const { control, handleSubmit, setError, reset } = useForm<z.infer<typeof AddContactsSchema>>()
    // const [firstBranch, setFirstBranch] = useState<BranchType>()
    const { t, i18n } = useTranslation()
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     setFirstBranch(availableBranches[0])
    //     setValue("branch", availableBranches[0].name)
    //     return () => { }
    // }, [availableBranches])


    const onSubmit = async (data: z.infer<typeof AddContactsSchema>) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        data.branch && formData.append("branch", data.branch);
        formData.append("message", data.message);

        const result = await addContacts(formData);

        if (result) {
            setLoading(false)
            // Handle validation errors
            for (const [field, messages] of Object.entries(result)) {
                setError(field as keyof z.infer<typeof AddContactsSchema>, {
                    type: "validate",
                    message: messages[0] // Assuming we take the first message
                });
            }
        } else {
            setLoading(false)
            reset()
            enqueueSnackbarFunc(t("yorMessageHasBeenSent"), "success")
        }
    }

    return (
        <Container maxWidth="sm">
            <Stack spacing={2}>
                {/* {availableBranches.length > 0 && <Stack>
                    <Select
                        name="branch"
                        label={t("nearBranch")}
                        control={control}
                        rules={{ required: t("fieldIsRequired") }}
                        data={availableBranches.map((job) => ({
                            key: i18n.language === 'ar' ? job.nameAr : job.name,
                            value: i18n.language === 'ar' ? job.nameAr : job.name,
                        }))}
                    />
                </Stack>
                } */}
                <Paper sx={{ padding: "20px" }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {t('contact')}
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box width={"100%"}>
                            <Grid container spacing={2} m={0} alignItems={"center"} justifyContent={"center"} >
                                <Grid md={12} xs={12}>
                                    <ControlMUITextField
                                        name="name"
                                        label={t("fullName")}
                                        control={control}
                                        rules={{ required: t("fieldIsRequired") }}
                                    />
                                </Grid>
                                <Grid md={12} xs={12}>
                                    <ControlMUITextField
                                        name="email"
                                        label={t("email")}

                                        control={control}
                                        rules={{ required: t("fieldIsRequired") }}
                                    />
                                </Grid>
                                {availableBranches.length > 0 && <Grid md={12} xs={12}>
                                    <Select
                                        name="branch"
                                        label={t("nearBranch")}
                                        control={control}
                                        rules={{ required: t("fieldIsRequired") }}
                                        data={availableBranches.map((job) => ({
                                            key: i18n.language === 'ar' ? job.nameAr : job.name,
                                            value: i18n.language === 'ar' ? job.nameAr : job.name,
                                        }))}
                                    />
                                </Grid>}
                                <Grid md={12} xs={12}>
                                    <ControlMUITextField
                                        name="mobile"
                                        label={t("mobile")}

                                        control={control}
                                        rules={{ required: t("fieldIsRequired") }}
                                    />
                                </Grid>
                                <Grid md={12} xs={12}>
                                    <ControlMUITextField
                                        name="message"
                                        label={t("message")}
                                        control={control}
                                        rules={{ required: t("fieldIsRequired") }}
                                        rows={3}
                                    />
                                </Grid>
                                <Grid md={12} xs={12}>
                                    <LoadingButton loading={loading} type='submit' variant='contained' fullWidth>{t("send")}</LoadingButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Paper>
            </Stack>
        </Container>
    )
}

export default ContactForm

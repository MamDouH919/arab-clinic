"use client"
import CustomDialog from '@/component/ui/customDialog'
import { Box, Button, Stack, Typography } from '@mui/material'
import React, { use, useEffect, useState } from 'react'
import { addAvailableJob, getAvailableJob, updateAvailableJob } from '../_actions'
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Unstable_Grid2'
import * as z from 'zod'
import { AddAvailableJobsSchema } from '@/schemas'
import { useForm } from 'react-hook-form';
import { TextFieldElement, SwitchElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next'

const FormItem = ({ children, id, data }: { children: React.ReactNode, id?: number, data?: z.infer<typeof AddAvailableJobsSchema> }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const router = useRouter()

    const { handleSubmit, setValue, control, setError, reset } = useForm<z.infer<typeof AddAvailableJobsSchema>>({
        defaultValues: {
            available: true,
        }
    });

    useEffect(() => {
        if (id && openDialog) {
            getAvailableJob(id).then((data) => {
                setValue('jobNameEn', data?.jobNameEn ?? '')
                setValue('jobNameAr', data?.jobNameAr ?? '')
                setValue('available', data?.available ?? true)
                // You can update your form's default values here
            })
        }
    }, [id, openDialog, setValue])

    const onSubmit = async (data: z.infer<typeof AddAvailableJobsSchema>) => {
        if (id) {
            await updateAvailableJob(data, id).
                then((res) => {
                    if (res) {
                        for (const [field, messages] of Object.entries(res)) {
                            setError(field as keyof z.infer<typeof AddAvailableJobsSchema>, {
                                type: "validate",
                                message: messages[0] // Assuming we take the first message
                            });
                        }
                    } else {
                        closeDialog()
                        router.refresh()
                    }
                })
            return
        }
        await addAvailableJob(data).
            then((res) => {
                if (res) {
                    for (const [field, messages] of Object.entries(res)) {
                        setError(field as keyof z.infer<typeof AddAvailableJobsSchema>, {
                            type: "validate",
                            message: messages[0] // Assuming we take the first message
                        });
                    }
                } else {
                    closeDialog()
                    router.refresh()
                }
            })
    }

    const closeDialog = () => {
        setOpenDialog(false)
        reset()
    }

    const openDialogFun = () => {
        setOpenDialog(true)
    }

    const { t } = useTranslation(['dashboard'])

    return (
        <>
            {openDialog && <CustomDialog
                open={openDialog}
                handleClose={closeDialog}
                title={t("addNew")}
                maxWidth='md'
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit(onSubmit),
                    noValidate: true,
                }}
                content={
                    <Box py={2}>
                        <Grid container spacing={2} m={0}>
                            <Grid xs={12}>
                                <SwitchElement
                                    name='available'
                                    label={t('available')}
                                    control={control}
                                    labelPlacement='start'
                                />
                            </Grid>
                            <Grid xs={12}>
                                <TextFieldElement
                                    name='jobNameAr'
                                    label={t('jobNameAr')}
                                    fullWidth
                                    control={control}
                                    required
                                />
                            </Grid>
                            <Grid xs={12}>
                                <TextFieldElement
                                    name='jobNameEn'
                                    label={t('jobNameEn')}
                                    fullWidth
                                    control={control}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Box>
                }
                actions={
                    <Stack justifyContent={"flex-end"} direction={"row"} spacing={1}>
                        <Button variant='contained' color='success' type='submit'>{t("save")}</Button>
                        <Button variant='contained' color='inherit' onClick={closeDialog}>{t("cancel")}</Button>
                    </Stack>
                }
            />}
            <div onClick={openDialogFun}>
                {children}
            </div>
        </>
    )
}

export default FormItem

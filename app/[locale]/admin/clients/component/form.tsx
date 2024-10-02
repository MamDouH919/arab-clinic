"use client"
import CustomDialog from '@/component/ui/customDialog'
import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Unstable_Grid2'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton';
import UploadFile from '@/component/ui/UploadFile'
import ControlMUITextField from '@/component/ui/ControlMUItextField'
import MUIselect from '@/component/MUI/Select'
import { clientsTypeArray } from '@/types'
import { AddClientsSchema, UpdateClientsSchema } from '@/schemas'
import { addClient, getClientsById, updateClient } from '@/actions/clients'


const FormItem = ({ children, id, updateData }: { children: React.ReactNode, id?: string, updateData?: any }) => {
    const schema = id ? UpdateClientsSchema : AddClientsSchema;
    const [openDialog, setOpenDialog] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const { handleSubmit, setValue, control, setError, reset } = useForm<z.infer<typeof AddClientsSchema> & { fileName: string }>();

    useEffect(() => {
        if (id && openDialog) {
            getClientsById(id).then((data) => {
                setValue('nameAr', data?.nameAr ?? '')
                setValue('name', data?.name ?? '')
                setValue('type', data?.type ?? '')
                setValue('fileName', data?.imageName ?? "")

            })
        }
    }, [id, openDialog, setValue])

    const onSubmit = async (data: z.infer<typeof AddClientsSchema>) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("nameAr", data.nameAr);
        formData.append("type", data.type);

        if (data.image) {
            formData.append("image", data?.image);
        } else {
            if (id) {
                formData.append("image", new File([], ""));
            }
        }

        const result = id ? await updateClient(formData, id) : await addClient(formData);

        if (result) {
            setLoading(false)
            for (const [field, messages] of Object.entries(result)) {
                if (field === "image") {
                    setError("fileName", {
                        type: "validate",
                        message: messages[0] // Assuming we take the first message
                    });
                }

                setError(field as keyof z.infer<typeof schema>, {
                    type: "validate",
                    message: messages[0] // Assuming we take the first message
                });

            }
        } else {
            !!updateData && updateData((prev: any) => !prev)
            router.refresh()
            closeDialog()
        }
    }

    const closeDialog = () => {
        setLoading(false)
        reset()
        setOpenDialog(false)
    }

    const openDialogFun = () => {
        setOpenDialog(true)
    }

    const { t } = useTranslation(['dashboard', 'custom'])

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
                                <UploadFile
                                    control={control}
                                    setValue={setValue}
                                    name="image"
                                    icon={"add_photo_alternate"}
                                    label={t("uploadImage")}
                                    accept=".png"
                                    rules={{
                                        validate: {
                                            require: (value: any) =>
                                                value ? true : t("fieldIsRequired"),
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <ControlMUITextField
                                    name='name'
                                    label={t('nameEn')}
                                    control={control}
                                    rules={{
                                        required: t("fieldIsRequired")
                                    }}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <ControlMUITextField
                                    name='nameAr'
                                    label={t('nameAr')}
                                    control={control}
                                    rules={{
                                        required: t("fieldIsRequired")
                                    }}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <MUIselect
                                    name='type'
                                    label={t('type')}
                                    control={control}
                                    variant='filled'
                                    data={clientsTypeArray.map((item) => ({
                                        key: t('custom:' + item),
                                        value: item,
                                    }))}
                                    rules={{
                                        required: t("fieldIsRequired"),
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                }
                actions={
                    <Stack justifyContent={"flex-end"} direction={"row"} spacing={1}>
                        <Button variant='contained' color='inherit' onClick={closeDialog} disabled={loading}>{t("cancel")}</Button>
                        <LoadingButton variant='contained' color='success' type='submit' loading={loading}>
                            {t("save")}
                        </LoadingButton>
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

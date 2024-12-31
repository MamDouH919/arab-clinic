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
import { AddDoctorsSchema } from '@/schemas'
import { addClient, getClientsById, updateClient } from '@/actions/clients'
import Select from '@/component/MUI/Select'
import { getBranchesDropDown, getServicesDropDown } from '@/actions/dropDown'
import { addDoctor, getDoctorById, updateDoctor } from '@/actions/doctors'

interface InputProps {
    id: string
    afterUpdateFunction: (data: any) => void
    closeDialog: () => void
    openDialog: boolean
}

const FormItem = (props: InputProps) => {
    const {
        id,
        afterUpdateFunction,
        closeDialog,
        openDialog
    } = props
    const { t, i18n } = useTranslation(['dashboard', 'custom'])
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const { handleSubmit, setValue, control, setError, reset } = useForm<z.infer<typeof AddDoctorsSchema> & { fileName: string }>();
    const [branches, setBranches] = useState<{
        key: string,
        value: string
    }[]>([])
    const [services, setServices] = useState<{
        key: string,
        value: string
    }[]>([])

    useEffect(() => {
        if (!!id) {
            getDoctorById(id).then((data) => {
                setValue('nameAr', data?.nameAr ?? '')
                setValue('name', data?.name ?? '')
                setValue('fileName', data?.imageName ?? "")
                setValue('branchId', data?.branchId ?? "")
                setValue('serviceId', data?.serviceId ?? "")
                setValue('expertise', data?.expertise ?? "")
                setValue('expertiseAr', data?.expertiseAr ?? "")

            })
        }
    }, [id, setValue])

    useEffect(() => {
        const Branches = async () => {
            const data = await getBranchesDropDown()
            const ss = data.map((item) => {
                return {
                    key: i18n.language === "ar" ? item.nameAr : item.name,
                    value: item.id,
                }
            })
            setBranches(ss)
        }
        Branches()
        const Services = async () => {
            const data = await getServicesDropDown()
            const ss = data.map((item) => {
                return {
                    key: i18n.language === "ar" ? item.titleAr : item.title,
                    value: item.id,
                }
            })
            setServices(ss)
        }
        Services()

    }, [i18n])

    const onSubmit = async (data: z.infer<typeof AddDoctorsSchema>) => {
        console.log(data);

        setLoading(true)
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("nameAr", data.nameAr);
        formData.append("branchId", data.branchId);
        formData.append("expertise", data.expertise);
        formData.append("serviceId", data.serviceId);
        formData.append("expertiseAr", data.expertiseAr);

        if (data.image) {
            formData.append("image", data?.image);
        }

        const result = id ? await updateDoctor(formData, id) : await addDoctor(formData);

        if (result?.status === "error") {
            setLoading(false)
            for (const [field, messages] of Object.entries(result.data)) {
                if (field === "image") {
                    setError("fileName", {
                        type: "validate",
                        message: messages[0] // Assuming we take the first message
                    });
                }

                setError(field as keyof z.infer<typeof AddDoctorsSchema>, {
                    type: "validate",
                    message: messages[0] // Assuming we take the first message
                });

            }
        } else {
            if (id) {
                afterUpdateFunction(result?.data)
            }
            closeDialog()
            router.refresh()
        }
    }

    return (
        <CustomDialog
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
                                accept=".png,.jpg,.svg,.jpeg,.webp,.avif"
                                maxSize={150 * 1024}
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
                            <ControlMUITextField
                                name='expertise'
                                label={t('expertiseEn')}
                                control={control}
                                rules={{
                                    required: t("fieldIsRequired")
                                }}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <ControlMUITextField
                                name='expertiseAr'
                                label={t('expertiseAr')}
                                control={control}
                                rules={{
                                    required: t("fieldIsRequired")
                                }}
                            />
                        </Grid>
                        <Grid md={12} xs={12}>
                            <Select
                                name="branchId"
                                label={t("branch")}
                                control={control}
                                rules={{ required: t("fieldIsRequired") }}
                                data={branches}
                            />
                        </Grid>
                        <Grid md={12} xs={12}>
                            <Select
                                name="serviceId"
                                label={t("service")}
                                control={control}
                                rules={{ required: t("fieldIsRequired") }}
                                data={services}
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
        />

    )
}

export default FormItem

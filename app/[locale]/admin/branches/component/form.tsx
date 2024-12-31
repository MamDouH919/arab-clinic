"use client"
import CustomDialog from '@/component/ui/customDialog'
import { Box, Button, InputAdornment, Stack, Typography } from '@mui/material'
import React, { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Unstable_Grid2'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton';
import UploadFile from '@/component/ui/UploadFile'
import { AddBranchesSchema, UpdateBranchesSchema } from '@/schemas'
import ControlMUITextField from '@/component/ui/ControlMUItextField'
import { MuiTelInput } from 'mui-tel-input'
import { addBranch, getBranchById, updateBranch } from '@/actions/branches'
import { LocationOnOutlined } from '@mui/icons-material'

const FormItem = ({ children, id, data }: { children: React.ReactNode, id?: string, data?: z.infer<typeof AddBranchesSchema> }) => {
    const schema = id ? UpdateBranchesSchema : AddBranchesSchema;
    const [openDialog, setOpenDialog] = useState(false)
    const router = useRouter()
    const [isPending, startTransition] = useTransition();

    const {
        handleSubmit,
        setValue,
        control,
        setError,
        reset,
        watch
    } = useForm<z.infer<typeof AddBranchesSchema> & { fileName: string }>({
        defaultValues: {
            longitude: 0,
            latitude: 0
        }
    });

    useEffect(() => {
        if (id && openDialog) {
            getBranchById(id).then((data) => {
                setValue('nameAr', data?.nameAr ?? '')
                setValue('name', data?.name ?? '')
                setValue('locationAr', data?.locationAr ?? '')
                setValue('location', data?.location ?? '')
                setValue('whatsApp', data?.whatsApp ?? '')
                setValue('mobile', data?.mobile ?? "")
                setValue('fileName', data?.imageName ?? "")
                setValue('longitude', data?.longitude ?? 0)
                setValue('latitude', data?.latitude ?? 0)
                setValue('gps', data?.gps ?? "")
                // You can update your form's default values here
            })
        }
    }, [id, openDialog, setValue])

    const onSubmit = (data: z.infer<typeof schema>) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("nameAr", data.nameAr);
            formData.append("locationAr", data.locationAr);
            formData.append("location", data.location);
            formData.append("whatsApp", data.whatsApp);
            formData.append("mobile", data.mobile);
            formData.append("gps", data.gps);
            formData.append("longitude", String(data.longitude));
            formData.append("latitude", String(data.latitude));

            if (data.image) {
                formData.append("image", data?.image);
            }

            const result = id
                ? await updateBranch(formData, id)
                : await addBranch(formData);

            if (result) {
                for (const [field, messages] of Object.entries(result)) {
                    if (field === "image") {
                        setError("fileName", {
                            type: "validate",
                            message: messages[0],
                        });
                    } else {
                        setError(field as keyof z.infer<typeof schema>, {
                            type: "validate",
                            message: messages[0],
                        });
                    }
                }
            } else {
                router.refresh();
                closeDialog();
            }
        });
    };

    const closeDialog = () => {
        reset()
        setOpenDialog(false)
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
                                <UploadFile
                                    control={control}
                                    setValue={setValue}
                                    name="image"
                                    icon={"add_photo_alternate"}
                                    label={t("uploadImage")}
                                    accept=".png,.jpg,.svg,.jpeg,.webp,.avif"
                                    rules={{
                                        validate: {
                                            require: (value: any) =>
                                                value ? true : t("fieldIsRequired"),
                                        },
                                    }}
                                    maxSize={250 * 1024}
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
                                    name='location'
                                    label={t('locationEn')}
                                    control={control}
                                    rules={{
                                        required: t("fieldIsRequired")
                                    }}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <ControlMUITextField
                                    name='locationAr'
                                    label={t('locationAr')}
                                    control={control}
                                    rules={{
                                        required: t("fieldIsRequired")
                                    }}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <Controller
                                    name="mobile"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => {
                                        if (fieldState.error?.type === "required") {
                                            fieldState.error.message = t("fieldIsRequired")
                                        }
                                        return (
                                            <MuiTelInput
                                                {...field}
                                                label={t('phone')}
                                                sx={{ direction: (theme) => theme.direction }}
                                                forceCallingCode
                                                variant='filled'
                                                onlyCountries={['EG']}
                                                error={fieldState.invalid}
                                                helperText={fieldState.error && fieldState.error.message}
                                                fullWidth
                                                defaultCountry='EG'
                                                disableFormatting
                                            />
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <Controller
                                    name="whatsApp"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => {
                                        if (fieldState.error?.type === "required") {
                                            fieldState.error.message = t("fieldIsRequired")
                                        }
                                        return (
                                            <MuiTelInput
                                                {...field}
                                                label={t('whatsApp')}
                                                sx={{ direction: (theme) => theme.direction }}
                                                forceCallingCode
                                                variant='filled'
                                                onlyCountries={['EG']}
                                                error={fieldState.invalid}
                                                helperText={fieldState.error && fieldState.error.message}
                                                fullWidth
                                                defaultCountry='EG'
                                                disableFormatting

                                            />
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <ControlMUITextField
                                    name='gps'
                                    label={t('branchLocation')}
                                    control={control}
                                    rules={{
                                        required: t("fieldIsRequired")
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOnOutlined />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <ControlMUITextField
                                    name='latitude'
                                    label={t('latitude')}
                                    control={control}
                                    type='number'
                                    rules={{
                                        required: t("fieldIsRequired")
                                    }}
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <ControlMUITextField
                                    name='longitude'
                                    label={t('longitude')}
                                    control={control}
                                    rules={{
                                        required: t("fieldIsRequired")
                                    }}
                                    type='number'
                                />
                            </Grid>
                        </Grid>
                    </Box>
                }
                actions={
                    <Stack justifyContent={"flex-end"} direction={"row"} spacing={1}>
                        <Button variant='contained' color='inherit' onClick={closeDialog} disabled={isPending}>{t("cancel")}</Button>
                        <LoadingButton variant='contained' color='success' type='submit' loading={isPending}>
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

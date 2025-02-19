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
import { AddSchedulesSchema, UpdateSchedulesSchema } from '@/schemas'
import { addBranch, updateBranch } from '@/actions/branches'
import Select from '@/component/MUI/Select'
import { getBranchesDropDown } from '@/actions/dropDown'
import { addSchedule, getScheduleById, updateSchedule } from '@/actions/schedules'

const FormItem = ({ children, id, data }: { children: React.ReactNode, id?: string, data?: z.infer<typeof UpdateSchedulesSchema> }) => {
    const schema = id ? UpdateSchedulesSchema : AddSchedulesSchema;
    const [openDialog, setOpenDialog] = useState(false)
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const { t, i18n } = useTranslation(['dashboard'])
    const [branches, setBranches] = useState<{
        key: string,
        value: string
    }[]>([])

    const {
        handleSubmit,
        setValue,
        control,
        setError,
        reset,
        watch
    } = useForm<z.infer<typeof schema> & { fileName: string }>();

    useEffect(() => {
        if (id && openDialog) {
            getScheduleById(id).then((data) => {
                setValue('fileName', data?.imageName ?? "")
                setValue('branchId', data?.branchId ?? "")
                // You can update your form's default values here
            })
        }
    }, [id, openDialog, setValue])


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

    }, [i18n])

    const onSubmit = (data: z.infer<typeof schema>) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("branchId", data.branchId);

            if (data.image) {
                formData.append("image", data?.image);
            }

            const result = id
                ? await updateSchedule(formData, id)
                : await addSchedule(formData);

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


    return (
        <>
            {openDialog && <CustomDialog
                open={openDialog}
                handleClose={closeDialog}
                title={t("addNew")}
                maxWidth='xs'
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
                            <Grid md={12} xs={12}>
                                <Select
                                    name="branchId"
                                    label={t("branch")}
                                    control={control}
                                    rules={{ required: t("fieldIsRequired") }}
                                    data={branches}
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

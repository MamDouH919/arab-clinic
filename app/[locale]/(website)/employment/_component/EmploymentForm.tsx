"use client"
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import { SelectElement, TextFieldElement, RadioButtonGroup } from 'react-hook-form-mui'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form';
import { Button, Container, Paper, Typography } from '@mui/material'
import governorates from './governorates.json'
import { MuiFileInput } from "mui-file-input";
import { AttachFile, Close } from '@mui/icons-material'
import { MuiTelInput } from 'mui-tel-input'
import * as z from "zod"
import { addJobSchema } from "@/schemas"
import { addNewJob } from '../_actions'

const EmploymentForm = ({
    availableJobs
}: {
    availableJobs: {
        id: number;
        labelEn: string;
        labelAr: string;
    }[]
}) => {
    const { control, handleSubmit, setError } = useForm<z.infer<typeof addJobSchema>>()
    const { t, i18n } = useTranslation()

    let governoratesOptions: {
        label: string;
        value: string;
        id: string;
    }[] = []

    governorates.forEach((governorate) => {
        governoratesOptions.push({
            label: i18n.language === 'ar' ? governorate.governorate_name_ar : governorate.governorate_name_en,
            value: governorate.id,
            id: governorate.id
        })
    })

    const onSubmit = async (data: z.infer<typeof addJobSchema>) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("governorate", data.governorate);
        formData.append("jobName", data.jobName);
        if (data.file) {
            formData.append("file", data.file);
        }

        const result = await addNewJob(formData);
        if (result) {
            // Handle validation errors
            for (const [field, messages] of Object.entries(result)) {
                setError(field as keyof z.infer<typeof addJobSchema>, {
                    type: "validate",
                    message: messages[0] // Assuming we take the first message
                });
            }
        } else {
            // Handle success
        }

    }

    return (
        <Container maxWidth="sm">
            <Paper sx={{ padding: "20px" }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {t('PersonalData')}
                </Typography>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} m={0}>
                        <Grid xs={12}>
                            <TextFieldElement
                                name='name'
                                label={t('fullName')}
                                control={control}
                                variant='filled'
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextFieldElement
                                name='email'
                                variant='filled'
                                label={t('email')}
                                type='email'
                                required
                                control={control}
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={12}>
                            {/* <MuiTelInput value={phone} onChange={handleChange} /> */}
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState }) => {
                                    console.log(fieldState);

                                    return (
                                        <MuiTelInput
                                            {...field}
                                            forceCallingCode
                                            label={t('phone')}
                                            variant='filled'
                                            helperText={fieldState.invalid ? "Tel is invalid" : ""}
                                            error={fieldState.invalid}
                                            fullWidth
                                            defaultCountry='EG'
                                        />
                                    )
                                }}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <SelectElement
                                name='governorate'
                                label={t('governorate')}
                                control={control}
                                variant='filled'
                                options={governoratesOptions}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid xs={12}>
                            <RadioButtonGroup
                                name='jobName'
                                label={t('ThePositionAppliedFor')}
                                required
                                control={control}
                                options={availableJobs.map((job) => ({
                                    id: i18n.language === 'ar' ? job.labelAr : job.labelEn,
                                    value: i18n.language === 'ar' ? job.labelAr : job.labelEn,
                                    label: i18n.language === 'ar' ? job.labelAr : job.labelEn,
                                }))}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Controller
                                name="file"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState }) => (
                                    <MuiFileInput
                                        {...field}
                                        variant='filled'
                                        helperText={fieldState.invalid ? "File is invalid" : ""}
                                        error={fieldState.invalid}
                                        fullWidth
                                        required
                                        clearIconButtonProps={{
                                            title: "Remove",
                                            children: <Close fontSize="small" />
                                        }}
                                        placeholder={t('insertFile')}
                                        InputProps={{
                                            inputProps: {
                                                accept: 'application/pdf',
                                            },
                                            startAdornment: <AttachFile sx={{ mb: "16px" }} />
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Button variant='contained' type='submit' fullWidth>
                                {t('submit')}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default EmploymentForm

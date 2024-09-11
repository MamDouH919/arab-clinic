"use client"
import { ListHeaderTitle } from '@/component/ui/ListHeader'
import { AddNewsSchema, AddServicesSchema, UpdateNewsSchema, UpdateServicesSchema } from '@/schemas'
import { Box, Button, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextFieldElement } from 'react-hook-form-mui'
import { useTranslation } from 'react-i18next'
import { styled } from "@mui/material/styles";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import * as z from 'zod'
import UploadImage from '@/component/ui/UploadImage'
import { useRouter } from 'next/navigation'
import { addNews, updateNews } from '@/actions/new'
import UploadFile from '@/component/ui/UploadFile'
import ControlMUITextField from '@/component/ui/ControlMUItextField'
import clsx from 'clsx'
import CustomDialog from '@/component/ui/customDialog'
import Image from 'next/image'
import { addServices, updateServices } from '@/actions/services'
import LoadingButton from '@mui/lab/LoadingButton'

// Loading component to display while ReactQuill is being loaded
const Loading = () => <Skeleton height={"300px"} animation="wave" variant="rectangular" />;

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false, // Disable server-side rendering for this component
    loading: () => <Loading />, // Show Loading component while loading
});

const PREFIX = "Counter";
const classes = {
    editor: `${PREFIX}-editor`,
    editorError: `${PREFIX}-editorError`,
};

const Root = styled(Stack)(({ theme }) => ({
    [`& .${classes.editor}`]: {
        ".ql-toolbar": {
            background: "#fff",
            direction: theme.direction,
        },
        ".ql-editor": {
            minHeight: "300px",
            direction: theme.direction,
        },
    },
    [`& .${classes.editorError}`]: {
        border: "1px solid red",
    },
}));

interface News {
    id: string
    titleAr: string
    title: string
    descriptionAr: string
    description: string
    icon: string
    coverImg: string
    imgOne: string | null
    imgTwo: string | null
    imgThree: string | null
}

const Form = ({ id, data }: { id?: string, data?: News }) => {
    const [loading, setLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState({
        open: false,
        fileName: "",
        name: "",
    })

    const closeDialog = () => {
        setOpenDialog({ open: false, fileName: "", name: "" })
    }

    const schema = id ? UpdateServicesSchema : AddServicesSchema;

    const { t } = useTranslation(['dashboard']);
    const { control, handleSubmit, setError, setValue, watch } = useForm<z.infer<typeof schema> & {
        fileIcon: string, fileImgOne: string, fileImgTwo: string, fileImgThree: string, fileCover: string
    }>({
        defaultValues: {
            titleAr: data?.titleAr ?? '',
            title: data?.title ?? '',
            fileIcon: data?.icon ?? '',
            fileImgOne: data?.imgOne ?? '',
            fileImgTwo: data?.imgTwo ?? '',
            fileImgThree: data?.imgThree ?? '',
            fileCover: data?.coverImg ?? '',
            descriptionAr: data?.descriptionAr ?? '',
            description: data?.description ?? '',
        }
    });

    console.log(watch());

    const router = useRouter()
    const [errors, setErrors] = useState<{
        icon: string
        coverImg: string
        imgOne: string
        imgTwo: string
        imgThree: string
    }>({
        icon: "",
        coverImg: "",
        imgOne: "",
        imgTwo: "",
        imgThree: ""
    });

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],

            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': ["#6999d5", "#bc161a", "red", "green", "blue"] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']
        ]
    };


    const onSubmit = async (data: z.infer<typeof schema>) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("titleAr", data.titleAr);
        formData.append("title", data.title);
        formData.append("descriptionAr", data.descriptionAr);
        formData.append("description", data.description);

        if (data.icon) {
            formData.append("icon", data?.icon);
        } else {
            if (id) {
                formData.append("icon", new File([], ""));
            }
        }
        if (data.imgOne) {
            formData.append("imgOne", data?.imgOne);
        } else {
            if (id && data.imgOne) {
                formData.append("imgOne", new File([], ""));
            }
        }
        if (data.imgTwo) {
            formData.append("imgTwo", data?.imgTwo);
        } else {
            if (id && data.imgTwo) {
                formData.append("imgTwo", new File([], ""));
            }
        }
        if (data.imgThree) {
            formData.append("imgThree", data?.imgThree);
        } else {
            if (id && data.imgThree) {
                formData.append("imgThree", new File([], ""));
            }
        }
        if (data.coverImg) {
            formData.append("coverImg", data?.coverImg);
        } else {
            if (id) {
                formData.append("coverImg", new File([], ""));
            }
        }

        console.log(formData);


        const result = id ? await updateServices(formData, id) : await addServices(formData);

        if (result) {
            setLoading(false)
            console.log(result);


            for (const [field, messages] of Object.entries(result)) {
                if (field === "icon" || field === "coverImg" || field === "imgOne" || field === "imgTwo" || field === "imgThree") {
                    setErrors(prevErrors => ({
                        ...prevErrors, // Keep the previous error state
                        icon: field === "icon" ? messages[0] : prevErrors.icon || "",
                        coverImg: field === "coverImg" ? messages[0] : prevErrors.coverImg || "",
                        imgOne: field === "imgOne" ? messages[0] : prevErrors.imgOne || "",
                        imgTwo: field === "imgTwo" ? messages[0] : prevErrors.imgTwo || "",
                        imgThree: field === "imgThree" ? messages[0] : prevErrors.imgThree || "",
                    }));
                }

                setError(field as keyof z.infer<typeof schema>, {
                    type: "validate",
                    message: messages[0] // Assuming we take the first message
                });

            }
        } else {
            router.refresh()
            router.push("/admin/services")
        }
    }

    const previewImage = (file: File | string) => {
        let previewUrl
        if (typeof file === "string") {
            previewUrl = file
            return previewUrl
        }
        if (typeof file !== "string") {
            previewUrl = URL.createObjectURL(file);
            return previewUrl
        }
        return ''
    }

    return (
        <Root spacing={2}>
            <CustomDialog
                open={openDialog.open}
                handleClose={closeDialog}
                title={t("addImage")}
                maxWidth='sm'
                content={
                    <Box p={2}>
                        <UploadFile
                            control={control}
                            setValue={setValue}
                            name={openDialog.name}
                            fileName={openDialog.fileName}
                            icon={"add_photo_alternate"}
                            label={t("uploadImage")}
                            accept=".png,.jpg,.svg"
                            rules={{
                                validate: {
                                    require: (value: any) =>
                                        value ? true : t("fieldIsRequired"),
                                },
                            }}
                        />
                    </Box>
                }
                actions={
                    <Stack justifyContent={"flex-end"} direction={"row"} spacing={1}>
                        <Button variant={'contained'} color='inherit' onClick={closeDialog} disabled={loading}>{t("done")}</Button>
                    </Stack>
                }
            />
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} useFlexGap>
                <ListHeaderTitle title={id ? "edit" : "addNew"} />
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Paper sx={{ padding: 3 }}>
                    <Grid container spacing={2} m={0} justifyContent={"center"}>
                        <Grid md={12} xs={12} display={"flex"} justifyContent={"center"}>
                            <Box width={"100%"}>
                                <Grid container spacing={3} m={0}>
                                    <Grid md={4} xs={12}>
                                        {(watch("icon") || watch("fileIcon")) &&
                                            <Image
                                                src={previewImage(watch("icon") || watch("fileIcon"))}
                                                alt="icon"
                                                width={100}
                                                height={100}
                                                objectFit='cover'
                                                layout='responsive'
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "350px"
                                                }}
                                            />
                                        }
                                        {errors.icon && <Typography color="error">{errors.icon}</Typography>}
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            color='primary'
                                            size='medium'
                                            onClick={() => {
                                                setErrors(prevErrors => ({
                                                    ...prevErrors, // Keep the previous error state
                                                    icon: ""
                                                }));
                                                setOpenDialog({
                                                    fileName: "fileIcon",
                                                    name: "icon",
                                                    open: true
                                                })
                                            }}
                                        >
                                            {t("addImage")}
                                        </Button>
                                    </Grid>
                                    <Grid md={8} xs={12}>
                                        {(watch("coverImg") || watch("fileCover")) &&
                                            <Image
                                                src={previewImage(watch("coverImg") || watch("fileCover"))}
                                                alt="coverImg"
                                                width={100}
                                                height={100}
                                                objectFit='cover'
                                                layout='responsive'
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "350px"
                                                }}
                                            />
                                        }
                                        {errors.coverImg && <Typography color="error">{errors.coverImg}</Typography>}
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            color='primary'
                                            size='medium'
                                            onClick={() => {
                                                setErrors(prevErrors => ({
                                                    ...prevErrors, // Keep the previous error state
                                                    coverImg: ""
                                                }));
                                                setOpenDialog({
                                                    fileName: "fileCover",
                                                    name: "coverImg",
                                                    open: true
                                                })
                                            }}
                                        >
                                            {t("addImage")}
                                        </Button>
                                    </Grid>
                                    <Grid md={4} xs={12}>
                                        {(watch("imgOne") || watch("fileImgOne")) &&
                                            <Image
                                                src={previewImage(watch("imgOne") || watch("fileImgOne"))}
                                                alt="imgOne"
                                                width={100}
                                                height={100}
                                                objectFit='cover'
                                                layout='responsive'
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "350px"
                                                }}
                                            />
                                        }
                                        {errors.imgOne && <Typography color="error">{errors.imgOne}</Typography>}
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            color='primary'
                                            size='medium'
                                            onClick={() => {
                                                setErrors(prevErrors => ({
                                                    ...prevErrors, // Keep the previous error state
                                                    imgOne: ""
                                                }));
                                                setOpenDialog({
                                                    fileName: "fileImgOne",
                                                    name: "imgOne",
                                                    open: true
                                                })
                                            }}
                                        >
                                            {t("addImage")}
                                        </Button>
                                    </Grid>
                                    <Grid md={4} xs={12}>
                                        {(watch("imgTwo") || watch("fileImgTwo")) &&
                                            <Image
                                                src={previewImage(watch("imgTwo") || watch("fileImgTwo"))}
                                                alt="imgTwo"
                                                width={100}
                                                height={100}
                                                objectFit='cover'
                                                layout='responsive'
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "350px"
                                                }}
                                            />
                                        }
                                        {errors.imgTwo && <Typography color="error">{errors.imgTwo}</Typography>}
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            color='primary'
                                            size='medium'
                                            onClick={() => {
                                                setErrors(prevErrors => ({
                                                    ...prevErrors, // Keep the previous error state
                                                    imgTwo: ""
                                                }));
                                                setOpenDialog({
                                                    fileName: "fileImgTwo",
                                                    name: "imgTwo",
                                                    open: true
                                                })
                                            }}
                                        >
                                            {t("addImage")}
                                        </Button>
                                    </Grid>
                                    <Grid md={4} xs={12}>
                                        {(watch("imgThree") || watch("fileImgThree")) &&
                                            <Image
                                                src={previewImage(watch("imgThree") || watch("fileImgThree"))}
                                                alt="imgThree"
                                                width={100}
                                                height={100}
                                                objectFit='cover'
                                                layout='responsive'
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "350px"
                                                }}
                                            />
                                        }
                                        {errors.imgThree && <Typography color="error">{errors.imgThree}</Typography>}
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            color='primary'
                                            size='medium'
                                            onClick={() => {
                                                setErrors(prevErrors => ({
                                                    ...prevErrors, // Keep the previous error state
                                                    imgThree: ""
                                                }));
                                                setOpenDialog({
                                                    fileName: "fileImgThree",
                                                    name: "imgThree",
                                                    open: true
                                                })
                                            }}
                                        >
                                            {t("addImage")}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <Box width={"100%"}>
                                <Typography variant='h5'>
                                    {t("dataInArabic")}
                                </Typography>
                                <Grid container spacing={3} m={0}>
                                    <Grid xs={12}>
                                        <ControlMUITextField
                                            name='titleAr'
                                            label={t('titleAr')}
                                            control={control}
                                            variant='outlined'
                                            rules={{
                                                required: t("fieldIsRequired"),
                                            }}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <Typography variant='h5' mb={2}>{t("descriptionAr")}</Typography>
                                        <Controller
                                            name="descriptionAr"
                                            control={control}
                                            rules={{
                                                required: t("fieldIsRequired"),
                                            }}
                                            render={({ field, fieldState }) => (
                                                <div>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        modules={modules}
                                                        className={clsx(classes.editor, {
                                                            [classes.editorError]: fieldState.error,
                                                        })}
                                                    />
                                                    {fieldState.error && (
                                                        <Typography color="error">
                                                            {fieldState.error.message}
                                                        </Typography>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <Box width={"100%"}>
                                <Typography variant='h5'>
                                    {t("dataInEnglish")}
                                </Typography>
                                <Grid container spacing={3} m={0}>
                                    <Grid xs={12}>
                                        <ControlMUITextField
                                            name='title'
                                            label={t('titleEn')}
                                            control={control}
                                            variant='outlined'
                                            rules={{
                                                required: t("fieldIsRequired"),
                                            }}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <Typography variant='h5' mb={2}>{t("descriptionEn")}</Typography>
                                        <Controller
                                            name="description"
                                            control={control}
                                            rules={{
                                                required: t("fieldIsRequired"),
                                            }}
                                            render={({ field, fieldState }) => (
                                                <div>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        modules={modules}
                                                        className={clsx(classes.editor, {
                                                            [classes.editorError]: fieldState.error,
                                                        })}
                                                    />
                                                    {fieldState.error && (
                                                        <Typography color="error">
                                                            {fieldState.error.message}
                                                        </Typography>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid md={12} xs={12} display={"flex"} justifyContent={"flex-end"}>
                            <LoadingButton loading={loading} variant={"contained"} type={"submit"}>{t("save")}</LoadingButton>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        </Root>
    )
}

export default Form;

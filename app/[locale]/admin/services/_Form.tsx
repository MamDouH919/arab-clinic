"use client"
import { ListHeaderTitle } from '@/component/ui/ListHeader'
import { AddServicesSchema, UpdateServicesSchema } from '@/schemas'
import { Box, Button, Chip, IconButton, Paper, Skeleton, Stack, TextField, Toolbar, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { styled } from "@mui/material/styles";
import dynamic from 'next/dynamic';
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import UploadFile from '@/component/ui/UploadFile'
import ControlMUITextField from '@/component/ui/ControlMUItextField'
import clsx from 'clsx'
import Image from 'next/image'
import { addServices, deleteServiceImage, updateServices } from '@/actions/services'
import LoadingButton from '@mui/lab/LoadingButton'
import { Delete } from '@mui/icons-material'
import ServiceImageDialog from './_component/ServiceImageDialog'
import { modules } from '@/component/helperFunctions/modulesQuill'

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
    imagesPaper: `${PREFIX}-imagesPaper`,
    imageWrapper: `${PREFIX}-imageWrapper`,
    deleteImageWrapper: `${PREFIX}-deleteImageWrapper`,
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
    [`& .${classes.imagesPaper}`]: {
        padding: theme.spacing(2),
    },
    [`& .${classes.imageWrapper}`]: {
        height: "200px",
        width: "200px",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "10px",
        position: "relative",
        [`&:hover`]: {
            [`& .${classes.deleteImageWrapper}`]: {
                display: "flex"
            },
        },
    },
    [`& .${classes.deleteImageWrapper}`]: {
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        borderRadius: "10px",
        background: "#4747478a",
        display: "none"
    },
}));

interface Service {
    id: string
    titleAr: string
    title: string
    descriptionAr: string
    description: string
    iconName: string
    iconPath: string
    coverImgName: string
    coverImgPath: string
    minDescriptionAr: string
    minDescription: string
    videos: string | null
}

export type imageType = {
    id: string; imagePath: string; imageName: string; serviceId: string;
}

const Form = ({
    id,
    data,
    servicesImages
}: {
    id?: string,
    data?: Service,
    servicesImages?: imageType[]
}) => {
    const [servicesImagesState, setServicesImagesState] = useState(servicesImages ?? [])
    const [servicesYoutubeIdsState, setServicesYoutubeIdsState] = useState<string[]>(data?.videos ? JSON.parse(data?.videos) : [])
    const [youtubeIdsValue, setYoutubeIdsValue] = useState("")

    const [serviceImageDialog, setServiceImageDialog] = useState(false)
    const [loading, setLoading] = useState(false)

    const closeServiceImageDialog = (data?: imageType) => {
        if (data) {
            setServicesImagesState(prev => [...prev, data])
        }
        setServiceImageDialog(false)
    }

    const schema = id ? UpdateServicesSchema : AddServicesSchema;

    const { t } = useTranslation(['dashboard']);
    const { control, handleSubmit, setError, setValue, watch } = useForm<z.infer<typeof schema> & {
        fileIcon: string, fileImgOne: string, fileImgTwo: string, fileImgThree: string, fileCover: string
    }>({
        defaultValues: {
            titleAr: data?.titleAr ?? '',
            title: data?.title ?? '',
            fileIcon: data?.iconPath ?? '',
            fileCover: data?.coverImgPath ?? '',
            descriptionAr: data?.descriptionAr ?? '',
            description: data?.description ?? '',
            minDescriptionAr: data?.minDescriptionAr ?? '',
            minDescription: data?.minDescription ?? '',
        }
    });

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

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("titleAr", data.titleAr);
        formData.append("title", data.title);
        formData.append("descriptionAr", data.descriptionAr);
        formData.append("description", data.description);
        formData.append("minDescriptionAr", data.minDescriptionAr);
        formData.append("minDescription", data.minDescription);
        formData.append("videos", JSON.stringify(servicesYoutubeIdsState));

        if (!!data.icon) {
            formData.append("icon", data?.icon);
        }

        if (!!data.coverImg) {
            formData.append("coverImg", data?.coverImg);
        }

        const result = id ? await updateServices(formData, id) : await addServices(formData);

        if (result) {
            setLoading(false)
            for (const [field, messages] of Object.entries(result)) {
                if (field === "icon" || field === "coverImg") {
                    setErrors(prevErrors => ({
                        ...prevErrors, // Keep the previous error state
                        icon: field === "icon" ? messages[0] : prevErrors.icon || "",
                        coverImg: field === "coverImg" ? messages[0] : prevErrors.coverImg || "",
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

    const deleteServiceImageFun = async (id: string, imageName: string) => {
        const deleteItem = await deleteServiceImage(id, imageName)
        if (deleteItem === "done") {
            setServicesImagesState(prev => prev.filter(e => e.id !== id))
        }
    }

    const handleDelete = (idToDelete: string) => {
        setServicesYoutubeIdsState(prevState => prevState.filter(id => id !== idToDelete));
    };

    const addYoutubeId = () => {
        const resultString = youtubeIdsValue.replace(/\s/g, ''); // Removes all spaces
        setServicesYoutubeIdsState(prev => [...prev, resultString])
        setYoutubeIdsValue("")
    };


    return (
        <Root spacing={2}>
            {serviceImageDialog && id && <ServiceImageDialog id={id} openDialog={serviceImageDialog} closeDialog={closeServiceImageDialog} />}

            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} useFlexGap>
                <ListHeaderTitle title={id ? "edit" : "addNew"} />
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Paper sx={{ padding: 3 }}>
                    <Grid container spacing={2} m={0} justifyContent={"flex-start"}>
                        <Grid md={12} xs={12} display={"flex"} justifyContent={"center"}>
                            <Box width={"100%"}>
                                <Grid container spacing={3} m={0}>
                                    <Grid md={4} xs={12}>
                                        <UploadFile
                                            control={control}
                                            setValue={setValue}
                                            name={"icon"}
                                            fileName={"fileIcon"}
                                            icon={"add_photo_alternate"}
                                            label={t("uploadImage")}
                                            accept=".png,.jpg,.svg,.jpeg,.webp,.avif"
                                            maxSize={200 * 1024}
                                            rules={{
                                                validate: {
                                                    require: (value: any) =>
                                                        value ? true : t("fieldIsRequired"),
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid md={8} xs={12}>
                                        <UploadFile
                                            control={control}
                                            setValue={setValue}
                                            name={"coverImg"}
                                            fileName={"fileCover"}
                                            icon={"add_photo_alternate"}
                                            label={t("uploadImage")}
                                            accept=".png,.jpg,.svg,.jpeg,.webp,.avif"
                                            maxSize={250 * 1024}
                                            rules={{
                                                validate: {
                                                    require: (value: any) =>
                                                        value ? true : t("fieldIsRequired"),
                                                },
                                            }}
                                        />
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
                                        <ControlMUITextField
                                            name='minDescriptionAr'
                                            label={t('minDescriptionAr')}
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
                                        <ControlMUITextField
                                            name='minDescription'
                                            label={t('minDescriptionEn')}
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
                        <Stack spacing={2}>
                            <Stack direction={"row"} spacing={1}>
                                <TextField
                                    label={t("youtubeId")}
                                    value={youtubeIdsValue}
                                    size='small'
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = event.target.value.replace(/\s/g, ''); // Remove spaces
                                        setYoutubeIdsValue(value);
                                    }}

                                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                        if (event.key === 'Enter') {
                                            // Call a function or perform some action
                                            event.preventDefault();
                                            addYoutubeId()
                                        }
                                    }}


                                />
                                <Button variant='contained' onClick={addYoutubeId}>{t("add")}</Button>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                {servicesYoutubeIdsState.map(id => <Chip key={id} label={id} onDelete={() => handleDelete(id)} />)}
                            </Stack>
                        </Stack>

                        <Grid md={12} xs={12} display={"flex"} justifyContent={"flex-end"}>
                            <LoadingButton loading={loading} variant={"contained"} type={"submit"}>{t("save")}</LoadingButton>
                        </Grid>
                    </Grid>
                </Paper>
            </form>

            <Paper className={classes.imagesPaper}>
                <Toolbar>
                    <Typography variant='h5'>{t("images")}</Typography>
                </Toolbar>
                <Stack direction={"row"} px={3} spacing={2} flexWrap={"wrap"} useFlexGap>
                    {servicesImagesState.map(e =>
                        <Stack key={e.id} justifyContent={"center"} alignItems={"center"} className={classes.imageWrapper}>
                            <Stack className={classes.deleteImageWrapper} justifyContent={"center"} alignItems={"center"}>
                                <IconButton size='large' onClick={() => deleteServiceImageFun(e.id, e.imageName)}>
                                    <Delete fontSize='inherit' color='error' />
                                </IconButton>
                            </Stack>
                            <Image
                                src={e.imagePath}
                                alt={"service image"}
                                width={200}
                                height={200}
                                objectFit='cover'
                                style={{
                                    borderRadius: "20px"
                                }}
                            />
                        </Stack>
                    )}
                    <Stack justifyContent={"center"} alignItems={"center"} className={classes.imageWrapper}>
                        <Button variant='contained' onClick={() => setServiceImageDialog(true)} disabled={!id}>{t("addNew")}</Button>
                    </Stack>
                </Stack>
            </Paper>
        </Root>
    )
}

export default Form;

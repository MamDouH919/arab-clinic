"use client"
import CustomDialog from '@/component/ui/customDialog'
import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

const DeleteItem = ({ children, id, deleteFun }: { children: React.ReactNode, id: string, deleteFun: (id: string) => void }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const router = useRouter()

    const closeDialog = () => {
        setOpenDialog(false)
    }

    const openDialogFun = () => {
        setOpenDialog(true)
    }

    const deleteHighlightsFun = async (id: string) => {
        await deleteFun(id)
        router.refresh()
        closeDialog()
    }

    const { t } = useTranslation(['dashboard'])

    return (
        <>
            <CustomDialog
                open={openDialog}
                handleClose={closeDialog}
                title={t("delete")}
                maxWidth='md'
                content={
                    <Box p={2}>
                        <Typography>{t("deleteMSG")}</Typography>
                    </Box>
                }
                actions={
                    <Stack justifyContent={"flex-end"} direction={"row"} spacing={1}>
                        <Button variant='contained' color='error' onClick={() => deleteHighlightsFun(id)}>{t("delete")}</Button>
                        <Button variant='contained' color='inherit' onClick={closeDialog}>{t("cancel")}</Button>
                    </Stack>
                }
            />
            <div style={{ width: "100%" }} onClick={openDialogFun}>
                {children}
            </div>
        </>
    )
}

export default DeleteItem

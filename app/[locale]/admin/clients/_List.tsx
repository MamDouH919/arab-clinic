"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Stack, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ListPaper from '@/component/ui/ListPaper';
import TableBodyWithLoad from '@/component/ui/TableBodyWithLoad';
import { dateFormatLL } from '@/component/helperFunctions/dateFunctions';
import { FixedTableCell } from '@/component/ui/FixedTableCell';
import MUITablePagination from '@/component/ui/TablePagination';
import axios from 'axios';
import Image from 'next/image';
import FormItem from './component/form';
import { Delete, Edit } from '@mui/icons-material';
import DeleteItem from '../_component/delete';
import { deleteClient } from '@/actions/clients';

const PREFIX = "orders";
const classes = {
    filter: `${PREFIX}-filter`,
    filterActive: `${PREFIX}-filterActive`,
    title: `${PREFIX}-title`,
};
const Root = styled("div")(({ theme }) => ({
    height: "100%",

    [`& .${classes.filter}`]: {
        padding: theme.spacing(0.5, 1.5),
        borderRadius: theme.spacing(1),
        cursor: "pointer",
        [`&:hover`]: {
            background: theme.palette.divider
        },
    },
    [`& .${classes.filterActive}`]: {
        background: theme.palette.divider
    },
    [`& .${classes.title}`]: {
        fontSize: "22px"
    },
}));

export default function OrdersList({
    totalClients
}: {
    totalClients: number
}) {
    const { t } = useTranslation(["dashboard", "custom"]);
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(20);

    const [loading, setLoading] = React.useState(true);
    const [updateClient, setUpdateClient] = React.useState(false);

    const [data, setData] = React.useState<any>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/clients?page=${page + 1}&pageSize=${pageSize}`);
            console.log(response)

            setLoading(false);
            setData(response.data.data);
        };
        fetchData();
    }, [page, pageSize, totalClients, updateClient]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPage(0);
    };

    const tableCellHeader = [
        "", "image", "nameEn", "nameAr", "type", "createdAt", "actions"
    ]


    return (
        <Root>
            <ListPaper loading={loading} data={!!(data && data.length)} restFilter={`${PREFIX}`}>
                <TableContainer sx={{ width: "100%", overflow: "auto" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {tableCellHeader.map(e =>
                                    <TableCell align={'left'} key={e}>
                                        {t(e)}
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBodyWithLoad loading={loading} tableCellHeaderLength={tableCellHeader.length}>
                            <TableBody>
                                {data.map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <FixedTableCell>
                                                {index + 1}
                                            </FixedTableCell>
                                            <FixedTableCell>
                                                <Image
                                                    src={row.image}
                                                    alt={row.name}
                                                    width={50}
                                                    height={50}
                                                    objectFit="cover"
                                                />
                                            </FixedTableCell>
                                            <FixedTableCell>
                                                {row.name}
                                            </FixedTableCell>
                                            <FixedTableCell>
                                                {row.nameAr}
                                            </FixedTableCell>
                                            <FixedTableCell>
                                                {t("custom:" + row.type)}
                                            </FixedTableCell>

                                            <FixedTableCell align={'left'}>
                                                {dateFormatLL(row.createdAt.toString())}
                                            </FixedTableCell>
                                            <FixedTableCell align={'left'}>
                                                <Stack direction={"row"} spacing={1} >
                                                    <FormItem id={row.id} updateData={setUpdateClient}>
                                                        <IconButton size="small">
                                                            <Edit fontSize='small' />
                                                        </IconButton>
                                                    </FormItem>
                                                    <DeleteItem id={row.id} deleteFun={deleteClient}>
                                                        <IconButton size="small">
                                                            <Delete fontSize='small' color='error' />
                                                        </IconButton>
                                                    </DeleteItem>
                                                </Stack>
                                            </FixedTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </TableBodyWithLoad>
                    </Table>

                </TableContainer>
                <MUITablePagination
                    count={totalClients}
                    page={page}
                    rowsPerPage={pageSize}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </ListPaper>
        </Root>
    );
}

"use client"
import { Button, Pagination, Stack } from '@mui/material';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalEdit from './ModalEdit';
import { getWarehousesFromServer } from '../redux/globalAsyncThunks';
import { setCurrentPage } from '../redux/reducers/global';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalEditOpen, setSelectedItem } from '../redux/reducers/warehouses';
import Link from 'next/link';


export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: 16
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
export const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(even)': {
        backgroundColor: 'rgba(0, 0, 0,.12)',
    },
    '&:hover': {
        backgroundColor: 'rgba(0, 255, 0,.1)',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function WarehousesTable({ which }) {
    const dispatch = useDispatch();

    const {
        items,
        currentPage,
        lastPage,
        loading,
        error,
        itemsCount,
        itemsPerPage,
    } = useSelector((state) => state.global);

    const {
        operatingError,
        selectedItem,
    } = useSelector((state) => state.warehouses);

    useEffect(() => {
        dispatch(getWarehousesFromServer({ which, currentPage, itemsPerPage }))
    }, [currentPage, itemsPerPage, which, dispatch]);

    const handlePageClick = (page) => {
        if (currentPage !== page) {
            dispatch(setCurrentPage(page))
        }
    }

    return (
        <Stack spacing={2} className='mt-7'>
            <div className='w-full text-start'>
                جدول انبارها
            </div>
            <div className='text-start'>
                {
                    itemsCount !== 0 &&
                    <>
                        تعداد : {itemsCount}
                    </>
                }
            </div>
            {!!error ? (
                <div>
                    مشکلی رخ داد! لطفا دوباره تلاش کنید ...
                    <br />
                    {error.toString()}
                </div>
            ) : loading ? (
                <div>درحال دریافت اطلاعات ...</div>
            ) : (
                items?.length !== 0 ?
                    <div>
                        <TableContainer component={Paper} className='max-w-5xl mx-auto'>
                            <Table sx={{ minWidth: 900 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>ردیف</StyledTableCell>
                                        {
                                            which === 'ADMIN' &&
                                            <StyledTableCell align='center'>فروشنده</StyledTableCell>
                                        }
                                        <StyledTableCell align='center'>نام</StyledTableCell>
                                        <StyledTableCell align='center'>شهر</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + itemsPerPage * (currentPage - 1)}</StyledTableCell>{
                                                which === 'ADMIN' &&
                                                <StyledTableCell align='center'>
                                                    <Link className='text-purple-500' href={'/ADMIN/sellers/' + item.sellerId._id}>
                                                        {item.sellerId.name}
                                                    </Link>
                                                </StyledTableCell>
                                            }
                                            <StyledTableCell align='center'>{item.name}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.cityId.name}</StyledTableCell>
                                            <StyledTableCell className='border-b-0'>
                                                {selectedItem?._id === item._id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات
                                                    </div>
                                                ) : (
                                                    <Button
                                                        variant='outlined'
                                                        className='p-0 m-1'
                                                        sx={{ color: 'primary', borderColor: 'primary' }}
                                                        onClick={() => {
                                                            dispatch(setIsModalEditOpen(true));
                                                            dispatch(setSelectedItem({ ...item }));
                                                        }}
                                                    >
                                                        ویرایش
                                                    </Button>
                                                )}
                                                {selectedItem?._id === item._id && operatingError !== '' ? (
                                                    <>
                                                        <div>مشکلی پیش امده است. لطفا اتصال اینترنت را بررسی کنید</div>
                                                        <div>{operatingError}</div>
                                                    </>
                                                ) : ''}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {
                            itemsCount > itemsPerPage &&
                            <div className='flex justify-center' style={{ marginTop: '25px' }}>
                                <Pagination dir='ltr' color='info' variant='outlined' count={lastPage} page={currentPage} onChange={(_e, v) => handlePageClick(v)} />
                            </div>
                        }

                    </div>
                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

            <ModalEdit />

        </Stack>
    );
}

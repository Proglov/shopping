"use client"
import { Button, Pagination, Stack } from '@mui/material';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getTransactionInPersonsFromServer } from '../redux/globalAsyncThunks';
import { setCurrentPage } from '../redux/reducers/global';
import { useDispatch, useSelector } from 'react-redux';
import { StyledTableCell, StyledTableRow } from '../products/ProductsTable';
import { formatPrice } from '@/utils/funcs';
import { setIsModalShowMoreOpen, setSelectedItem } from '../redux/reducers/transactionInPersons';
import ModalShowMore from './ModalShowMore';


export default function TransactionInPersonsTable({ which }) {
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

    useEffect(() => {
        dispatch(getTransactionInPersonsFromServer({ which, currentPage, itemsPerPage }))
    }, [currentPage, itemsPerPage, which, dispatch]);

    const handlePageClick = (page) => {
        if (currentPage !== page) {
            dispatch(setCurrentPage(page))
        }
    }

    return (
        <Stack spacing={2} className='mt-7'>
            <div className='w-full text-start'>
                جدول سفارشات حضوری
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
                            <Table sx={{ minWidth: 580 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>ردیف</StyledTableCell>
                                        <StyledTableCell align='center'>نام مشتری</StyledTableCell>
                                        <StyledTableCell align='center'>شماره همراه مشتری</StyledTableCell>
                                        <StyledTableCell align='center'>قیمت نهایی</StyledTableCell>
                                        <StyledTableCell align='center'>زمان خرید</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + itemsPerPage * (currentPage - 1)}</StyledTableCell>
                                            <StyledTableCell align='center'>{item?.userId?.name}</StyledTableCell>
                                            <StyledTableCell align='center'>{item?.userId?.phone || 'فاقد شماره'}</StyledTableCell>
                                            <StyledTableCell align='center'>{formatPrice(item?.totalPrice)}</StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {
                                                    item?.createdAt !== '' && item?.createdAt != null &&
                                                    <>
                                                        {new Intl.DateTimeFormat('fa-IR').format(new Date(item?.createdAt).getTime())}

                                                    </>
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                <Button
                                                    size='small'
                                                    variant='outlined'
                                                    color='info'
                                                    className='p-0'
                                                    onClick={() => {
                                                        dispatch(setIsModalShowMoreOpen(true));
                                                        dispatch(setSelectedItem(item))
                                                    }}
                                                >
                                                    مشاهده بیشتر
                                                </Button>
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

            <ModalShowMore which={which} />
        </Stack>
    );
}
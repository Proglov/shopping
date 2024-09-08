"use client"
import { Button, Pagination, Stack } from '@mui/material';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertToFarsiNumbers, price2Farsi } from '@/utils/funcs';
import { useDispatch, useSelector } from 'react-redux';
import { GetMajorShoppingProductsFromServer } from '../../redux/globalAsyncThunks';
import { setCurrentPage } from '../../redux/reducers/global';
import ModalDelete from './ModalDelete';
import { setIsModalDeleteOpen, setSelectedItem } from '../../redux/reducers/discounts/majorShopping';
import { StyledTableCell, StyledTableRow } from '../../products/ProductsTable';
import Link from 'next/link';



export default function MajorShoppingsTable({ which }) {
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
    } = useSelector((state) => state.majorShoppings);

    useEffect(() => {
        dispatch(GetMajorShoppingProductsFromServer({ which, page: currentPage, perPage: itemsPerPage }))
    }, [currentPage, itemsPerPage, which, dispatch]);


    const handlePageClick = (page) => {
        if (currentPage !== page) {
            dispatch(setCurrentPage(page))
        }
    }

    return (
        <Stack spacing={2} className='mt-7'>
            <div className='w-full text-start'>
                جدول محصولات عمده
            </div>
            <div className='text-start'>
                {
                    itemsCount !== 0 &&
                    <>
                        تعداد محصولات : {convertToFarsiNumbers(itemsCount)}
                    </>
                }
            </div>
            {(!!error && error !== 'this product already exists in the majorShopping!') ? (
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
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>ردیف</StyledTableCell>
                                        <StyledTableCell align='center'>نام محصول</StyledTableCell>
                                        <StyledTableCell align='center'>درصد تخفیف</StyledTableCell>
                                        <StyledTableCell align='center'>تعداد</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(index + 1 + itemsPerPage * (currentPage - 1))}</StyledTableCell>
                                            <StyledTableCell align='center'>
                                                <Link className='text-purple-500 underline' href={(which === 'Seller' ? '/Seller' : '/ADMIN') + '/products/' + item?.productId}>
                                                    {item.name}
                                                </Link>
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>{price2Farsi(item.offPercentage)}</StyledTableCell>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(item?.quantity)}</StyledTableCell>
                                            <StyledTableCell className='border-b-0'>
                                                {selectedItem?._id === item._id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات
                                                    </div>
                                                ) : (
                                                    <div className='flex justify-center'>
                                                        <Button
                                                            variant='outlined'
                                                            sx={{ color: 'red', borderColor: 'red' }}
                                                            className='p-0'
                                                            onClick={() => {
                                                                dispatch(setIsModalDeleteOpen(true));
                                                                dispatch(setSelectedItem({ ...item }))
                                                            }}
                                                        >
                                                            حذف
                                                        </Button>
                                                    </div>
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
                        جشنواره ای جهت نمایش وجود ندارد
                    </div>
            )}

            <ModalDelete />

        </Stack>
    );
}
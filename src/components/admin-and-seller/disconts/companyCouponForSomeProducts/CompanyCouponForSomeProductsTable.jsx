"use client"
import { Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '../../../Pagination';
import { convertToFarsiNumbers, price2Farsi } from '@/utils/funcs';
import { useDispatch, useSelector } from 'react-redux';
import { GetCompanyCouponForSomeProductsProductsFromServer } from '../../redux/globalAsyncThunks';
import { setCurrentPage } from '../../redux/reducers/global';
import ModalDelete from './ModalDelete';
import { getShowMoreProductsFromServer, setIsModalDeleteOpen, setIsModalShowMoreOpen, setSelectedItem } from '../../redux/reducers/discounts/companyCouponForSomeProducts';
import ModalShowMore from './ModalShowMore';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function CompanyCouponForSomeProductsTable({ which }) {
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
    } = useSelector((state) => state.companyCouponForSomeProducts);

    useEffect(() => {
        dispatch(GetCompanyCouponForSomeProductsProductsFromServer({ which, currentPage, itemsPerPage }))
    }, [currentPage, itemsPerPage, which, dispatch]);


    return (
        <Stack spacing={2} className='mt-7'>
            <div className='w-full text-start'>
                جدول طرح ها
            </div>
            <div className='text-start'>
                {
                    itemsCount !== 0 &&
                    <>
                        تعداد : {convertToFarsiNumbers(itemsCount)}
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
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>ردیف</StyledTableCell>
                                        <StyledTableCell align='center'>کد تخفیف</StyledTableCell>
                                        <StyledTableCell align='center'>درصد تخفیف</StyledTableCell>
                                        <StyledTableCell align='center'>حداقل خرید</StyledTableCell>
                                        <StyledTableCell align='center'>حداکثر مبلغ تخفیف</StyledTableCell>
                                        <StyledTableCell align='center'>باقیمانده</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(index + 1 + itemsPerPage * (currentPage - 1))}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.body}</StyledTableCell>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(item.offPercentage)}</StyledTableCell>
                                            <StyledTableCell align='center'>{price2Farsi(item.minBuy)} تومان</StyledTableCell>
                                            <StyledTableCell align='center'>{price2Farsi(item.maxOffPrice)} تومان</StyledTableCell>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(item.remainingCount)}</StyledTableCell>
                                            <StyledTableCell className='border-b-0'>
                                                {selectedItem?._id === item._id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات
                                                    </div>
                                                ) : (
                                                    <div className='flex flex-col justify-center gap-2'>
                                                        <Button
                                                            size='small'
                                                            variant='outlined'
                                                            color='info'
                                                            className='p-0'
                                                            onClick={() => {
                                                                dispatch(setIsModalShowMoreOpen(true));
                                                                dispatch(getShowMoreProductsFromServer(item._id))
                                                            }}
                                                        >
                                                            مشاهدۀ محصولات
                                                        </Button>
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
                                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} />
                            </div>
                        }

                    </div>
                    : <div>
                        جشنواره ای جهت نمایش وجود ندارد
                    </div>
            )}

            <ModalDelete />
            <ModalShowMore />

        </Stack>
    );
}

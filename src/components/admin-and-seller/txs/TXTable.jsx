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
import { convertToFarsiNumbers, formatPrice, price2Farsi } from '@/utils/funcs';
import Pagination from '../../Pagination';
import ModalShowMore from './ModalShowMore';
import ModalDone from './ModalDone';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/reducers/global';
import { getFutureTXsFromServer } from '../redux/globalAsyncThunks';
import { getRecentTXFromServer, setSelectedItem, setIsModalDoneOpen, setIsModalShowMoreOpen, setIsRecentTableOperating, setCurrentPageRecentTX } from '../redux/reducers/transactions';


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

const Component = ({ itemsCount, error, loading, items, currentPage, itemsPerPage, selectedItem, setCurrentPage, lastPage, dispatch, operatingError, isFutureOrder }) => (
    <Stack spacing={2} className={`${!isFutureOrder && 'mt-16'}`}>
        <div className='w-full text-start'>
            جدول تراکنش های سفارشات &nbsp;
            {!!isFutureOrder ? <>آتی</> : <>اخیر</>}
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
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>ردیف</StyledTableCell>
                                    <StyledTableCell align='center'>نام خریدار</StyledTableCell>
                                    <StyledTableCell align='center'>شماره خریدار</StyledTableCell>
                                    <StyledTableCell align='center'>زمان ارسال</StyledTableCell>
                                    <StyledTableCell align='center'>ارسال شده</StyledTableCell>
                                    <StyledTableCell align='center'>قیمت نهایی</StyledTableCell>
                                    <StyledTableCell align='center'>عملیات</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <StyledTableRow key={item._id}
                                        className='align-middle'>
                                        <StyledTableCell align='center'>{convertToFarsiNumbers(index + 1 + itemsPerPage * (currentPage - 1))}</StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {item.userId?.name}
                                            {!item.userId?.name && <>فاقد نام</>}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>{convertToFarsiNumbers(item.userId?.phone)}</StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {
                                                !!item?.shouldBeSentAt &&
                                                <>
                                                    {new Intl.DateTimeFormat('fa-IR').format(parseInt(item?.shouldBeSentAt))}
                                                    <br />
                                                    {convertToFarsiNumbers((new Date(parseInt(item.shouldBeSentAt)).getHours()))}
                                                    :{convertToFarsiNumbers(("0" + (new Date((parseInt(item?.shouldBeSentAt))).getMinutes())).slice(-2))}
                                                </>
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {!!item?.done ?
                                                <span className='text-green-500'>
                                                    بله
                                                </span> : <span className='text-orange-500'>
                                                    خیر
                                                </span>}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {formatPrice(item.totalPrice)}
                                            <br />
                                            {price2Farsi(item.totalPrice)}
                                            <br />
                                            تومان
                                        </StyledTableCell>
                                        <StyledTableCell className='gap-2' sx={{
                                            flexDirection: 'column',
                                            display: 'flex'
                                        }}>
                                            <Button
                                                variant='outlined'
                                                color='success'
                                                className='p-0 m-1'
                                                sx={{ color: 'green', borderColor: 'green' }}
                                                onClick={() => {
                                                    dispatch(setIsModalShowMoreOpen(true));
                                                    dispatch(setSelectedItem(item));
                                                }}
                                            >
                                                مشاهده بیشتر
                                            </Button>
                                            {
                                                !item.done &&
                                                <Button
                                                    variant='outlined'
                                                    className='p-0 m-1'
                                                    sx={{ color: 'blue', borderColor: '' }}
                                                    onClick={async () => {
                                                        dispatch(setIsRecentTableOperating(!isFutureOrder))
                                                        dispatch(setIsModalDoneOpen(true));
                                                        dispatch(setSelectedItem(item));
                                                    }}
                                                >
                                                    ارسال شد
                                                </Button>
                                            }
                                            {selectedItem?._id === item._id && operatingError != '' ? (
                                                <>
                                                    <div>
                                                        {operatingError}
                                                    </div>
                                                    <div>مشکلی پیش امده است. لطفا اتصال اینترنت را بررسی کنید</div>
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
                    اطلاعاتی جهت نمایش وجود ندارد
                </div>
        )}
    </Stack>
)

export default function TXTable({ which, isFutureOrder }) {
    const dispatch = useDispatch();
    const {
        items,
        currentPage,
        lastPage,
        loading,
        error,
        itemsPerPage,
        itemsCount
    } = useSelector((state) => state.global);
    const {
        selectedItem,
        operatingError,
        recentTX,
        loadingRecentTX,
        errorRecentTX,
        currentPageRecentTX,
        lastPageRecentTX,
        itemsCountRecentTX,
        itemsPerPageRecentTX
    } = useSelector((state) => state.transactions);


    useEffect(() => {
        if (!!isFutureOrder)
            dispatch(getFutureTXsFromServer({ page: currentPage, perPage: itemsPerPage, which }));
        else
            dispatch(getRecentTXFromServer({ page: currentPage, perPage: itemsPerPage, which }));
    }, [currentPage, dispatch, isFutureOrder, itemsPerPage, which]);


    return (<>
        {
            !!isFutureOrder &&
            <Component currentPage={currentPage} dispatch={dispatch} error={error} items={items} itemsCount={itemsCount} itemsPerPage={itemsPerPage} lastPage={lastPage} loading={loading} selectedItem={selectedItem} setCurrentPage={setCurrentPage} operatingError={operatingError} isFutureOrder={isFutureOrder} which={which} />
        }
        {
            !isFutureOrder &&
            <Component currentPage={currentPageRecentTX} dispatch={dispatch} error={errorRecentTX} items={recentTX} itemsCount={itemsCountRecentTX} itemsPerPage={itemsPerPageRecentTX} lastPage={lastPageRecentTX} loading={loadingRecentTX} selectedItem={selectedItem} setCurrentPage={setCurrentPageRecentTX} operatingError={operatingError} isFutureOrder={isFutureOrder} which={which} />
        }
        <ModalShowMore />
        <ModalDone />
    </>);
}
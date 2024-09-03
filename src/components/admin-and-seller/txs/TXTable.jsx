"use client"
import { Button, Pagination, Stack } from '@mui/material';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertToFarsiNumbers, formatPrice, price2Farsi } from '@/utils/funcs';
import ModalShowMore from './ModalShowMore';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/reducers/global';
import { getFutureTXsFromServer, updateTXStatusToServer } from '../redux/globalAsyncThunks';
import { getRecentTXFromServer, setSelectedItem, setIsModalShowMoreOpen, setCurrentPageRecentTX, updateRecentTXStatusToServer } from '../redux/reducers/transactions';
import { StyledTableCell, StyledTableRow } from '../products/ProductsTable';


const Component = ({ txStatuses, itemsCount, error, loading, items, currentPage, itemsPerPage, selectedItem, handlePageClick, setPage, lastPage, dispatch, operatingError, isFutureOrder }) => (
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
                                    <StyledTableCell align='center'>قیمت نهایی</StyledTableCell>
                                    <StyledTableCell align='center'>وضعیت ارسال</StyledTableCell>
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
                                                    ساعت &nbsp;
                                                    {convertToFarsiNumbers((new Date(parseInt(item.shouldBeSentAt)).getHours()))}
                                                </>
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {formatPrice(item.totalPrice)}
                                            <br />
                                            {price2Farsi(item.totalPrice)}
                                            <br />
                                            تومان
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            <span className={txStatuses[item.status]?.color || ''}>
                                                {txStatuses[item.status]?.name}
                                            </span>
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
                                                (item?.status !== 'Canceled' && item?.status !== 'Received' && !!item?.status) &&
                                                <Button
                                                    variant='outlined'
                                                    className='p-0 m-1'
                                                    color='primary'
                                                    onClick={async () => {
                                                        if (isFutureOrder) dispatch(updateTXStatusToServer({ id: item?._id, newStatus: txStatuses[item?.status].nextStep }));
                                                        else dispatch(updateRecentTXStatusToServer({ id: item?._id, newStatus: txStatuses[item?.status].nextStep }))
                                                    }}
                                                >
                                                    {
                                                        txStatuses[item?.status].nextStepFarsi
                                                    }
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
                            <Pagination dir='ltr' color='info' variant='outlined' count={lastPage} page={currentPage} onChange={(_e, v) => handlePageClick(v, setPage, currentPage)} />
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
    }, [currentPage, dispatch, isFutureOrder, itemsPerPage, which]);

    useEffect(() => {
        if (!isFutureOrder)
            dispatch(getRecentTXFromServer({ page: currentPageRecentTX, perPage: itemsPerPageRecentTX, which }));
    }, [dispatch, isFutureOrder, currentPageRecentTX, itemsPerPageRecentTX, which]);


    const handlePageClick = (page, setPage, current) => {
        if (current !== page) {
            dispatch(setPage(page))
        }
    }

    const txStatuses = {
        Requested: {
            name: 'در انتظار ارسال',
            color: 'text-yellow-600',
            nextStep: 'Sent',
            nextStepFarsi: 'ارسال شد',
        },
        Sent: {
            name: 'ارسال شده',
            color: 'text-blue-500',
            nextStep: 'Received',
            nextStepFarsi: 'مشتری دریافت کرد',
        },
        Received: {
            name: 'دریافت شده',
            color: 'text-green-500'
        },
        Canceled: {
            name: 'کنسل شده',
            color: 'text-red-500'
        }
    }

    return (<>
        {
            !!isFutureOrder &&
            <Component txStatuses={txStatuses} currentPage={currentPage} dispatch={dispatch} error={error} items={items} itemsCount={itemsCount} itemsPerPage={itemsPerPage} lastPage={lastPage} loading={loading} selectedItem={selectedItem} handlePageClick={handlePageClick} setPage={setCurrentPage} operatingError={operatingError} isFutureOrder={isFutureOrder} which={which} />
        }
        {
            !isFutureOrder &&
            <Component txStatuses={txStatuses} currentPage={currentPageRecentTX} dispatch={dispatch} error={errorRecentTX} items={recentTX} itemsCount={itemsCountRecentTX} itemsPerPage={itemsPerPageRecentTX} lastPage={lastPageRecentTX} loading={loadingRecentTX} selectedItem={selectedItem} handlePageClick={handlePageClick} setPage={setCurrentPageRecentTX} operatingError={operatingError} isFutureOrder={isFutureOrder} which={which} />
        }
        <ModalShowMore />
    </>);
}
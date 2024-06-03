"use client"
import { Button, Stack } from '@mui/material';
import { useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Api from '@/services/withAuthActivities/tx';
import { convertToFarsiNumbers, formatPrice, price2Farsi } from '@/utils/funcs';
import Pagination from './Pagination';
import { ItemsContext } from './TXMain';
import ModalShowMore from './ModalShowMore';
import ModalDone from './ModalDone';


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



export default function TXTable() {
    const { getAllMyTXs, getAllTXs } = Api

    const {
        currentPage,
        setLastPage,
        loading,
        setLoading,
        isError,
        setIsError,
        error,
        setError,
        operatingError,
        items,
        setItems,
        itemsCount,
        setItemsCount,
        setIsModalShowMoreOpen,
        setIsModalDoneOpen,
        setSelectedItem,
        selectedItem,
        itemsPerPage,
        isFutureOrder,
        which
    } = useContext(ItemsContext)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let TX = {};
                if (which === "Seller") {
                    TX = await getAllMyTXs({ page: currentPage, perPage: itemsPerPage, isFutureOrder });
                    setItems(TX.transactions)
                    setItemsCount(TX.transactionsCount)
                    setLastPage(Math.ceil(TX.transactionsCount / itemsPerPage))
                }
                else if (which === "ADMIN") {
                    TX = await getAllTXs({ page: currentPage, perPage: itemsPerPage, isFutureOrder });
                    setItems(TX.transactions)
                    setItemsCount(TX.transactionsCount)
                    setLastPage(Math.ceil(TX.transactionsCount / itemsPerPage))
                }
            } catch (error) {
                setError(`Error fetching transactions: ${error}`);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, getAllMyTXs, itemsPerPage, setError, setIsError, setItems, setItemsCount, setLoading, isFutureOrder]);
    return (
        <Stack spacing={2} className='mt-10'>
            <span className='w-full text-start'>
                جدول تراکنش های سفارشات &nbsp;
                {!!isFutureOrder ? <>آتی</> : <>اخیر</>}
            </span>
            {isError ? (
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
                                        <StyledTableRow key={item.id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(index + 1 + itemsPerPage * (currentPage - 1))}</StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {item.userId?.name}
                                                {!item.userId?.name && <>فاقد نام</>}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(item.userId.phone)}</StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {new Intl.DateTimeFormat('fa-IR').format(parseInt(item.shouldBeSentAt))}
                                                <br />
                                                {convertToFarsiNumbers((new Date(parseInt(item.shouldBeSentAt)).getHours()))}
                                                :{convertToFarsiNumbers(("0" + (new Date((parseInt(item.shouldBeSentAt))).getMinutes())).slice(-2))}
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
                                            <StyledTableCell className='flex flex-col justify-center border-b-0 align-middle'>
                                                <Button
                                                    variant='outlined'
                                                    className='p-0 m-1'
                                                    sx={{ color: 'green', borderColor: 'green' }}
                                                    onClick={() => {
                                                        setIsModalShowMoreOpen(true);
                                                        setSelectedItem({
                                                            ...item
                                                        })
                                                    }}
                                                >
                                                    مشاهده بیشتر
                                                </Button>
                                                {
                                                    !item?.done && which === "Seller" &&
                                                    <Button
                                                        variant='outlined'
                                                        className='p-0 m-1'
                                                        sx={{ color: 'blue', borderColor: '' }}
                                                        onClick={async () => {
                                                            setIsModalDoneOpen(true);
                                                            setSelectedItem({
                                                                ...item
                                                            })
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
                                <Pagination />
                            </div>
                        }

                    </div>
                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

            <ModalShowMore />
            <ModalDone />

        </Stack>
    );
}

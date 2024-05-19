"use client"
import { Button, Stack } from '@mui/material';
import { useEffect, createContext, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { giveMeToken } from '@/utils/Auth';
import Api from '@/services/adminActivities/tx';
import { convertToFarsiNumbers, formatPrice, price2Farsi } from '@/utils/funcs';
import PaginationNow from './Pagination';
import { ItemsContext } from './TXMain';
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

export const PaginationContext = createContext();
export const ModalShowMoreContext = createContext();


export default function TXTable() {
    const { getAllTxs } = Api

    const {
        currentPage,
        setCurrentPage,
        loading,
        setLoading,
        isError,
        setIsError,
        error,
        setError,
        operatingID,
        setOperatingID,
        operatingError,
        setOperatingError,
        items,
        setItems,
        itemsCount,
        setItemsCount,
        isModalShowMoreOpen,
        setIsModalShowMoreOpen,
        setSelectedItem,
        selectedItem,
        itemsPerPage,
        isFutureOrder
    } = useContext(ItemsContext)


    useEffect(() => {
        const Token = giveMeToken();
        const fetchData = async () => {
            try {
                const TX = await getAllTxs(Token, { page: currentPage, perPage: itemsPerPage, isFutureOrder });
                setItems(TX.TransActions)
            } catch (error) {
                console.error('Error fetching users:', error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };
        const fetchCount = async () => {
            try {
                setLoading(true);
                const count = await getTXCount(Token, isFutureOrder);
                setItemsCount(count.TransActionsCount)
            } catch (error) {
                console.error('Error fetching users count:', error);
                setIsError(true);
            } finally {
                fetchData();

            }
        };

        fetchCount();
    }, [currentPage]);
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
                                                {item.user?.name}
                                                {!item.user?.name && <>فاقد نام</>}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(item.user.phone)}</StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {new Intl.DateTimeFormat('fa-IR').format(parseInt(item.shouldBeSentAt))}
                                                <br />
                                                {convertToFarsiNumbers((new Date(parseInt(item.shouldBeSentAt)).getHours()))}
                                                :{convertToFarsiNumbers(("0" + (new Date((parseInt(item.shouldBeSentAt))).getMinutes())).slice(-2))}
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
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {
                            itemsCount > itemsPerPage &&
                            <div className='flex justify-center' style={{ marginTop: '25px' }}>
                                <PaginationContext.Provider value={{ lastPage: Math.ceil(itemsCount / itemsPerPage), currentPage, setCurrentPage }}>
                                    <PaginationNow />
                                </PaginationContext.Provider>
                            </div>
                        }

                    </div>
                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

            <>
                <ModalShowMoreContext.Provider value={{
                    isModalShowMoreOpen,
                    setIsModalShowMoreOpen,
                    selectedItem
                }}>
                    <ModalShowMore />
                </ModalShowMoreContext.Provider>
            </>

        </Stack>
    );
}

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
import { convertToFarsiNumbers, iranianCalendar, price2Farsi } from '@/utils/funcs';
import { useDispatch, useSelector } from 'react-redux';
import { GetFestivalProductsFromServer } from '../../redux/globalAsyncThunks';
import { setCurrentPage } from '../../redux/reducers/global';
// import ModalDelete from './ModalDelete';
import { setIsModalDeleteOpen, setSelectedItem } from '../../redux/reducers/discounts/festivals';


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
    } = useSelector((state) => state.festivals);

    useEffect(() => {
        dispatch(GetFestivalProductsFromServer({ which, currentPage, itemsPerPage }))
    }, [currentPage, itemsPerPage, which, dispatch]);


    return (
        <Stack spacing={2} className='mt-7'>
            <div className='w-full text-start'>
                جدول جشنواره ها
            </div>
            <div className='text-start'>
                {
                    itemsCount !== 0 &&
                    <>
                        تعداد : {convertToFarsiNumbers(itemsCount)}
                    </>
                }
            </div>
            {(!!error && error !== 'this product already exists in the festival!') ? (
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
                                        <StyledTableCell align='center'>لغایت</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(index + 1 + itemsPerPage * (currentPage - 1))}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.name}</StyledTableCell>
                                            <StyledTableCell align='center'>{price2Farsi(item.offPercentage)}</StyledTableCell>
                                            <StyledTableCell align='center'>{iranianCalendar(new Date(parseInt(item?.until)))}</StyledTableCell>
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
                                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} />
                            </div>
                        }

                    </div>
                    : <div>
                        جشنواره ای جهت نمایش وجود ندارد
                    </div>
            )}

            {/* <ModalDelete /> */}

        </Stack>
    );
}

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
import Pagination from '../../Pagination';
import { price2Farsi } from '@/utils/funcs';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import { getAdminProductsFromServer, getSellerProductsFromServer } from '../redux/globalAsyncThunks';
import { setCurrentPage } from '../redux/reducers/global';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalDeleteOpen, setIsModalEditOpen, setSelectedItem } from '../redux/reducers/products';


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


export default function ProductsTable({ which }) {
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
    } = useSelector((state) => state.products);

    useEffect(() => {

        if (which === "Seller") dispatch(getSellerProductsFromServer({ currentPage, itemsPerPage }))
        else if (which === "ADMIN") dispatch(getAdminProductsFromServer({ currentPage, itemsPerPage }))

    }, [currentPage, itemsPerPage, which]);


    return (
        <Stack spacing={2} className='mt-7'>
            <div className='w-full text-start'>
                جدول محصولات
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
                                        <StyledTableCell align='center'>نام</StyledTableCell>
                                        <StyledTableCell align='center'>قیمت به حروف</StyledTableCell>
                                        <StyledTableCell align='center'>قیمت به عدد</StyledTableCell>
                                        <StyledTableCell align='center'>دسته بندی</StyledTableCell>
                                        <StyledTableCell align='center'>زیر دسته بندی</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + itemsPerPage * (currentPage - 1)}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.name}</StyledTableCell>
                                            <StyledTableCell align='center'>{price2Farsi(item.price)} تومان</StyledTableCell>
                                            <StyledTableCell align='center'>{item.price}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.subcategoryId?.categoryId.name}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.subcategoryId?.name}</StyledTableCell>
                                            <StyledTableCell className='border-b-0'>
                                                {selectedItem?._id === item._id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات
                                                    </div>
                                                ) : (
                                                    <div className='flex flex-col gap-2'>
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
                                                        <Button
                                                            variant='outlined'
                                                            sx={{ color: 'red', borderColor: 'red' }}
                                                            className='p-0 m-1'
                                                            onClick={() => {
                                                                dispatch(setIsModalDeleteOpen(true));
                                                                dispatch(setSelectedItem({ ...item }));
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
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

            <ModalDelete productName={selectedItem?.name} />
            <ModalEdit />

        </Stack>
    );
}

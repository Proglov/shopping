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
import ModalDelete from './ModalDelete';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/reducers/global';
import { setIsModalDeleteOpen, setSelectedItem } from '../redux/reducers/users';
import { getUsersFromServer } from '../redux/globalAsyncThunks';


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



export default function UsersTable() {
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
    } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsersFromServer({ currentPage, itemsPerPage }))
    }, [dispatch, currentPage, itemsPerPage]);

    const handlePageClick = (page) => {
        if (currentPage !== page) {
            dispatch(setCurrentPage(page))
        }
    }

    return (
        <Stack spacing={2}>
            <div className='w-full text-start'>
                جدول کاربران
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
                                        <StyledTableCell align='center'>نام کاربری</StyledTableCell>
                                        <StyledTableCell align='center'>ایمیل</StyledTableCell>
                                        <StyledTableCell align='center'>شماره</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + itemsPerPage * (currentPage - 1)}</StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {item.name}
                                                {!item.name && <>فاقد نام</>}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {item.username}
                                                {!item.username && <>فاقد نام کاربری</>}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {item.email}
                                                {!item.email && <>فاقد ایمیل</>}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>{item.phone}</StyledTableCell>
                                            <StyledTableCell className='flex flex-col justify-center border-b-0 align-middle'>
                                                {selectedItem?._id === item._id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات</div>
                                                ) : (
                                                    <>
                                                        <Button
                                                            variant='outlined'
                                                            sx={{ color: 'red', borderColor: 'red' }}
                                                            className='p-0 m-1'
                                                            onClick={() => {
                                                                dispatch(setIsModalDeleteOpen(true));
                                                                dispatch(setSelectedItem({ ...item }))
                                                            }}
                                                        >
                                                            حذف
                                                        </Button>
                                                    </>
                                                )}
                                                {selectedItem?._id === item._id && operatingError !== '' ? (
                                                    <>
                                                        <div>{error}</div>
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
                                <Pagination dir='ltr' color='info' variant='outlined' count={lastPage} page={currentPage} onChange={(_e, v) => handlePageClick(v)} />                            </div>
                        }

                    </div>
                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

            <ModalDelete />

        </Stack>
    );
}

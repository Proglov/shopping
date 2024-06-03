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
import Api from '@/services/withAuthActivities/user';
import Pagination from './Pagination';
import ModalDelete from './ModalDelete';
import { UsersContext } from './UsersMain';


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
    const { getAllUsers } = Api

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
        setIsModalDeleteOpen,
        setSelectedItem,
        selectedItem,
        itemsPerPage
    } = useContext(UsersContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await getAllUsers({ page: currentPage, perPage: itemsPerPage });
                setItems(users.users)
                setItemsCount(users?.usersCount)
                setLastPage(Math.ceil(users?.usersCount / itemsPerPage))
            } catch (error) {
                setError(`Error fetching users: ${error}`);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, getAllUsers, itemsPerPage, setError, setIsError, setItems, setItemsCount, setLoading]);
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
                                        <StyledTableCell align='center'>نام</StyledTableCell>
                                        <StyledTableCell align='center'>نام کاربری</StyledTableCell>
                                        <StyledTableCell align='center'>ایمیل</StyledTableCell>
                                        <StyledTableCell align='center'>شماره</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item.id}
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
                                                                setIsModalDeleteOpen(true);
                                                                setSelectedItem({
                                                                    ...item
                                                                })
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
                                <Pagination />
                            </div>
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

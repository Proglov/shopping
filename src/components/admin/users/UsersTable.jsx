"use client"
import { Button, Stack } from '@mui/material';
import { useEffect, useState, createContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllUsers, getUsersCount } from '@/services/adminActivities/users';
import Pagination from './Pagination';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import { giveMeToken } from '@/utils/Auth';
import Link from 'next/link';


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
export const ModalDeleteContext = createContext();
export const ModalEditContext = createContext();


export default function UsersTable() {

    const itemsPerPage = 5

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [operatingID, setOperatingID] = useState('');
    const [operatingError, setOperatingError] = useState('');
    const [items, setItems] = useState([])
    const [itemsCount, setItemsCount] = useState(0)
    const [selectedItem, setSelectedItem] = useState({
        id: '',
        name: '',
        email: '',
        username: '',
        phone: ''
    });

    useEffect(() => {
        const Token = giveMeToken();
        const fetchData = async () => {
            try {
                const users = await getAllUsers(Token, { page: currentPage, perPage: itemsPerPage });
                setItems(users.UsersGet)
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
                const count = await getUsersCount(Token);
                setItemsCount(count.UsersCount)
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
                جدول کاربران
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
                                                {operatingID === item.id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات</div>
                                                ) : (
                                                    <>
                                                        <Button
                                                            variant='outlined'
                                                            className='p-0 m-1'
                                                            sx={{ color: 'primary', borderColor: 'primary' }}
                                                            onClick={() => {
                                                                setIsModalEditOpen(true);
                                                                setSelectedItem(prev => ({
                                                                    ...item,
                                                                    imagesURL: prev.imagesURL
                                                                }))
                                                            }}
                                                        >
                                                            ویرایش
                                                        </Button>
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
                                                        <Button
                                                            variant='outlined'
                                                            sx={{ color: 'green', borderColor: 'green' }}
                                                            className='p-0 m-1'
                                                            role='link'
                                                        >
                                                            <Link href={`/ADMIN/users/${item.id}`}>
                                                                مشاهده بیشتر
                                                            </Link>
                                                        </Button>
                                                    </>
                                                )}
                                                {operatingID === item.id && operatingError !== '' ? (
                                                    <div>مشکلی پیش امده است. لطفا اتصال اینترنت را بررسی کنید</div>
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
                                <PaginationContext.Provider value={{ lastPage: Math.ceil(itemsCount / itemsPerPage), currentPage, setCurrentPage }}>
                                    <Pagination />
                                </PaginationContext.Provider>
                            </div>
                        }

                    </div>
                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

            <>

                <ModalDeleteContext.Provider value={{ isModalDeleteOpen, setIsModalDeleteOpen }}>
                    <ModalDelete id={selectedItem.id} />
                </ModalDeleteContext.Provider>

                <ModalEditContext.Provider value={{
                    isModalEditOpen,
                    setIsModalEditOpen,
                    setSelectedItem,
                    selectedItem
                }}>
                    <ModalEdit />
                </ModalEditContext.Provider>
            </>

        </Stack>
    );
}

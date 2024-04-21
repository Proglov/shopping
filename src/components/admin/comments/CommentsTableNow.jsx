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
import { convertToFarsiNumbers } from '@/utils/funcs';
import PaginationNow from './PaginationNow';
import { getAllComments, getCommentsCount } from '@/services/userActivities/comment';
import ModalDeleteNow from './ModalDeleteNow';
import ModalConfirmNow from './ModalConfirmNow';


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
export const ModalConfirmContext = createContext();


export default function CommentsTableNow() {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

    const itemsPerPage = 20

    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [operatingID, setOperatingID] = useState('');
    const [operatingError, setOperatingError] = useState('');
    const [items, setItems] = useState([])
    const [itemsCount, setItemsCount] = useState(0)
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const comments = await getAllComments({ page: currentPage, perPage: itemsPerPage, validated: false });
                setItems(comments.Comments)
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
                const count = await getCommentsCount(false);
                setItemsCount(count.CommentsCount)
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
                جدول کامنت های تایید نشده
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
                                        <StyledTableCell align='center'>شماره کاربر</StyledTableCell>
                                        <StyledTableCell align='center'>متن ارسال شده</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item.id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(index + 1 + itemsPerPage * (currentPage - 1))}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.user?.phone}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.body}</StyledTableCell>
                                            <StyledTableCell className='flex flex-col justify-center border-b-0 align-middle'>
                                                {operatingID === item.id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات</div>
                                                ) : (
                                                    <>
                                                        <Button
                                                            variant='outlined'
                                                            className='p-0 m-1'
                                                            sx={{ color: 'green', borderColor: 'green' }}
                                                            onClick={() => {
                                                                setIsModalConfirmOpen(true);
                                                                setSelectedId(item.id)
                                                            }}
                                                        >
                                                            تایید
                                                        </Button>
                                                        <Button
                                                            variant='outlined'
                                                            sx={{ color: 'red', borderColor: 'red' }}
                                                            className='p-0 m-1'
                                                            onClick={() => {
                                                                setIsModalDeleteOpen(true);
                                                                setSelectedId(item.id)
                                                            }}
                                                        >
                                                            حذف
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

                {/* <ModalDeleteContext.Provider value={{ isModalDeleteOpen, setIsModalDeleteOpen, id: selectedId }}>
                    <ModalDeleteNow />
                </ModalDeleteContext.Provider>

                <ModalConfirmContext.Provider value={{
                    isModalConfirmOpen,
                    setIsModalConfirmOpen,
                    id: selectedId
                }}>
                    <ModalConfirmNow />
                </ModalConfirmContext.Provider> */}
            </>

        </Stack>
    );
}

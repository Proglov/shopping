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
import { convertToFarsiNumbers } from '@/utils/funcs';
import Pagination from './Pagination';
import Api from '@/services/userActivities/comment';
import ModalDelete from './ModalDelete';
import ModalConfirm from './ModalConfirm';
import { ItemsContext } from './CommentsMain';


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


export default function CommentsTable() {
    const { getAllComments } = Api

    const {
        items,
        setItems,
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
        itemsCount,
        setItemsCount,
        selectedId,
        setSelectedId,
        isModalConfirmOpen,
        setIsModalConfirmOpen,
        isModalDeleteOpen,
        setIsModalDeleteOpen,
        itemsPerPage,
        validated,
    } = useContext(ItemsContext)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const comments = await getAllComments({ page: currentPage, perPage: itemsPerPage, validated });
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
                const count = await getCommentsCount(validated);
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
                جدول کامنت های تایید {!!validated ? <></> : <>ن</>}شده
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
                                                        {!!validated ? <></> : <>
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
                                                        </>}

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
                    <ModalDelete id={selectedId} />
                </ModalDeleteContext.Provider>

                <ModalConfirmContext.Provider value={{
                    isModalConfirmOpen,
                    setIsModalConfirmOpen
                }}>
                    <ModalConfirm />
                </ModalConfirmContext.Provider>
            </>

        </Stack>
    );
}

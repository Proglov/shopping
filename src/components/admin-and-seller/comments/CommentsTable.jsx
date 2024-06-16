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
import { convertToFarsiNumbers } from '@/utils/funcs';
import Pagination from '../../Pagination';
import Api from '@/services/withoutAuthActivities/comment';
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



export default function CommentsTable() {
    const { getAllComments } = Api

    const {
        items,
        setItems,
        currentPage,
        setCurrentPage,
        lastPage,
        setLastPage,
        loading,
        setLoading,
        isError,
        setIsError,
        error,
        setError,
        operatingError,
        itemsCount,
        setItemsCount,
        selectedId,
        setSelectedId,
        setIsModalConfirmOpen,
        setIsModalDeleteOpen,
        itemsPerPage,
        validated,
    } = useContext(ItemsContext)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const comments = await getAllComments({ page: currentPage, perPage: itemsPerPage, validated });
                setItems(comments?.comments)
                setItemsCount(comments?.allCommentsCount)
                setLastPage(Math.ceil(comments?.allCommentsCount / itemsPerPage))
            } catch (error) {
                setError(`Error fetching users: ${error}`);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, getAllComments, itemsPerPage, setError, setIsError, setItems, setItemsCount, setLoading, validated, setLastPage]);
    return (
        <Stack spacing={2}>
            <div className='w-full text-start'>
                جدول کامنت های تایید {!!validated ? <></> : <>ن</>}شده
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
                                        <StyledTableCell align='center'>آیدی کاربر</StyledTableCell>
                                        <StyledTableCell align='center'>متن ارسال شده</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(index + 1 + itemsPerPage * (currentPage - 1))}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.ownerId?._id}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.body}</StyledTableCell>
                                            <StyledTableCell className='border-b-0'>
                                                {selectedId === item._id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات</div>
                                                ) : (
                                                    <div className='flex flex-col gap-2'>
                                                        {!!validated ? <></> : <>
                                                            <Button
                                                                variant='outlined'
                                                                color='success'
                                                                className='p-0 m-1'
                                                                sx={{ color: 'green', borderColor: 'green' }}
                                                                onClick={() => {
                                                                    setIsModalConfirmOpen(true);
                                                                    setSelectedId(item._id)
                                                                }}
                                                            >
                                                                تایید
                                                            </Button>
                                                        </>}

                                                        <Button
                                                            variant='outlined'
                                                            color='error'
                                                            sx={{ color: 'red', borderColor: 'red' }}
                                                            className='p-0 m-1'
                                                            onClick={() => {
                                                                setIsModalDeleteOpen(true);
                                                                setSelectedId(item._id)
                                                            }}
                                                        >
                                                            حذف
                                                        </Button>
                                                    </div>
                                                )}
                                                {selectedId === item._id && operatingError !== '' ? (
                                                    <>
                                                        <div>
                                                            {error}
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
                                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} />
                            </div>
                        }

                    </div>
                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

            <ModalDelete />
            <ModalConfirm />

        </Stack>
    );
}

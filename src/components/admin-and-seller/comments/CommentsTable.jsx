"use client"
import { Button, Pagination, Stack } from '@mui/material';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertToFarsiNumbers } from '@/utils/funcs';
import ModalDelete from './ModalDelete';
import ModalConfirm from './ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/reducers/global';
import { getInvalidatedCommentsFromServer } from '../redux/globalAsyncThunks';
import { getConfirmedCommentsFromServer, setSelectedId, setIsModalConfirmOpen, setIsModalDeleteOpen, setIsConfirmedTableOperating, setCurrentPageConfirmedComments } from '../redux/reducers/comments';
import { StyledTableCell, StyledTableRow } from '../products/ProductsTable';
import Link from 'next/link';



const Component = ({ validated, itemsCount, error, loading, items, currentPage, itemsPerPage, selectedId, setPage, handlePageClick, lastPage, dispatch, operatingError }) => (
    <Stack spacing={2} className={`${!!validated ? 'mt-10' : ''}`}>
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
                    <TableContainer component={Paper} className='max-w-4xl mx-auto'>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>ردیف</StyledTableCell>
                                    <StyledTableCell align='center'>کاربر</StyledTableCell>
                                    <StyledTableCell align='center'>متن ارسال شده</StyledTableCell>
                                    <StyledTableCell align='center'>محصول</StyledTableCell>
                                    <StyledTableCell align='center'>عملیات</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <StyledTableRow key={item._id}
                                        className='align-middle'>
                                        <StyledTableCell align='center'>{convertToFarsiNumbers(index + 1 + itemsPerPage * (currentPage - 1))}</StyledTableCell>
                                        <StyledTableCell align='center'>
                                            <Link href={'ADMIN/users/' + item.ownerId?._id} className="text-purple-600 underline">
                                                {item.ownerId?.name}
                                            </Link>
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>{item.body}</StyledTableCell><StyledTableCell align='center'>
                                            <Link href={'/products/' + item.productId?._id} className="text-purple-600 underline">
                                                {item.productId?.name}
                                            </Link>
                                        </StyledTableCell>
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
                                                                dispatch(setIsModalConfirmOpen(true));
                                                                dispatch(setSelectedId(item._id));
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
                                                            dispatch(setIsConfirmedTableOperating(!!validated));
                                                            dispatch(setIsModalDeleteOpen(true));
                                                            dispatch(setSelectedId(item._id));
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
                            <Pagination dir='ltr' color='info' variant='outlined' count={lastPage} page={currentPage} onChange={(_e, v) => handlePageClick(v, setPage, currentPage)} />
                        </div>
                    }

                </div>
                : <div>
                    اطلاعاتی جهت نمایش وجود ندارد
                </div>
        )}
    </Stack>
)

export default function CommentsTable({ validated }) {
    const dispatch = useDispatch();
    const {
        items,
        currentPage,
        lastPage,
        loading,
        error,
        itemsPerPage,
        itemsCount
    } = useSelector((state) => state.global);
    const {
        confirmedComments,
        currentPageConfirmedComments,
        lastPageConfirmedComments,
        loadingConfirmedComments,
        errorConfirmedComments,
        itemsPerPageConfirmedComments,
        itemsCountConfirmedComments,
        operatingError,
        selectedId
    } = useSelector((state) => state.comments);


    useEffect(() => {
        if (validated) {
            dispatch(getConfirmedCommentsFromServer({ page: currentPageConfirmedComments, perPage: itemsPerPageConfirmedComments }))
        }
    }, [dispatch, currentPageConfirmedComments, itemsPerPageConfirmedComments]);

    useEffect(() => {
        if (!validated) {
            dispatch(getInvalidatedCommentsFromServer({ page: currentPage, perPage: itemsPerPage }))
        }
    }, [dispatch, currentPage, itemsPerPage]);

    const handlePageClick = (page, setPage, current) => {
        if (current !== page) {
            dispatch(setPage(page))
        }
    }

    return (
        <>
            {
                !validated &&
                <>
                    <Component currentPage={currentPage} dispatch={dispatch} error={error} items={items} itemsCount={itemsCount} itemsPerPage={itemsPerPage} lastPage={lastPage} loading={loading} selectedId={selectedId} handlePageClick={handlePageClick} setPage={setCurrentPage} setIsModalConfirmOpen={setIsModalConfirmOpen} setIsModalDeleteOpen={setIsModalDeleteOpen} validated={false} operatingError={operatingError} />
                    <ModalConfirm />
                </>
            }
            {
                validated &&
                <Component currentPage={currentPageConfirmedComments} dispatch={dispatch} error={errorConfirmedComments} items={confirmedComments} itemsCount={itemsCountConfirmedComments} itemsPerPage={itemsPerPageConfirmedComments} lastPage={lastPageConfirmedComments} loading={loadingConfirmedComments} selectedId={selectedId} handlePageClick={handlePageClick} setPage={setCurrentPageConfirmedComments} setIsModalConfirmOpen={setIsModalConfirmOpen} setIsModalDeleteOpen={setIsModalDeleteOpen} validated={true} operatingError={operatingError} />
            }
            <ModalDelete />
        </>
    )
}

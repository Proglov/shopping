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
import { convertToFarsiNumbers } from '@/utils/funcs';
import Pagination from '../../Pagination'
import ModalDelete from './ModalDelete';
import ModalConfirm from './ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/reducers/global';
import { getInvalidatedSellersFromServer } from '../redux/globalAsyncThunks';
import { getConfirmedSellersFromServer, setSelectedId, setIsModalConfirmOpen, setIsModalDeleteOpen, setCurrentPageConfirmedSellers, setIsConfirmedTableOperating } from '../redux/reducers/sellers';



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

const CommonTable = ({ validated, itemsCount, error, loading, items, currentPage, itemsPerPage, selectedId, setCurrentPage, lastPage, dispatch, setIsModalConfirmOpen, setIsModalDeleteOpen, operatingError }) => (
    <Stack spacing={2} className={`${!!validated && 'mt-16'}`}>
        <div className='w-full text-start'>
            جدول فروشندگان های تایید {!!validated ? <></> : <>ن</>}شده
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
                                    <StyledTableCell align='center'>نام فروشگاه</StyledTableCell>
                                    <StyledTableCell align='center'>شماره همراه</StyledTableCell>
                                    <StyledTableCell align='center'>شماره فروشگاه</StyledTableCell>
                                    <StyledTableCell align='center'>عملیات</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => {
                                    if (item.validated === validated)
                                        return <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{convertToFarsiNumbers(index + 1 + itemsPerPage * (currentPage - 1))}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.name}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.storeName}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.phone}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.workingPhone}</StyledTableCell>
                                            <StyledTableCell className='border-b-0'>
                                                {selectedId === item._id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات</div>
                                                ) : (
                                                    <div className='flex flex-col gap-2'>
                                                        {!!validated ? <></> : <>
                                                            <Button
                                                                variant='outlined'
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
                                                            {operatingError}
                                                        </div>
                                                        <div>مشکلی پیش امده است. لطفا اتصال اینترنت را بررسی کنید</div>
                                                    </>
                                                ) : ''}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                })}
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

    </Stack>
)

export default function SellersTable({ validated }) {
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
        confirmedSellers,
        currentPageConfirmedSellers,
        lastPageConfirmedSellers,
        loadingConfirmedSellers,
        errorConfirmedSellers,
        itemsPerPageConfirmedSellers,
        itemsCountConfirmedSellers,
        operatingError,
        selectedId
    } = useSelector((state) => state.sellers);


    useEffect(() => {
        if (!validated)
            dispatch(getInvalidatedSellersFromServer({ page: currentPage, perPage: itemsPerPage }))
        else
            dispatch(getConfirmedSellersFromServer({ page: currentPageConfirmedSellers, perPage: itemsPerPageConfirmedSellers }))
    }, [dispatch]);


    return (
        <>
            {
                !validated &&
                <>
                    <CommonTable currentPage={currentPage} dispatch={dispatch} error={error} items={items} itemsCount={itemsCount} itemsPerPage={itemsPerPage} lastPage={lastPage} loading={loading} selectedId={selectedId} setCurrentPage={setCurrentPage} setIsModalConfirmOpen={setIsModalConfirmOpen} setIsModalDeleteOpen={setIsModalDeleteOpen} validated={false} operatingError={operatingError} />
                    <ModalConfirm />
                </>
            }
            {
                validated &&
                <CommonTable currentPage={currentPageConfirmedSellers} dispatch={dispatch} error={errorConfirmedSellers} items={confirmedSellers} itemsCount={itemsCountConfirmedSellers} itemsPerPage={itemsPerPageConfirmedSellers} lastPage={lastPageConfirmedSellers} loading={loadingConfirmedSellers} selectedId={selectedId} setCurrentPage={setCurrentPageConfirmedSellers} setIsModalConfirmOpen={setIsModalConfirmOpen} setIsModalDeleteOpen={setIsModalDeleteOpen} validated={true} operatingError={operatingError} />
            }
            <ModalDelete />
        </>
    )
}
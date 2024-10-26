"use client"
import { Pagination, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { setCurrentPage } from '../redux/reducers/global';
import { getCitiesFromServer } from '../redux/globalAsyncThunks';
import { getProvincesFromServer } from '../redux/reducers/cities';
import { StyledTableCell, StyledTableRow } from '../products/ProductsTable';



export default function CitiesTable() {
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

    useEffect(() => {
        dispatch(getCitiesFromServer({ currentPage, itemsPerPage }))
        dispatch(getProvincesFromServer())
    }, [currentPage, itemsPerPage, dispatch]);


    const handlePageClick = (page) => {
        if (currentPage !== page) {
            dispatch(setCurrentPage(page))
        }
    }

    return (
        <Stack spacing={2} className='mt-7'>
            <div className='w-full text-start'>
                جدول شهر ها
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
                        <TableContainer component={Paper} className='max-w-lg mx-auto'>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>ردیف</StyledTableCell>
                                        <StyledTableCell align='center'>نام</StyledTableCell>
                                        <StyledTableCell align='center'>استان</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + itemsPerPage * (currentPage - 1)}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.name}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.provinceId?.name}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {
                            itemsCount > itemsPerPage &&
                            <div className='flex justify-center' style={{ marginTop: '25px' }}>
                                <Pagination dir='ltr' color='info' variant='outlined' count={lastPage} page={currentPage} onChange={(_e, v) => handlePageClick(v)} />
                            </div>
                        }

                    </div>
                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}

        </Stack>
    );
}

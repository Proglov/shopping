"use client"
import { Stack } from '@mui/material';
import { useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Api from '@/services/withoutAuthActivities/categories';
import Pagination from '../../Pagination';
import { CategoriesContext } from './CategoriesMain';
import Image from 'next/image';


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


export default function CategoriesTable() {
    const { getAllCategories } = Api

    const {
        items,
        setItems,
        currentPage,
        setCurrentPage,
        lastPage,
        loading,
        setLoading,
        isError,
        setIsError,
        error,
        setError,
        itemsCount,
        setItemsCount,
        itemsPerPage,
        setLastPage
    } = useContext(CategoriesContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const categories = await getAllCategories({ page: currentPage, perPage: itemsPerPage });
                setItems(categories?.categories)
                setItemsCount(categories?.allCategoriesCount)
                setLastPage(Math.ceil(categories?.allCategoriesCount / itemsPerPage))
            } catch (error) {
                setError(`Error fetching categories: ${error}`);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, itemsPerPage, setError, setIsError, setItems, setItemsCount, setLoading, getAllCategories, setLastPage]);


    return (
        <Stack spacing={2} className='mt-7'>
            <div className='w-full text-start'>
                جدول دسته بندی ها
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
                            <Table sx={{ minWidth: 500 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>ردیف</StyledTableCell>
                                        <StyledTableCell align='center'>نام</StyledTableCell>
                                        <StyledTableCell align='center'>عکس</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + itemsPerPage * (currentPage - 1)}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.name}</StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {
                                                    !!item?.imageUrl &&
                                                    <Image alt={item.name} src={item.imageUrl} width={150} height={50} className='mx-auto' />
                                                }
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

        </Stack>
    );
}

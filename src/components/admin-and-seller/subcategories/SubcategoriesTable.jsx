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
import Api from '@/services/withoutAuthActivities/subcategories';
import Api2 from '@/services/withoutAuthActivities/categories';
import Pagination from '../../Pagination';
import { SubcategoriesContext } from './SubcategoriesMain';


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


export default function SubcategoriesTable() {
    const { getAllSubcategories } = Api
    const { getAllCategories } = Api2

    const {
        items,
        setItems,
        setCategories,
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
    } = useContext(SubcategoriesContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const subcategories = await getAllSubcategories({ page: currentPage, perPage: itemsPerPage });
                setItems(subcategories?.subcategories)
                setItemsCount(subcategories?.allSubcategoriesCount)
                setLastPage(Math.ceil(subcategories?.allSubcategoriesCount / itemsPerPage))

                const getCategories = await getAllCategories()
                setCategories(getCategories?.categories)
            } catch (error) {
                setError(`Error fetching subcategories: ${error}`);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, itemsPerPage, setError, setIsError, setItems, setItemsCount, setLoading, getAllSubcategories, setLastPage, setCategories]);


    return (
        <Stack spacing={2} className='mt-7'>
            <div className='w-full text-start'>
                جدول زیر دسته بندی ها
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
                                        <StyledTableCell align='center'>دسته بندی</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item._id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + itemsPerPage * (currentPage - 1)}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.name}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.categoryId?.name}</StyledTableCell>
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

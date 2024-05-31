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
import Api from '@/services/withAuthActivities/product';
import Pagination from './Pagination';
import { price2Farsi } from '@/utils/funcs';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import { ProductsContext } from './ProductsMain';


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


export default function ProductsTable() {
    const { getAllMyProducts } = Api

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
        isModalDeleteOpen,
        setIsModalDeleteOpen,
        isModalEditOpen,
        setIsModalEditOpen,
        selectedItem,
        setSelectedItem,
        itemsPerPage
    } = useContext(ProductsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const products = await getAllMyProducts({ page: currentPage, perPage: itemsPerPage });
                setItems(products?.products)
                setItemsCount(products?.allProductsCount)
            } catch (error) {
                setError(`Error fetching products: ${error}`);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, getAllMyProducts, itemsPerPage, setError, setIsError, setItems, setItemsCount, setLoading]);


    return (
        <Stack spacing={2} className='mt-10'>
            <span className='w-full text-start'>
                جدول محصولات
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
                                        <StyledTableCell align='center'>قیمت به حروف</StyledTableCell>
                                        <StyledTableCell align='center'>قیمت به عدد</StyledTableCell>
                                        <StyledTableCell align='center'>دسته بندی</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <StyledTableRow key={item.id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + itemsPerPage * (currentPage - 1)}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.name}</StyledTableCell>
                                            <StyledTableCell align='center'>{price2Farsi(item.price)} تومان</StyledTableCell>
                                            <StyledTableCell align='center'>{item.price}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.category}</StyledTableCell>
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
                                                                setSelectedItem({
                                                                    ...item,
                                                                })
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
                    selectedItem,
                    setOperatingID,
                    setOperatingError,
                    setItems
                }}>
                    <ModalEdit />
                </ModalEditContext.Provider>
            </>

        </Stack>
    );
}

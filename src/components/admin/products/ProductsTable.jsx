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
import { getAllProducts, getProductsCount } from '@/services/userActivities/product';
import Pagination from './Pagination';
import { price2Farsi } from '@/utils/funcs';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';


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
    const itemsPerPage = 20

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
        price: '',
        category: '',
        offPercentage: '',
        imagesUrl: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await getAllProducts({ page: currentPage, perPage: itemsPerPage });
                setItems(products.Products)
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };
        const fetchCount = async () => {
            try {
                setLoading(true);
                const count = await getProductsCount();
                setItemsCount(count.ProductsCount)
            } catch (error) {
                console.error('Error fetching products count:', error);
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
                                        <StyledTableCell align='center'>قیمت</StyledTableCell>
                                        <StyledTableCell align='center'>تخفیف</StyledTableCell>
                                        <StyledTableCell align='center'>قیمت نهایی</StyledTableCell>
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
                                            <StyledTableCell align='center'>{item.price}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.offPercentage}</StyledTableCell>
                                            <StyledTableCell align='center'>{price2Farsi(item.price * (1 - (item.offPercentage) / 100))} تومان</StyledTableCell>
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

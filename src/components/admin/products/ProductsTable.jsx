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
        imagesURL: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAArlBMVEUAAADdLQCUlJThLgCOjo7///+IGwCEGgDZAADcIADcJgDbGQDaDADcHwD88OzyyMSurq7m5ubjZ1fkcmXtqaL439s3Nzc/Pz/219P10czoiX7jbV5kZGTnhHqgoKBVVVXvsar66OX9+PVISEh6enrIyMi4uLgMDAzqlIrmemzxurQnJyfR0dGGhobgUT7iYFDhWEfePCHfSTPePybsoJbyv7ndNRfgTzjoiH3qkYYW2NJiAAAD8UlEQVR4nO3dC0/bSBiF4ZrydefmhJgYcoE0ybK7SUpzIQbK//9j+00S6AriNkeiNWbPIyEHA9L41czESBZ8+EBERERUc2dnVY+gRo6Oqh5BjRwfVz2CGmEsAGMBGAvAWADGAjAWgLEAjAVgLABjARgLwFgAxgIwFoCxAIwFYCwAYwEYC8BYAMYCMBaAsQCMBWAsAGMBGAvAWADGAjAWgLEAjHWws7PBgA9KHuhc1HnVo6iLIxE+VHqwVqvqEdTIORchEREREb2uTx9/gz+qvspX8ulj8ssxFmMx1g8xFoCxAIwFYCwAYwEYC8BYAMYCMBaAsQCMBWAsAGMBGAvAWADGAjAWgLEAe2I5mzqshrP6Uf4z7ziWmT9M+mHPpRtbEsPPxsZIJ/z/YvlufGq0sXCPk+XphfQ2tb6f3U0r52/F+NlkOx/3zLB3G8vk0vNh2ehrg0U/8UmSrdJs4TWC9IzTE/2Fd8kqc3fLmMW6fmZmYtz8JsnW2mq5fFGr7rEuHl88i2Uv5ZsuJ+edXcQZ1vOJtPU4skn8tDCTeJinU5lIV0va0zgNb3UZjrtGmj4J0k5LY12UjOaNG8jn7YtnseKK2mWTZjCFOI10uRpK4edS3NxlMjGhMzKn8WxcdDJa+4lorEbTDMXYnpTuWX+OTyq84jJXRz9z/JfI3//E730eq7mLpVMsy7K5TJ20jTMy0yn24MPteJ5lPdFY07if26ksbWI6m1hhLZems2ef38Y6Ebk+/unIvtYoVlrEq9ejTpdRo9EYaSzd13exbOjGs6OGrr77zY71TaeeTsdNLG9yXYrTl++ZbzrWAcqWoa6rxtoE014t5NQY49PkP7FMaEvQs0ZjzWMst9Rl6c14G0tn48PjKq7NMjxA2Qaf2Eyk2xzrO19XhpN8ZOKE2sQyMmpOUxkXxXgYdrF0BcqsaOxi6bfJ0JfGqu0G/+TFfZZdDfN8dq/va4Ue1y7Jpy4JncLa07zTT+9meV44l+X32zsE387z3qQbQlPfBX2R3+y5m637rcOTl3fwzofg4yWn22OIm1DQ+wEb4n29flVfu6dbfP3cprqpe7/5kX2/9LzjWK+PsRiLsX6IsQCMBWAsAGMBGAvAWADGAjAWgLEAjAVgLABjARgLwFgAxgIwFoCxAIwFYCwAYwH4RzCIiIjolxoMqh5BfXwR+VL1GGqjJcI/rnygi+tW67ruz4b+Pl/f4tPXbxX/LQOAsQCMBWAsAGMBGAvAWADGAjAWgLEAjAVgLABjARgLwFgAxgIwFoCxAIwFYCwAYwEYC8BYAMYCMBaAsQCMBWAsAGMBGAvAWADGAjAW4Oqq6hEQEREREVHt/QsEzk2fftvbSQAAAABJRU5ErkJggg==', 'data:image/png;base64,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']
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
                                        <StyledTableCell align='center'>دسته بندی</StyledTableCell>
                                        <StyledTableCell align='center'>تخفیف</StyledTableCell>
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
                                            <StyledTableCell align='center'>{item.category}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.offPercentage}</StyledTableCell>
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
                                                                setSelectedItem(prev => ({
                                                                    ...item,
                                                                    imagesURL: prev.imagesURL
                                                                }))
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
                        <div className='flex justify-center' style={{ marginTop: '25px' }}>
                            <PaginationContext.Provider value={{ lastPage: Math.ceil(itemsCount / itemsPerPage), currentPage, setCurrentPage }}>
                                <Pagination />
                            </PaginationContext.Provider>
                        </div>
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
                    selectedItem
                }}>
                    <ModalEdit />
                </ModalEditContext.Provider>
            </>

        </Stack>
    );
}

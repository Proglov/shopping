'use client'
import { Box, Pagination, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Api from "@/services/withAuthActivities/product";
import { convertToFarsiNumbers, formatPrice, price2Farsi } from "@/utils/funcs";
import { GradientCircularProgress } from "@/app/loading";
import { StyledTableCell, StyledTableRow } from "@/components/admin-and-seller/products/ProductsTable";


export default function SellerProducts({ id }) {
    const { getAllProductsOfASeller } = Api
    const [initialLoading, setInitialLoading] = useState(true)
    const [products, setProducts] = useState([])
    const perPage = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [productsCount, setProductsCount] = useState(1);


    const handlePageClick = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page)
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            setInitialLoading(true);
            try {
                const response = await getAllProductsOfASeller({ page: currentPage, perPage, id });
                setProducts(response?.products)
                setProductsCount(response?.allProductsCount)
            } catch (error) {
                console.error(error);
            } finally {
                setInitialLoading(false);
            }
        };
        fetchProducts(currentPage, perPage);
    }, [currentPage, perPage]);


    return (
        <Box className="shadow-lg shadow-slate-400 w-full max-w-5xl mx-auto md:mt-2 p-5" sx={{ border: 'unset' }}>
            {initialLoading ?
                <Box className='w-full text-center mt-3'>
                    <GradientCircularProgress />
                </Box>
                :
                <Box className='flex flex-col gap-3'>
                    {
                        products.length === 0 ?
                            <span className="text-center">این فروشنده تاکنون محصولی وارد نکرده است!</span>
                            :
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align='center'>ردیف</StyledTableCell>
                                            <StyledTableCell align='center'>نام</StyledTableCell>
                                            <StyledTableCell align='center'>قیمت به حروف</StyledTableCell>
                                            <StyledTableCell align='center'>قیمت به عدد</StyledTableCell>
                                            <StyledTableCell align='center'>دسته بندی</StyledTableCell>
                                            <StyledTableCell align='center'>زیر دسته بندی</StyledTableCell>
                                            <StyledTableCell align='center'>موجود</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((item, index) => (
                                            <StyledTableRow key={item._id}
                                                className='align-middle'>
                                                <StyledTableCell align='center'>{index + 1 + perPage * (currentPage - 1)}</StyledTableCell>
                                                <StyledTableCell align='center'>{item.name}</StyledTableCell>
                                                <StyledTableCell align='center'>{price2Farsi(item.price)} تومان</StyledTableCell>
                                                <StyledTableCell align='center'>{formatPrice(item.price)}</StyledTableCell>
                                                <StyledTableCell align='center'>{item.subcategoryId?.categoryId.name}</StyledTableCell>
                                                <StyledTableCell align='center'>{item.subcategoryId?.name}</StyledTableCell>
                                                <StyledTableCell align='center'>
                                                    <div style={{ width: '20px', height: '20px' }} className={`${item?.available ? 'bg-green-400' : 'bg-red-400'} rounded-full mx-auto`} />
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    }


                    {
                        productsCount > perPage &&
                        <div className='flex justify-center' style={{ marginTop: '25px' }}>
                            <Pagination dir='ltr' color='info' variant='outlined' count={Math.ceil(productsCount / perPage)} page={currentPage} onChange={(_e, v) => handlePageClick(v)} />
                        </div>
                    }

                </Box>
            }
        </Box>
    );
}
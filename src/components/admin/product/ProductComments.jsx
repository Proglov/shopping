'use client'
import { Box, Pagination, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Api from "@/services/withoutAuthActivities/comment";
import { convertToFarsiNumbers } from "@/utils/funcs";
import { GradientCircularProgress } from "@/app/loading";
import { StyledTableCell, StyledTableRow } from "@/components/admin-and-seller/products/ProductsTable";


export default function ProductComments({ id }) {
    const { getCommentsOfAProductForSeller } = Api
    const [initialLoading, setInitialLoading] = useState(true)
    const [comments, setComments] = useState([])
    const perPage = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [commentsCount, setCommentsCount] = useState(1);


    const handlePageClick = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page)
        }
    }

    useEffect(() => {
        const fetchComments = async () => {
            setInitialLoading(true);
            try {
                const response = await getCommentsOfAProductForSeller({ page: currentPage, perPage, id });
                console.log(response);
                setComments(response?.comments)
                setCommentsCount(response?.allCommentsCount)
            } catch (error) {
                console.error(error);
            } finally {
                setInitialLoading(false);
            }
        };
        fetchComments(currentPage, perPage);
    }, [currentPage, perPage]);


    return (
        <Box className="shadow-lg shadow-slate-400 w-full max-w-lg mx-auto md:mt-2 p-5" sx={{ border: 'unset' }}>
            {initialLoading ?
                <Box className='w-full text-center mt-3'>
                    <GradientCircularProgress />
                </Box>
                :
                <Box className='flex flex-col gap-3'>
                    {
                        comments.length === 0 ?
                            <span className="text-center">این محصول تاکنون نظری دریافت نکرده است!</span>
                            :
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align='center'>ردیف</StyledTableCell>
                                            <StyledTableCell align='center'>متن ارسال شده</StyledTableCell>
                                            <StyledTableCell align='center'>وضعیت</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {comments.map((item, index) => (
                                            <StyledTableRow key={item._id}
                                                className='align-middle'>
                                                <StyledTableCell align='center'>{convertToFarsiNumbers(index + 1 + perPage * (currentPage - 1))}</StyledTableCell>
                                                <StyledTableCell align='center'>{item.body}</StyledTableCell>
                                                <StyledTableCell>
                                                    <div className={`mx-auto w-4 h-4 ${item?.validated ? 'bg-green-500' : 'bg-red-600'}  rounded-full`}></div>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    }


                    {
                        commentsCount > perPage &&
                        <div className='flex justify-center' style={{ marginTop: '25px' }}>
                            <Pagination dir='ltr' color='info' variant='outlined' count={Math.ceil(commentsCount / perPage)} page={currentPage} onChange={(_e, v) => handlePageClick(v)} />
                        </div>
                    }

                </Box>
            }
        </Box>
    );
}
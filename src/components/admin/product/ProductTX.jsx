"use client";
import { Box, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Api from "@/services/withAuthActivities/tx";
import { convertToFarsiNumbers, dayOfWeek, formatPrice, iranianCalendar, price2Farsi } from "@/utils/funcs";
import Link from "next/link";
import { GradientCircularProgress } from "@/app/loading";

const TransactionComponent = ({ transaction, txStatuses, which }) => (
    <Box className='flex flex-col text-start justify-start gap-2 shadow-lg shadow-slate-400 p-3 rounded-lg'>

        <Box>
            <Typography>
                کالا
                {
                    transaction?.boughtProducts.length > 1 &&
                    "ها"
                }
                ی این تراکنش
                <span className="text-red-600">:</span>
            </Typography>
            <Box className='mr-5 border-r-2 pr-3 mt-2 p-1 border-green-300'>
                {
                    transaction?.boughtProducts.map((product, i) => (
                        <Box key={i}>
                            <Link href={(which === 'Seller' ? '/Seller' : '/ADMIN') + '/products/' + product?.productId._id}>
                                <span dir="rtl" className="text-purple-950 underline">{product.productId.name}</span>
                            </Link>
                            <span className="text-red-600">،</span>
                            {" "}
                            <span>{product.quantity}</span>
                            {" "}
                            <span>عدد</span>
                        </Box>
                    ))
                }
            </Box>
        </Box>

        <Box className='flex gap-x-2'>
            <span>
                زمان ارسال
                <span className="text-red-600">:</span>
            </span>

            <span>
                {
                    !!transaction?.shouldBeSentAt &&
                    <>
                        <span className='ml-1'>{iranianCalendar(new Date(parseInt(transaction?.shouldBeSentAt)))}</span>
                        <span className='ml-1'>{dayOfWeek((new Date(parseInt(transaction?.shouldBeSentAt))).getDay())}</span>
                        <span className='mx-1'>ساعت</span>
                        {convertToFarsiNumbers(new Date(parseInt(transaction?.shouldBeSentAt)).getHours())}
                        <span className="text-red-500">:</span>
                        {convertToFarsiNumbers("00")}
                    </>
                }
            </span>

        </Box>

        <Box className='flex gap-x-2'>
            <Box>
                زمان خریداری شده
                <span className="text-red-600">:</span>
            </Box>
            <Box>
                {
                    transaction?.createdAt !== '' && transaction?.createdAt != null &&
                    <Box className='flex gap-3'>
                        <span>
                            {new Intl.DateTimeFormat('fa-IR').format(parseInt(new Date(transaction?.createdAt).getTime()))}
                        </span>

                        <span dir='ltr'>
                            ساعت &nbsp;
                            {convertToFarsiNumbers((new Date(transaction?.createdAt).getHours()))}
                            <span className="text-red-600">:</span>
                            {convertToFarsiNumbers(("0" + (new Date((transaction?.createdAt)).getMinutes())).slice(-2))}
                        </span>

                    </Box>
                }

            </Box>
        </Box>

        {
            !!transaction?.totalDiscount &&
            <Box className='my-1'>
                <span >تخفیف</span>
                <span className="text-red-500 ml-1">:</span>
                {convertToFarsiNumbers(formatPrice((transaction?.totalDiscount).toString()))}
                {" "}
                <span className="text-gray-600">تومان</span>
            </Box>
        }

        <Box>
            <Box className='flex gap-x-2'>
                <span>
                    قیمت نهایی
                    <span className="text-red-600">:</span>
                </span>
                <span>
                    {formatPrice(transaction.totalPrice)}
                    <span className="text-gray-600 mx-1">تومان</span>

                </span>
            </Box>

            <span className="text-sm text-gray-600 ml-1">{price2Farsi(transaction.totalPrice)}</span>
            <span className="text-gray-600 text-sm">تومان</span>

        </Box>

        <Box className='flex gap-x-2'>
            <span>
                وضعیت ارسال
                <span className="text-red-600">:</span>
            </span>

            <span className={txStatuses[transaction.status]?.color || ''}>
                {txStatuses[transaction.status]?.name}
            </span>
        </Box>
    </Box>
)

export default function ProductTX({ id, which }) {
    const { getAllTransActionsOfAProduct } = Api
    const [initialLoading, setInitialLoading] = useState(true)
    const [transactions, setTransactions] = useState([])
    const perPage = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsCount, setTransactionsCount] = useState(1);


    const handlePageClick = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page)
        }
    }

    useEffect(() => {
        const fetchTransactions = async () => {
            setInitialLoading(true);
            try {
                const response = await getAllTransActionsOfAProduct({ page: currentPage, perPage, id });
                setTransactions(response?.transactions)
                setTransactionsCount(response?.transactionsCount)
            } catch (error) {
                console.error(error);
            } finally {
                setInitialLoading(false);
            }
        };
        fetchTransactions(currentPage, perPage);
    }, [currentPage, perPage]);


    const txStatuses = {
        Requested: {
            name: 'در انتظار ارسال',
            color: 'text-yellow-600',
        },
        Sent: {
            name: 'به دست پیک رسیده',
            color: 'text-blue-500',
        },
        Received: {
            name: 'دریافت شده',
            color: 'text-green-500'
        },
        Canceled: {
            name: 'کنسل شده',
            color: 'text-red-500'
        }
    }

    return (
        <Box className="shadow-lg shadow-slate-400 w-full max-w-lg mx-auto md:mt-2 p-5" sx={{ border: 'unset' }}>
            {initialLoading ?
                <Box className='w-full text-center mt-3'>
                    <GradientCircularProgress />
                </Box>
                :
                <Box className='flex flex-col gap-3'>
                    {
                        transactions.length === 0 ?
                            <span className="text-center">این محصول تاکنون در هیچ سفارشی نبوده است!</span>
                            :
                            transactions.map((transaction, index) => (
                                <TransactionComponent key={index} which={which} transaction={transaction} txStatuses={txStatuses} />
                            ))
                    }

                    {
                        transactionsCount > perPage &&
                        <div className='flex justify-center' style={{ marginTop: '25px' }}>
                            <Pagination dir='ltr' color='info' variant='outlined' count={Math.ceil(transactionsCount / perPage)} page={currentPage} onChange={(_e, v) => handlePageClick(v)} />
                        </div>
                    }

                </Box>
            }
        </Box>
    );
}

"use client";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Api from "@/services/withAuthActivities/tx";
import { convertToFarsiNumbers, price2Farsi } from "@/utils/funcs";
import Link from "next/link";

export default function MyTX() {
    const { getAllMyTXsUser } = Api
    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState([])

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
            name: 'دریافت کردید',
            color: 'text-green-500'
        },
        Canceled: {
            name: 'کنسل شده',
            color: 'text-red-500'
        }
    }

    useEffect(() => {
        const GetTransactions = async () => {
            try {
                const response = await getAllMyTXsUser({});
                setTransactions(response?.transactions)
            } catch (error) { } finally { setLoading(false) }
        };
        GetTransactions();
    }, []);

    return (
        <Box className="shadow-lg shadow-slate-400 w-full max-w-lg mx-auto md:mt-2 p-5" sx={{ border: 'unset' }}>
            {loading ? <>لطفا منتظر بمانید ...</>
                :
                <Box className='flex flex-col gap-3'>
                    <Box className='text-center text-blue-700'>
                        سفارشات من
                    </Box>
                    {
                        transactions.length === 0 ?
                            <span className="text-center">تاکنون سفارشی نداده اید!</span>
                            :
                            transactions.map((transaction, index) => (
                                <Box key={index} className='flex flex-col gap-2 shadow-lg shadow-slate-400 p-3 rounded-lg'>

                                    <Box>
                                        <Typography>
                                            کالا
                                            {
                                                transaction?.boughtProducts.length > 1 &&
                                                "های "
                                            }
                                            شما
                                            <span className="text-red-600">:</span>
                                        </Typography>
                                        <Box className='mr-5'>
                                            {
                                                transaction?.boughtProducts.map((product, i) => (
                                                    <Box key={i}>
                                                        <Link href={'/products/' + product?.productId._id}>
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
                                                    {new Intl.DateTimeFormat('fa-IR').format(parseInt(transaction?.shouldBeSentAt))}
                                                    &nbsp;&nbsp;
                                                    ساعت
                                                    {" "}
                                                    {convertToFarsiNumbers((new Date(parseInt(transaction.shouldBeSentAt)).getHours()))}
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
                                                        :{convertToFarsiNumbers(("0" + (new Date((transaction?.createdAt)).getMinutes())).slice(-2))}
                                                    </span>

                                                </Box>
                                            }

                                        </Box>
                                    </Box>


                                    <Box className='flex gap-x-2'>
                                        <span>
                                            قیمت نهایی
                                            <span className="text-red-600">:</span>
                                        </span>
                                        <span>
                                            {price2Farsi(transaction.totalPrice)}
                                            تومان
                                        </span>

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
                            ))
                    }
                </Box>
            }
        </Box>
    );
}

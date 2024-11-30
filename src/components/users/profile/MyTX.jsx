"use client";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Api from "@/services/withAuthActivities/tx";
import { convertToFarsiNumbers, dayOfWeek, formatPrice, iranianCalendar, price2Farsi } from "@/utils/funcs";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { GradientCircularProgress } from "@/app/loading";
import ModalCancel from "./ModalCancel";

const TransactionComponent = ({ transaction, txStatuses, setSelectedItem, setIsModalCancelOpen }) => (
    <Box className='flex flex-col gap-2 shadow-lg shadow-slate-400 p-3 rounded-lg'>

        <Box>
            <Typography>
                کالا
                {
                    transaction?.boughtProducts.length > 1 &&
                    "ها"
                }
                ی شما
                <span className="text-red-600">:</span>
            </Typography>
            <Box className='mr-5 border-r-2 pr-3 mt-2 p-1 border-green-300'>
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

            <span className="text-sm text-gray-600">{price2Farsi(transaction.totalPrice)}</span>
            <span className="text-gray-600 text-sm">تومان</span>

        </Box>


        {
            !!transaction?.totalDiscount &&
            <Box className='my-1'>
                <span >سود شما از این خرید</span>
                <span className="text-red-500 ml-1">:</span>
                {convertToFarsiNumbers(formatPrice((transaction?.totalDiscount).toString()))}
                {" "}
                <span className="text-gray-600">تومان</span>
            </Box>
        }

        <Box className='flex gap-x-2'>
            <span>
                وضعیت ارسال
                <span className="text-red-600">:</span>
            </span>

            <span className={txStatuses[transaction.status]?.color || ''}>
                {txStatuses[transaction.status]?.name}
            </span>
        </Box>

        {
            transaction.status === 'Canceled' &&
            <Box className='w-full mx-auto text-start text-red-500'>
                این سفارش توسط
                {
                    transaction?.canceled?.canceledBy === 'user' ? ' شما ' : ' فروشنده '
                }
                کنسل شده است و علت آن
                {' "'}
                {transaction?.canceled?.reason}
                {'" '}
                بیان شده است
                <br />
                در صورت بروز هرگونه اشتباه، با پشتیبانی تماس بگیرید
            </Box>
        }

        {
            transaction.status === 'Requested' &&
            <Box className='w-full mx-auto text-center'>
                <Button variant="outlined" color="error" size="small" onClick={() => {
                    setSelectedItem(transaction);
                    setIsModalCancelOpen(true)
                }}>
                    کنسل کردن
                </Button>
            </Box>
        }

    </Box>
)

export default function MyTX() {
    const { getAllMyTXsUser } = Api
    const { ref, inView } = useInView();
    const [transactions, setTransactions] = useState([])
    const perPage = 10;

    const [currentPage, setCurrentPage] = useState(2);
    const [isFinished, setIsFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);

    const fetchTransactions = async (page) => {
        setLoading(true);

        try {
            const response = await getAllMyTXsUser({ page, perPage });
            setTransactions((prev) => [...prev, ...response?.transactions])
            if (!response?.transactions?.length) setIsFinished(true);
            setCurrentPage(page + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelSuccess = (id, reason) => {
        setTransactions((prev) =>
            prev.map((transaction) =>
                transaction._id === id
                    ? { ...transaction, status: 'Canceled', canceled: { canceledBy: 'user', reason } }
                    : transaction
            )
        );
    };

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            fetchTransactions(1);
        }

        return () => {
            isMounted = false
        }
    }, []);

    useEffect(() => {
        if (inView && !isFinished) {
            fetchTransactions(currentPage);
        }
    }, [inView, currentPage, isFinished]);


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

    return (
        <Box className="shadow-lg shadow-slate-400 w-full max-w-lg mx-auto md:mt-2 p-5" sx={{ border: 'unset' }}>
            {
                loading ?
                    <div className="w-full text-center">
                        <GradientCircularProgress />
                    </div>
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
                                    <TransactionComponent key={index} transaction={transaction} txStatuses={txStatuses} setSelectedItem={setSelectedItem} setIsModalCancelOpen={setIsModalCancelOpen} />
                                ))
                        }

                        <Box className='w-full text-center mt-3' ref={ref}>
                            {!isFinished && <GradientCircularProgress />}
                        </Box>
                    </Box>
            }

            <ModalCancel isModalCancelOpen={isModalCancelOpen} setIsModalCancelOpen={setIsModalCancelOpen} selectedItem={selectedItem} onCancelSuccess={handleCancelSuccess} />

        </Box>
    );
}

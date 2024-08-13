'use client'
import { useEffect, useState } from 'react'
import Api from "@/services/withAuthActivities/tx"
import { Box, Card, Typography } from '@mui/material'
import { convertToFarsiNumbers, formatPrice, iranianCalendar } from '@/utils/funcs'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LastFactor({ id }) {
    const { getOneTX } = Api
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [transaction, setTransaction] = useState(true)

    useEffect(() => {
        const getTransactions = async () => {
            try {
                setLoading(true)
                const response = await getOneTX({ id })
                setTransaction(response?.transaction)
                setLoading(false)
            } catch (error) {
                router.push("/not-found")
            }
        }

        getTransactions()
    }, [])

    return (
        <Card className="p-5 m-5 rounded-md max-w-xl mx-auto">
            <Box sx={{
                marginBottom: {
                    xs: "-15px",
                    sm: "-14px",
                    md: "-19px",
                    lg: "-24px",
                    xl: "-27px",
                }
            }}>
                <Typography
                    className="top-2 relative"
                    sx={{
                        border: '1px solid rgb(209,213,219)',
                        transform: "translateY(15px)",
                        borderTopWidth: "2px",
                        borderTopRightRadius: "50%",
                        borderTopLeftRadius: "50%",
                    }}
                />
                <Typography
                    sx={{
                        zIndex: "100",
                        position: "relative",
                        width: {
                            xs: "160px",
                            sm: "180px",
                            md: "190px",
                            lg: "200px",
                            xl: "220px",
                        },
                        fontSize: {
                            xs: "17px",
                            sm: "18px",
                            md: "20px",
                            lg: "22px",
                            xl: "24px",
                        },
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                    className="bg-white m-2 md:mt-1 flex justify-center mx-auto"
                >
                    <LiaFileInvoiceDollarSolid className="mt-1 text-cyan-500 ml-1" />
                    <span className="mr-1"
                    >
                        فاکتور خرید شما

                    </span>
                </Typography>
            </Box>

            <Box className='mt-6 md:mt-7 lg:mt-8 xl:mt-9'>
                {
                    loading ? <>لطفا کمی صبر کنید ...</>
                        :
                        <>
                            <Box className='text-lg my-1'>
                                <span className="text-lg md:text-xl">آدرس تحویل سفارش</span>
                                <span className="text-red-500 ml-1">:</span>
                                <span>{transaction?.address}</span>
                            </Box>
                            <Box className='flex items-baseline text-lg my-1'>
                                <span className="text-lg md:text-xl">زمان ارسال</span>
                                <span className="text-red-500 ml-1">:</span>
                                <Typography>
                                    <span className='ml-1'>{iranianCalendar(new Date(parseInt(transaction?.shouldBeSentAt)))}</span>
                                    <span className='mx-1'>ساعت</span>
                                    {convertToFarsiNumbers(new Date(parseInt(transaction?.shouldBeSentAt)).getHours())}
                                    <span className="text-red-500 ml-1">:</span>
                                    {convertToFarsiNumbers("00")}
                                </Typography>

                            </Box>
                            <Box className='text-lg my-1'>
                                <span className="text-lg md:text-xl">مبلغ کل</span>
                                <span className="text-red-500 ml-1">:</span>
                                {convertToFarsiNumbers(formatPrice((transaction?.totalPrice).toString()))}
                                {" "}
                                <span className="text-lg text-gray-600">تومان</span>
                            </Box>
                            <Box className='text-lg mt-3'>
                                <span className="text-lg md:text-xl">
                                    کالاهای خریداری شده
                                </span>
                                <span className="text-red-500 ml-1">:</span>
                                <Box className='mt-2 mr-4 flex-col gap-2'>
                                    {
                                        transaction?.boughtProducts.map(({ productId, quantity }) => (
                                            <Typography key={productId._id} className='flex items-baseline text-lg'>
                                                <Link href={'/products/' + productId._id}>
                                                    <span className='underline text-purple-950'>
                                                        {
                                                            productId?.name
                                                        }
                                                    </span>
                                                </Link>
                                                <span className="text-red-500 ml-1">،</span>
                                                <span className='ml-1'>{convertToFarsiNumbers(quantity)}</span>
                                                <span className='text-sm'>عدد</span>
                                            </Typography>
                                        ))
                                    }
                                </Box>
                            </Box>

                            <Box className='mt-5 text-center'>
                                کاربر گرامی! سفارشات خود را از صفحه ی
                                {" "}
                                <Link href='/users/profile?tab=myTX' className='text-purple-500 underline underline-offset-8'>
                                    پروفایل
                                </Link>
                                {" "}
                                پیگیری کنید!
                            </Box>
                        </>
                }
            </Box>
        </Card>
    )
}

'use client'
import { useEffect, useState } from 'react'
import Api from '@/services/withoutAuthActivities/seller';
import { Grid } from '@mui/material';

export default function Info() {
    const { getMeSeller } = Api
    const [sellerInfo, setSellerInfo] = useState({})
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sellerRes = await getMeSeller();
                // if (!!sellerRes?.seller) {
                //     throw new Error(sellerRes?.message)
                // }
                setSellerInfo(sellerRes?.seller)
            } catch (error) {
                setError(error);
                setIsError(true);
                console.log(error);
                console.log(isError);
            } finally {
                setLoading(false);
            }
        };
        setLoading(true);
        fetchData();
    }, [getMeSeller, isError]);

    return (
        <div className='border border-gray-200 shadow-lg rounded-br-2xl rounded-tl-2xl md:p-3 md:mt-2 py-2'>
            <h2 className='text-center text-[13px] sm:text-base text-sky-500'>
                مشخصات فروشگاه شما
            </h2>
            <div className='text-center text-[13px] sm:text-base'>
                {
                    loading ? <>صبر کنید ...</> :
                        isError ? <>{error}</>
                            :
                            <Grid container rowGap={1}>
                                <Grid item xs={6} className='border-b-2 border-purple-100'>
                                    مدیر فروشگاه
                                </Grid>
                                <Grid item xs={6} className='border-b-2 border-purple-100'>
                                    {sellerInfo?.name}
                                </Grid>
                                <Grid item xs={6} className='border-b-2 border-purple-100'>
                                    نام فروشگاه
                                </Grid>
                                <Grid item xs={6} className='border-b-2 border-purple-100'>
                                    {sellerInfo?.storeName}
                                </Grid>
                                <Grid item xs={6} className='border-b-2 border-purple-100'>
                                    توضیحات
                                </Grid>
                                <Grid item xs={6} className='border-b-2 border-purple-100'>
                                    {sellerInfo?.bio}
                                </Grid>
                                <Grid item xs={6} className='border-b-2 border-purple-100'>
                                    تلفن
                                </Grid>
                                <Grid item xs={6} className='border-b-2 border-purple-100'>
                                    {sellerInfo?.phone}
                                </Grid>
                                <Grid item xs={6}>
                                    وضعیت فروشگاه
                                </Grid>
                                <Grid item xs={6}>
                                    {sellerInfo?.validated && <span className='text-green-500'>فعال</span>}
                                    {!sellerInfo?.validated && <span className='text-red-600'>غیر فعال</span>}
                                </Grid>
                            </Grid>
                }
            </div>
        </div>
    )
}

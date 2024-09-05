'use client'
import Api from '@/services/withoutAuthActivities/discounts/festivals'
import { useInView } from 'react-intersection-observer';
import FestivalCropsComponent from '../home/FestivalCropsComponent';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { GradientCircularProgress } from '@/app/loading';

export default function FestivalsMain() {
    const { GetAllFestivalProducts } = Api;
    const { ref, inView } = useInView();
    const perPage = 20;

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(2);
    const [isFinished, setIsFinished] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async (page) => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await GetAllFestivalProducts({ page, perPage });
            console.log(response);
            setProducts((prev) => [...prev, ...response?.products]);
            if (!response?.products?.length) setIsFinished(true);
            setCurrentPage(page + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        if (isMounted)
            fetchProducts(1);

        return () => {
            isMounted = false
        }
    }, []);

    useEffect(() => {
        if (inView && !isFinished) {
            fetchProducts(currentPage);
        }
    }, [inView, currentPage, isFinished]);

    return (
        <Box className="mt-6">

            <Typography className='text-center mb-4 text-slate-900' sx={{ textShadow: '0px 0px 5px red' }}>
                پیشنهاد های شگفت انگیز شما
            </Typography>

            <Box className="flex flex-wrap justify-evenly gap-y-5 gap-x-2">
                {products?.map((item) => (
                    <Box key={item._id} className='border-2 rounded-lg'>
                        <FestivalCropsComponent productId={item?.productId} name={item?.name} offPercentage={item?.offPercentage} price={item?.price} sellerId={item?.sellerId} src={item?.imageUrl || '/img/no-pic.png'} />
                    </Box>
                ))}
            </Box>

            <Box className='w-full text-center mt-3' ref={ref}>
                {!isFinished && <GradientCircularProgress />}
            </Box>
        </Box>
    );
}

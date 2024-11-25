'use client'
import { Button, Grid, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import PopularCropsComponent from './PopularCropsComponent'
import Api from '@/services/withoutAuthActivities/product'
import { ImFire } from "react-icons/im";


export default function PopularCrops() {
    const { getPopularProducts } = Api
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                setLoading(true)
                const response = await getPopularProducts()
                const resProducts = response?.products || []

                //set the length to 12 if it isn't
                while (resProducts.length < 12 && resProducts.length > 0) {
                    resProducts.push(resProducts.at(-1))
                }

                setProducts(resProducts);
            } catch (error) { } finally { setLoading(false) }
        }

        fetchPopularProducts();
    }, [])


    return (
        <div className='m-4 mt-12'>

            <div className='border border-gray-300 top-3 relative' style={{ transform: 'translateY(15px)', borderTopWidth: '2px', borderTopRightRadius: '50%', borderTopLeftRadius: '50%' }}></div>
            {/* پرفروش ترین کالاها */}
            <div>
                <Typography
                    sx={{
                        zIndex: '100',
                        position: 'relative',
                        width: {
                            sm: '30%',
                            md: '30%',
                            lg: '25%'
                        },
                        fontSize: {
                            xs: '20px',
                            sm: '16px',
                            md: '20px',
                            lg: '24px',
                            xl: '30px'
                        },
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                    className='bg-slate-100 m-2 flex justify-center mx-auto'>
                    <ImFire className='mt-1 text-orange-600' />
                    <span className='mx-2'>پرفروش ترین کالاها</span>
                </Typography>
            </div>

            {
                loading ?
                    <div className="flex gap-2 justify-center overflow-x-hidden w-max mb-3">
                        {
                            Array.from({ length: 12 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    sx={{ bgcolor: 'grey.300' }}
                                    variant="rectangular"
                                    width={250}
                                    height={350}
                                />
                            ))
                        }
                    </div>
                    :
                    <Grid container className='flex'>
                        {
                            showMore ?
                                products.map((product, i) =>
                                    <Grid key={product._id + i} item xs={12} sm={6} md={4}>
                                        <PopularCropsComponent href={'/products/' + product._id} name={product.name} src={product?.imagesUrl[0] || '/img/no-pic.png'} number={i + 1} />
                                    </Grid>
                                )
                                :
                                products.slice(0, 6).map((product, i) =>
                                    <Grid key={product._id + i} item xs={12} sm={6} md={4}>
                                        <PopularCropsComponent href={'/products/' + product._id} name={product.name} src={product?.imagesUrl[0] || '/img/no-pic.png'} number={i + 1} />
                                    </Grid>
                                )

                        }

                        {
                            !showMore &&
                            <Button onClick={() => setShowMore(true)}>
                                نمایش موارد بیشتر ...
                            </Button>
                        }

                    </Grid>
            }

        </div>
    )
}

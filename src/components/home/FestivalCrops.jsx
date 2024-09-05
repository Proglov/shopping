'use client'
import { useEffect, useState } from "react"
import FestivalCropsComponent from "./FestivalCropsComponent"
import { Skeleton } from "@mui/material"
import Api from '@/services/withoutAuthActivities/discounts/festivals'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import '@/styles/Swiper.css'
import SliderWrapper from "../SliderWrapper"
import Link from "next/link"



const Plate = ({ children, classNameProp, isLoading }) =>
    <div className={`${classNameProp} min-w-[360px] m-4 rounded-xl overflow-x-hidden`} style={{ background: 'linear-gradient(to left top, #ff0000 10%, #541a1a 90%)', boxShadow: '0 7px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)' }}>

        <div className="relative p-2 text-slate-50">
            <div className="text-center p-2 text-slate-50" style={{ textShadow: '0px 0px 10px white' }}>پیشنهادهای شگفت انگیز</div>
            <Link href={'/festivals'} className="absolute left-0 top-2 p-2 text-xs underline decoration-blue-400 hover:text-purple-500">مشاهده بیشتر</Link>
        </div>

        {
            isLoading ?
                <>
                    <div className="flex gap-2 justify-center overflow-x-hidden w-max mb-3">
                        {
                            Array.from({ length: 10 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    sx={{ bgcolor: 'grey.500' }}
                                    variant="rectangular"
                                    width={250}
                                    height={350}
                                />
                            ))
                        }
                    </div>
                </>
                :
                <>
                    {children}
                </>
        }

    </div >

export default function FestivalCrops() {
    const { GetAllFestivalProducts } = Api
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            initial: 0,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            created() {
                setLoaded(true)
            },
            loop: true,
            slides: { perView: "auto", spacing: '-12' },
        },
        [
            (slider) => {
                let timeout
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 2000)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    )

    useEffect(() => {
        const getProducts = async () => {
            const res = await GetAllFestivalProducts({ page: 1, perPage: 10 })
            setProducts(res?.products)
            setIsLoading(false)
        }
        getProducts()
    }, [])

    const getComponentProps = (product) => ({
        src: product?.imageUrl || '/img/no-pic.png',
        name: product?.name,
        price: product?.price,
        offPercentage: product?.offPercentage,
        productId: product.productId,
        sellerId: product.sellerId
    });

    const breakPoints = {
        xs: products.length >= 3,
        sm: products.length >= 4,
        md: products.length >= 5,
        lg: products.length >= 6,
        xl: products.length >= 7,
        '2xl': products.length >= 8
    }

    return (
        <SliderWrapper Component={FestivalCropsComponent} breakPoints={breakPoints} array={products} componentProps={getComponentProps} currentSlide={currentSlide} instanceRef={instanceRef} loaded={loaded} sliderRef={sliderRef} isLoading={isLoading} Plate={Plate} />
    )
}
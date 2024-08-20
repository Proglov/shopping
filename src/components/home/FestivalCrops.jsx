'use client'
import { useEffect, useState } from "react"
import FestivalCropsComponent from "./FestivalCropsComponent"
import { Button, Skeleton } from "@mui/material"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import Api from '@/services/withoutAuthActivities/discounts/festivals'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import '@/styles/Swiper.css'


function Arrow(props) {
    return (
        <Button
            sx={{ zIndex: 1000 }}
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"}`}
        >
            {!!props.left && (
                <MdOutlineKeyboardArrowLeft className='text-6xl text-blue-500' />
            )}
            {!!props.right && (
                <MdOutlineKeyboardArrowRight className='text-6xl text-blue-500' />
            )}
        </Button>
    )
}

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


    return (
        <div className="m-4 rounded-xl overflow-x-hidden" style={{ background: 'linear-gradient(to left top, #ff0000 10%, #541a1a 90%)', boxShadow: '0 7px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)' }}>
            <div className="text-center p-2 text-slate-50" style={{ textShadow: '0px 0px 10px white' }}>پیشنهادهای شگفت انگیز</div>

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
                        <div className="navigation-wrapper">
                            {loaded && instanceRef.current && (
                                <Arrow
                                    right={true}
                                    onClick={(e) =>
                                        e.stopPropagation() || instanceRef.current?.next()
                                    }
                                />
                            )}
                            <div ref={sliderRef} className="keen-slider">
                                {products.map(product => (
                                    <div className="keen-slider__slide sm:min-w-64 min-w-52" key={product?._id}>
                                        <FestivalCropsComponent src={product?.imageUrl || '/img/no-pic.png'} name={product?.name} price={product?.price} offPercentage={product?.offPercentage} productId={product.productId} sellerId={product.sellerId} />
                                    </div>
                                ))}
                            </div>
                            {loaded && instanceRef.current && (
                                <Arrow
                                    left={true}
                                    onClick={(e) =>
                                        e.stopPropagation() || instanceRef.current?.prev()
                                    }
                                />
                            )}
                        </div>

                        {loaded && instanceRef.current && (
                            <div className="dots" dir="ltr">
                                {[
                                    ...Array(instanceRef.current.track.details.slides.length).keys(),
                                ].map((idx) => {
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                instanceRef.current?.moveToIdx(idx)
                                            }}
                                            className={"dot" + (currentSlide === idx ? " active" : "")}
                                        ></button>
                                    )
                                })}
                            </div>
                        )}
                    </>
            }


        </div >
    )
}

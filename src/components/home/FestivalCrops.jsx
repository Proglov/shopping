'use client'
import FestivalCropsComponent from "./FestivalCropsComponent"
import { Button } from "@mui/material"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import { useState } from "react"
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import '@/styles/Swiper.css'

const arr = [
    {
        name: 'خامه صباح - 200 میلی لیتر',
        off: 26,
        realPrice: 32000000,
        sold: 84,
        src: '/img/home/category-labaniat.jpg',
        time: 0
    },
    {
        name: 'خامه صباح - 1 میلی لیتر',
        off: 25,
        realPrice: 32000000,
        sold: 48,
        src: '/img/home/category-labaniat.jpg',
        time: 0
    },
    {
        name: 'خامه صباح - 2 میلی لیتر',
        off: 22,
        realPrice: 32000000,
        sold: 25,
        src: '/img/home/category-labaniat.jpg',
        time: 0
    },
    {
        name: 'خامه صباح - 3 میلی لیتر',
        off: 2,
        realPrice: 32000000,
        sold: 52,
        src: '/img/home/category-labaniat.jpg',
        time: 0
    },
    {
        name: 'خامه صباح - 4 میلی لیتر',
        off: 16,
        realPrice: 32000000,
        sold: 13,
        src: '/img/home/category-labaniat.jpg',
        time: 0
    },
    {
        name: 'خامه صباح - 5 میلی لیتر',
        off: 62,
        realPrice: 32000000,
        sold: 70,
        src: '/img/home/category-labaniat.jpg',
        time: 0
    },
    {
        name: 'خامه صباح - 6 میلی لیتر',
        off: 46,
        realPrice: 32000000,
        sold: 20,
        src: '/img/home/category-labaniat.jpg',
        time: 0
    },
    {
        name: 'خامه صباح - 7 میلی لیتر',
        off: 65,
        realPrice: 32000000,
        sold: 100,
        src: '/img/home/category-labaniat.jpg',
        time: 0
    },

]


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

    return (
        <div className="m-4 rounded-xl" style={{ background: 'linear-gradient(to left top, #ff0000 10%, #541a1a 90%)', boxShadow: '0 7px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)' }}>
            <div className="text-center p-2 text-slate-50" style={{ textShadow: '0px 0px 10px white' }}>پیشنهادهای شگفت انگیز</div>

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
                    {arr.map((slide, i) => (
                        <div className="keen-slider__slide sm:min-w-64 min-w-52" key={i}>
                            <FestivalCropsComponent {...slide} />
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

        </div >
    )
}

'use client'
import FestivalCropsComponent from "./FestivalCropsComponent"
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

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


export default function FestivalCrops() {

    const [sliderRef] = useKeenSlider({
        loop: true,
        slides: { perView: "auto", spacing: '-12' },
        rtl: true
    })

    return (
        <div className="m-4 rounded-xl" style={{ background: 'linear-gradient(to left top, #ff0000 10%, #541a1a 90%)', boxShadow: '0 7px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)' }}>
            <div className="text-center p-2 text-slate-50" style={{ textShadow: '0px 0px 10px white' }}>پیشنهادهای شگفت انگیز</div>

            <div ref={sliderRef} className="keen-slider">
                {arr.map((slide, i) => (
                    <div className="keen-slider__slide sm:min-w-64 min-w-52" key={i}>
                        <FestivalCropsComponent {...slide} />
                    </div>
                ))}
            </div>

        </div >
    )
}

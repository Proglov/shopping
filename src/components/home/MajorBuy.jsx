'use client'
import MajorBuyComponent from './MajorBuyComponent'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiperBreaks = {
    200: {
        slidesPerView: 3,
        spaceBetween: 170
    },
    400: {
        slidesPerView: 3,
        spaceBetween: 150
    },
    500: {
        slidesPerView: 3,
        spaceBetween: 130
    },
    540: {
        slidesPerView: 3,
        spaceBetween: 100
    },
    580: {
        slidesPerView: 3,
        spaceBetween: 50
    },
    598: {
        slidesPerView: 4,
        spaceBetween: 180
    },
    600: {
        slidesPerView: 4,
        spaceBetween: 190
    },
    640: {
        slidesPerView: 3,
        spaceBetween: 120
    },
    700: {
        slidesPerView: 3,
        spaceBetween: 100
    },
    750: {
        slidesPerView: 3,
        spaceBetween: 50
    },
    800: {
        slidesPerView: 4,
        spaceBetween: 150
    },
    900: {
        slidesPerView: 4,
        spaceBetween: 80
    },
    1000: {
        slidesPerView: 4,
        spaceBetween: 50
    },
    1050: {
        slidesPerView: 4,
        spaceBetween: 0
    },
    1100: {
        slidesPerView: 5,
        spaceBetween: 30
    },
    1200: {
        slidesPerView: 5,
        spaceBetween: 100
    },
    1250: {
        slidesPerView: 5,
        spaceBetween: 0
    },
    1400: {
        slidesPerView: 6,
        spaceBetween: 0
    },
    1800: {
        slidesPerView: 7,
        spaceBetween: 0
    },
    2000: {
        slidesPerView: 8,
        spaceBetween: 0
    },
}


const arr = [
    {
        name: 'خامه صباح - 200 میلی لیتر',
        off: 26,
        realPrice: 32000000,
        src: '/img/home/category-labaniat.jpg',
        number: 3
    },
    {
        name: 'خامه صباح - 1 میلی لیتر',
        off: 25,
        realPrice: 32000000,
        src: '/img/home/tanagholat.jpg',
        number: 4
    },
    {
        name: 'خامه صباح - 2 میلی لیتر',
        off: 22,
        realPrice: 32000000,
        src: '/img/home/category-labaniat.jpg',
        number: 5
    },
    {
        name: 'خامه صباح - 3 میلی لیتر',
        off: 2,
        realPrice: 32000000,
        src: '/img/home/tanagholat.jpg',
        number: 1
    },
    {
        name: 'خامه صباح - 4 میلی لیتر',
        off: 16,
        realPrice: 32000000,
        src: '/img/home/category-labaniat.jpg',
        number: 10
    },
    {
        name: 'خامه صباح - 5 میلی لیتر',
        off: 62,
        realPrice: 32000000,
        src: '/img/home/tanagholat.jpg',
        number: 2
    },
    {
        name: 'خامه صباح - 6 میلی لیتر',
        off: 46,
        realPrice: 32000000,
        src: '/img/home/category-labaniat.jpg',
        number: 3
    },
    {
        name: 'خامه صباح - 7 میلی لیتر',
        off: 65,
        realPrice: 32000000,
        src: '/img/home/tanagholat.jpg',
        number: 7
    },

]

export default function MajorBuy() {
    return (
        <div className="m-4 rounded-xl" style={{ background: 'linear-gradient(to left top, #f9b49b 20%, #9fb6c3)', boxShadow: '0 7px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)' }}>
            <div className="text-center p-2 text-slate-50" style={{ textShadow: '0px 0px 10px #000000' }}>خرید عمده</div>


            <Swiper
                dir="rtl"
                modules={[Navigation, Pagination]}
                navigation
                loop
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                }}
                lazy="true"
                pagination={{ type: 'progressbar' }}
                breakpoints={swiperBreaks}
                className="w-full rounded-lg"
            >
                {arr.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <MajorBuyComponent {...slide} isSelected={false} />
                    </SwiperSlide>
                ))}
            </Swiper>


        </div>
    )
}

import Link from "next/link"
import FestivalCropsComponent from "./FestivalCropsComponent"
import FestivalSlider from "./FestivalSlider"

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
        src: '/img/home/tanagholat.jpg',
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
        src: '/img/home/tanagholat.jpg',
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
        src: '/img/home/tanagholat.jpg',
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
        src: '/img/home/tanagholat.jpg',
        time: 0
    },

]

export default function FestivalCrops() {



    return (
        <div className="m-4 bg-green-800 rounded-xl">
            <div className="text-center p-2 text-slate-50">پیشنهادهای شگفت انگیز</div>

            {/* xs */}
            <div className='overflow-x-scroll relative w-full sm:hidden flex'>

                <div className='flex'>
                    {arr.map((slide, i) => (
                        <div key={i}>
                            <FestivalCropsComponent {...slide} isSelected={false} />
                        </div>
                    ))}
                </div>


                <div className='min-w-fit h-5  text-indigo-300 mx-2' style={{ transform: 'translateY(170px)' }}>
                    <Link href='/suggestion'>
                        نمایش بیشتر
                    </Link>
                </div>

            </div>

            {/* not xs */}
            <div className="sm:block hidden">
                <FestivalSlider slides={arr} />
            </div>

        </div>
    )
}

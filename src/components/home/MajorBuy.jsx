import Link from 'next/link'
import MajorBuyComponent from './MajorBuyComponent'
import MajorSlider from './MajorSlider'

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

            {/* xs */}
            <div className='overflow-x-scroll relative w-full sm:hidden flex'>

                <div className='flex'>
                    {arr.map((slide, i) => (
                        <div key={i}>
                            <MajorBuyComponent {...slide} isSelected={false} />
                        </div>
                    ))}
                </div>

                <div className='min-w-fit h-5 text-white mx-2' style={{ transform: 'translateY(120px)' }}>
                    <Link href='/'>
                        نمایش بیشتر
                    </Link>
                </div>
            </div>

            {/* not xs */}
            <div className="sm:block hidden">
                <MajorSlider slides={arr} />
            </div>



        </div>
    )
}

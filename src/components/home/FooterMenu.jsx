import Link from 'next/link'
import React from 'react'
import { GiShoppingCart } from 'react-icons/gi';
import { AiOutlineHome } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";
import { Button } from '@mui/material';

export default function FooterMenu({ active }) {
    return (
        <div className='m-5 flex justify-center'>

            <Link href='/'>
                <Button className={`mx-10 flex flex-col ${active === 0 ? 'text-blue-700' : 'text-black'}`}>
                    <div className='mx-auto'>
                        <AiOutlineHome className='text-2xl' />
                    </div>
                    <div className='text-center'>
                        خانه
                    </div>
                </Button>
            </Link>

            <Link href='/category'>
                <Button className={`mx-10 flex flex-col ${active === 1 ? 'text-blue-700' : 'text-black'}`}>
                    <div className='mx-auto'>
                        <TbCategory className='text-2xl' />
                    </div>
                    <div className='text-center sm:text-sm text-xs md:text-base'>
                        دسته بندی ها
                    </div>
                </Button>
            </Link>

            <Link href='/shopping-card'>
                <Button className={`mx-10 flex flex-col ${active === 2 ? 'text-blue-700' : 'text-black'}`}>
                    <div className='mx-auto'>
                        <GiShoppingCart className='text-2xl' />
                    </div>
                    <div className='text-center sm:text-sm text-xs md:text-base'>
                        سبد خرید
                    </div>
                </Button>
            </Link>

        </div>
    )
}

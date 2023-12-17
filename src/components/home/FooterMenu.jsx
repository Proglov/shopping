import Link from 'next/link'
import React from 'react'
import { GiShoppingCart } from 'react-icons/gi';
import { AiOutlineHome } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";
import { Badge, Button } from '@mui/material';

export default function FooterMenu({ active }) {
    return (
        <div className='m-5 flex justify-center'>

            <Link href='/'>
                <Button className={`sm:mx-10 mx-5 flex flex-col ${active === 0 ? 'text-blue-700' : 'text-black'}`}>
                    <div className='mx-auto'>
                        <AiOutlineHome className='text-2xl' />
                    </div>
                    <div className='text-center'>
                        خانه
                    </div>
                </Button>
            </Link>

            <Link href='/category'>
                <Button className={`sm:mx-10 mx-5 flex flex-col ${active === 1 ? 'text-blue-700' : 'text-black'}`}>
                    <div className='mx-auto'>
                        <TbCategory className='text-2xl' />
                    </div>
                    <div className='text-center sm:text-sm text-xs md:text-base'>
                        دسته بندی ها
                    </div>
                </Button>
            </Link>

            <Link href='/shopping-card'>
                <Button className={`sm:mx-10 mx-5 flex flex-col ${active === 2 ? 'text-blue-700' : 'text-black'}`}>
                    <div className='mx-auto'>
                        <Badge badgeContent={2} color="error" sx={{ zIndex: '300' }}>
                            <GiShoppingCart className='text-2xl' style={{ zIndex: '300' }} />
                        </Badge>
                    </div>
                    <div className='text-center sm:text-sm text-xs md:text-base'>
                        سبد خرید
                    </div>
                </Button>
            </Link>

        </div>
    )
}

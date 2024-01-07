import { convertToFarsiNumbers } from '@/utils/funcs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function PopularCropsComponent({ src, number, name, href }) {
    return (
        <Link href={href}>
            <div className='flex align-middle bg-cyan-500 m-2 sm:text-xs lg:text-base rounded-xl' style={{ background: 'linear-gradient(to left top, #06b6d4 20%,blue 90%)', boxShadow: '0 7px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)' }}>
                <div> <Image src={src} alt='Popular Product' width={200} height={300} style={{ borderTopRightRadius: '0.75rem', borderBottomRightRadius: '0.75rem' }} /></div>

                <div className='flex p-2 text-white'>
                    <span className='text-2xl ml-2 mr-1 text-cyan-500'>{convertToFarsiNumbers(number.toString())}</span>
                    <span>{name}</span>
                </div>
            </div>
        </Link>
    )
}
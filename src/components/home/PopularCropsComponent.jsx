import { convertToFarsiNumbers } from '@/utils/funcs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function PopularCropsComponent({ src, number, name, href }) {
    return (
        <Link href={href}>
            <div className='flex align-middle m-2 bg-blue-800 sm:text-xs lg:text-base rounded-xl'>
                <div> <Image src={src} alt='Popular Product' width={200} height={300} style={{ borderTopRightRadius: '0.75rem', borderBottomRightRadius: '0.75rem' }} /></div>

                <div className='flex p-2 text-white'>
                    <span className='text-2xl ml-2 mr-1 text-cyan-500'>{convertToFarsiNumbers(number.toString())}</span>
                    <span>{name}</span>
                </div>
            </div>
        </Link>
    )
}
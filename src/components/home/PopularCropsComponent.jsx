import { convertToFarsiNumbers } from '@/utils/funcs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function PopularCropsComponent({ src, number, name, href }) {
    return (
        <Link href={href}>
            <div className='flex align-middle m-2 sm:text-xs lg:text-base rounded-xl' style={{
                borderTop: '1px solid rgb(6 182 212)',
                borderBottom: '1px solid rgb(20 170 220)',
                borderRight: '1px solid rgb(6 182 150)',
                borderLeft: '1px solid rgb(100 182 212)',
                boxShadow: '0 7px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'
            }}>
                <div> <Image src={src} alt='Popular Product' width={200} height={300} style={{ borderTopRightRadius: '0.75rem', borderBottomRightRadius: '0.75rem' }} /></div>

                <div className='flex p-2 text-black'>
                    <span className='text-2xl ml-2 mr-1 text-cyan-500'>{convertToFarsiNumbers(number.toString())}</span>
                    <span className='text-sm mt-1'>{name}</span>
                </div>
            </div>
        </Link>
    )
}
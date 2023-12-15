import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoryComponent({ src, caption, href }) {
    return (
        <div className='mx-auto'>
            <Link href={href} className='bg-blue-300'>
                <Image alt='دسته بندی' src={src} width={200} height={200} style={{ marginLeft: 'auto', marginRight: 'auto', borderRadius: ' 0.5rem' }} />
            </Link>
            <Typography className='text-center' sx={{
                fontSize: {
                    xs: '12px',
                    sm: '14px',
                    md: '16px',
                    lg: '18px'
                }
            }}>
                {caption}
            </Typography>
        </div>
    )
}

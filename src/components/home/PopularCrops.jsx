'use client'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import PopularCropsComponent from './PopularCropsComponent'
import { ImFire } from "react-icons/im";

const arr = [
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/category-labaniat.jpg'
    },
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/tanagholat.jpg'
    },
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/category-labaniat.jpg'
    },
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/tanagholat.jpg'
    },
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/category-labaniat.jpg'
    },
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/tanagholat.jpg'
    },
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/category-labaniat.jpg'
    },
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/tanagholat.jpg'
    },
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/category-labaniat.jpg'
    },
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/tanagholat.jpg'
    },
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/category-labaniat.jpg'
    },
    {
        href: '/#',
        name: 'شامپو پرژک مدل سیر حجم 450 میلی لیتر',
        src: '/img/home/tanagholat.jpg'
    },
]

export default function PopularCrops() {
    return (
        <div className='m-4 mt-12'>

            <div className='border border-gray-300 top-3 relative' style={{ transform: 'translateY(15px)' }}></div>

            <div>
                <Typography
                    sx={{
                        zIndex: '100',
                        position: 'relative',
                        width: {
                            sm: '30%',
                            md: '30%',
                            lg: '25%'
                        },
                        fontSize: {
                            xs: '20px',
                            sm: '16px',
                            md: '20px',
                            lg: '24px',
                            xl: '30px'
                        }
                    }}
                    className='bg-white m-2 flex justify-center mx-auto'>
                    <ImFire className='mt-1 text-orange-600' />
                    <span className='mx-2'>پرفروش ترین کالاها</span>
                </Typography>
            </div>

            <Grid container>
                {
                    arr.map((v, i) => {
                        return (
                            <Grid key={i} item xs={12} sm={6} md={4}>
                                <PopularCropsComponent href={v.href} name={v.name} src={v.src} number={i + 1} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

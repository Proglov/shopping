'use client'
import { Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import PopularCropsComponent from './PopularCropsComponent'
import { ImFire } from "react-icons/im";

const arr = [
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'هات چاکلت',
        src: '/img/home/photo15080605710.jpg'
    },
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'اسپرسو 20تایی',
        src: '/img/home/photo15080606161.jpg'
    },
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'گلد',
        src: '/img/home/photo15080606161.jpg'
    },
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'قهوه فوری 2*1 (20تایی)',
        src: '/img/home/photo15080606161.jpg'
    },
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'کافی میکس 3*1',
        src: '/img/home/photo15080605328.jpg'
    },
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'کاپوچینو 24 عددی',
        src: '/img/home/photo15080605163.jpg'
    },
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'گلد',
        src: '/img/home/photo15080606161.jpg'
    },
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'گلد',
        src: '/img/home/photo15080606161.jpg'
    },
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'گلد',
        src: '/img/home/photo15080606161.jpg'
    },
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'گلد',
        src: '/img/home/photo15080606161.jpg'
    },
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'گلد',
        src: '/img/home/photo15080606161.jpg'
    },
    {
        href: '/categories/undefined/673f010005ea6dc2c463c020/6740a359a728dfb50f2f4d4e',
        name: 'گلد',
        src: '/img/home/photo15080606161.jpg'
    },
]

export default function PopularCrops() {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className='m-4 mt-12'>

            <div className='border border-gray-300 top-3 relative' style={{ transform: 'translateY(15px)', borderTopWidth: '2px', borderTopRightRadius: '50%', borderTopLeftRadius: '50%' }}></div>
            {/* پرفروش ترین کالاها */}
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
                        },
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                    className='bg-white m-2 flex justify-center mx-auto'>
                    <ImFire className='mt-1 text-orange-600' />
                    <span className='mx-2'>پرفروش ترین کالاها</span>
                </Typography>
            </div>

            <Grid container className='flex'>
                {
                    arr.map((v, i) => {
                        if (showMore)
                            return (
                                <Grid key={i} item xs={12} sm={6} md={4}>
                                    <PopularCropsComponent href={v.href} name={v.name} src={v.src} number={i + 1} />
                                </Grid>
                            )
                        if (i < 6)
                            return (
                                <Grid key={i} item xs={12} sm={6} md={4}>
                                    <PopularCropsComponent href={v.href} name={v.name} src={v.src} number={i + 1} />
                                </Grid>
                            )
                    })
                }

                {
                    !showMore &&
                    <Button onClick={() => setShowMore(true)}>
                        نمایش موارد بیشتر ...
                    </Button>
                }

            </Grid>
        </div>
    )
}

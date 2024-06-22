'use client'
import React, { useState } from 'react'
import CategoriesTable from './SubcategoriesTable'
import AddSubcategory from './AddSubcategory'
import { Button } from '@mui/material'
import { IoMdClose } from "react-icons/io";



export default function SubcategoriesMain() {
    const [isHidden, setIsHidden] = useState(true)

    return (
        <div>
            <div className='text-start text-sm mb-1'>
                {
                    isHidden ?
                        <Button variant='outlined' onClick={() => setIsHidden(prev => !prev)}>اضافه کردن زیر دسته بندی</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                اضافه کردن زیر دسته بندی
                            </span>
                        </>
                }

            </div>
            <div className={`${isHidden ? 'hidden' : ''}`}>
                <AddSubcategory />
            </div>
            <CategoriesTable />
        </div>
    )
}

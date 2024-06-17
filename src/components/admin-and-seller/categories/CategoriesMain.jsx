'use client'
import React, { useState } from 'react'
import CategoriesTable from './CategoriesTable'
import AddCategory from './AddCategory'
import { Button } from '@mui/material'
import { IoMdClose } from "react-icons/io";


export default function CategoriesMain() {
    const [isHidden, setIsHidden] = useState(true)


    return (
        <div>
            <div className='text-start text-sm mb-1'>
                {
                    isHidden ?
                        <Button variant='outlined' onClick={() => setIsHidden(prev => !prev)}>اضافه کردن دسته بندی</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                اضافه کردن دسته بندی
                            </span>
                        </>
                }

            </div>
            <div className={`${isHidden ? 'hidden' : ''}`}>
                <AddCategory />
            </div>
            <CategoriesTable />
        </div>
    )
}

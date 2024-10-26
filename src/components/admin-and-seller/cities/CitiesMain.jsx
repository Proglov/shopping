'use client'
import React, { useState } from 'react'
import CitiesTable from './CitiesTable'
import AddCity from './AddCity'
import { Button } from '@mui/material'
import { IoMdClose } from "react-icons/io";



export default function CitiesMain() {
    const [isHidden, setIsHidden] = useState(true)

    return (
        <div>
            <div className='text-start text-sm mb-1'>
                {
                    isHidden ?
                        <Button variant='outlined' onClick={() => setIsHidden(prev => !prev)}>اضافه کردن شهر</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                اضافه کردن شهر
                            </span>
                        </>
                }

            </div>
            <div className={`${isHidden ? 'hidden' : ''}`}>
                <AddCity />
            </div>
            <CitiesTable />
        </div>
    )
}

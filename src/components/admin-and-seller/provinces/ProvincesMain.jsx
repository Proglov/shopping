'use client'
import React, { useState } from 'react'
import ProvincesTable from './ProvincesTable'
import AddProvince from './AddProvince'
import { Button } from '@mui/material'
import { IoMdClose } from "react-icons/io";


export default function ProvincesMain() {
    const [isHidden, setIsHidden] = useState(true)


    return (
        <div>
            <div className='text-start text-sm mb-1'>
                {
                    isHidden ?
                        <Button variant='outlined' onClick={() => setIsHidden(prev => !prev)}>اضافه کردن استان</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                اضافه کردن استان
                            </span>
                        </>
                }

            </div>
            <div className={`${isHidden ? 'hidden' : ''}`}>
                <AddProvince />
            </div>
            <ProvincesTable />
        </div>
    )
}

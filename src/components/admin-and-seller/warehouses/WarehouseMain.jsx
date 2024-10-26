'use client'
import React, { useState } from 'react'
import WarehousesTable from './WarehousesTable'
import AddWarehouse from './AddWarehouse'
import { Button } from '@mui/material'
import { IoMdClose } from "react-icons/io";



export default function WarehousesMain({ which }) {
    const [isHidden, setIsHidden] = useState(true)

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='text-start text-sm mb-1'>
                {
                    isHidden ?
                        <Button variant='outlined' onClick={() => setIsHidden(prev => !prev)}>اضافه کردن انبار</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                اضافه کردن انبار
                            </span>
                        </>
                }

            </div>
            <div className={`${isHidden ? 'hidden' : ''}`}>
                <AddWarehouse />
            </div>

            <WarehousesTable which={which} />

        </div>
    )
}

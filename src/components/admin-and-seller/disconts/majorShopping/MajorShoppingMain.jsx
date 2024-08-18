'use client'
import React, { useState } from 'react'
import { Button } from '@mui/material'
import { IoMdClose } from "react-icons/io";
import MajorShoppingsTable from './MajorShoppingsTable';
import AddMajorShopping from './AddMajorShopping';



export default function MajorShoppingMain({ which }) {
    const [isHidden, setIsHidden] = useState(true)

    return (
        <div>
            <div className='text-start text-sm mb-1'>
                {
                    isHidden ?
                        <Button variant='outlined' onClick={() => setIsHidden(prev => !prev)}>افزودن محصول عمده</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                افزودن محصول عمده
                            </span>
                        </>
                }

            </div>
            <div className={`${isHidden ? 'hidden' : ''}`}>
                <AddMajorShopping />
            </div>

            <MajorShoppingsTable which={which} />

        </div>
    )
}
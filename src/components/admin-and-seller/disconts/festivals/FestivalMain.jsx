'use client'
import React, { useState } from 'react'
import { Button } from '@mui/material'
import { IoMdClose } from "react-icons/io";
import FestivalsTable from './FestivalsTable';
import AddFestival from './AddFestival';



export default function FestivalMain({ which }) {
    const [isHidden, setIsHidden] = useState(true)

    return (
        <div>
            <div className='text-start text-sm mb-1'>
                {
                    isHidden ?
                        <Button variant='outlined' onClick={() => setIsHidden(prev => !prev)}>افزودن جشنواره</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                افزودن جشنواره
                            </span>
                        </>
                }

            </div>
            <div className={`${isHidden ? 'hidden' : ''}`}>
                <AddFestival />
            </div>

            <FestivalsTable which={which} />

        </div>
    )
}

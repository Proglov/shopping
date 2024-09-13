'use client'
import React, { useState } from 'react'
import TransactionInPersonsTable from './TransactionInPersonsTable'
import AddTransactionInPerson from './AddTransactionInPerson'
import { Button } from '@mui/material'
import { IoMdClose } from "react-icons/io";



export default function TransactionInPersonsMain({ which }) {
    const [isHidden, setIsHidden] = useState(true)

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='text-start text-sm mb-1'>
                {
                    isHidden ?
                        <Button variant='outlined' onClick={() => setIsHidden(prev => !prev)}>
                            افزودن سفارش حضوری
                        </Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                افزودن سفارش حضوری
                            </span>
                        </>
                }

            </div>

            <div className={`${isHidden ? 'hidden' : ''}`}>
                <AddTransactionInPerson which={which} />
            </div>

            <TransactionInPersonsTable which={which} />
        </div>
    )
}

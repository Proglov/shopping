'use client'
import { useState } from 'react'
import UserInPersonsTable from './UserInPersonsTable'
import AddUserInPerson from './AddUserInPerson'
import { Button } from '@mui/material'
import { IoMdClose } from "react-icons/io";



export default function UserInPersonsMain({ which }) {
    const [isHidden, setIsHidden] = useState(true)

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='text-start text-sm mb-1'>
                {
                    isHidden ?
                        <Button variant='outlined' onClick={() => setIsHidden(prev => !prev)}>
                            افزودن مشتری حضوری
                        </Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                افزودن مشتری حضوری
                            </span>
                        </>
                }

            </div>
            <div className={`${isHidden ? 'hidden' : ''}`}>
                <AddUserInPerson />
            </div>

            <UserInPersonsTable which={which} />

        </div>
    )
}

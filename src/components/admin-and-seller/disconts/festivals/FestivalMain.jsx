'use client'
import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { IoMdClose } from "react-icons/io";
import FestivalsTable from './FestivalsTable';
import AddFestival from './AddFestival';
import CustomDialog from '../CustomDialog';
import { FiInfo } from 'react-icons/fi';



export default function FestivalMain({ which }) {
    const [isAddComponentHidden, setIsAddComponentHidden] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <Typography className='flex justify-center items-center gap-2'>
                طرح جشنواره شگفت انگیز چیست ؟
                <FiInfo className='text-cyan-600 cursor-pointer' onClick={() => setIsDialogOpen(true)} onMouseOver={() => setIsDialogOpen(true)} />
            </Typography>

            <div className='text-start text-sm mb-1 mt-6'>
                {
                    isAddComponentHidden ?
                        <Button variant='outlined' onClick={() => setIsAddComponentHidden(prev => !prev)}>افزودن جشنواره</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsAddComponentHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                افزودن جشنواره
                            </span>
                        </>
                }

            </div>
            <div className={`${isAddComponentHidden ? 'hidden' : ''}`}>
                <AddFestival which={which} />
            </div>

            <FestivalsTable which={which} />

            <CustomDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title={'طرح جشنواره شگفت انگیز'}
                desc={'شما میتوانید با اضافه کردن محصولاتتان به طرح شگفت انگیز، برای مدتی آنها را ارزان تر بفروشید تا فروشتان افزایش یابد! محصول مورد نظرتان، درصد تخفیف و تعداد روزی که میخواهید جشنواره فعال باشد را انتخاب کنید!'}
            />
        </div>
    )
}

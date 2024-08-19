'use client'
import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { IoMdClose } from "react-icons/io";
import MajorShoppingsTable from './MajorShoppingsTable';
import AddMajorShopping from './AddMajorShopping';
import CustomDialog from '../CustomDialog';
import { FiInfo } from 'react-icons/fi';



export default function MajorShoppingMain({ which }) {
    const [isAddComponentHidden, setIsAddComponentHidden] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <Typography className='flex justify-center items-center gap-2'>
                طرح محصولات عمده چیست ؟
                <FiInfo className='text-cyan-600 cursor-pointer' onClick={() => setIsDialogOpen(true)} onMouseOver={() => setIsDialogOpen(true)} />
            </Typography>

            <div className='text-start text-sm mb-1 mt-6'>
                {
                    isAddComponentHidden ?
                        <Button variant='outlined' onClick={() => setIsAddComponentHidden(prev => !prev)}>افزودن محصول عمده</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsAddComponentHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                افزودن محصول عمده
                            </span>
                        </>
                }

            </div>
            <div className={`${isAddComponentHidden ? 'hidden' : ''}`}>
                <AddMajorShopping />
            </div>

            <MajorShoppingsTable which={which} />

            <CustomDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title={'طرح محصولات عمده'}
                desc={'شما میتوانید با افزودن محصولاتتان در این طرح، با خرید عمده ی خریداران به آنها تخفیف دهید! برای فعال کردن این طرح، محصول مورد نظرتان را انتخاب کنید، و تعداد محصولاتی که برای فعال شدن این طرح نیاز است تا خریداری شود را وارد کنید. به طور مثال، اگر شما برای فروش پنیرتان، تعداد 10 را انتخاب کنید، خریداران با خرید حداقل 10 پنیر، از شما تخفیف میگیرند. '}
                warning={'توجه فرمایید این طرح به صورت خودکار غیرفعال نمیشود و محدودیت زمانی ندارد. پس برای غیرفعال شدن، حتما آنها را حذف کنید!'}
            />
        </div>
    )
}
'use client'
import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { IoMdClose } from "react-icons/io";
import CompanyCouponForSomeProductsTable from './CompanyCouponForSomeProductsTable';
import AddCompanyCouponForSomeProducts from './AddCompanyCouponForSomeProduct';
import { FiInfo } from "react-icons/fi";
import CustomDialog from '../CustomDialog';


export default function CompanyCouponForSomeProductsMain({ which }) {
    const [isAddComponentHidden, setIsAddComponentHidden] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <Typography className='flex justify-center items-center gap-2'>
                طرح پرسنلی چیست ؟
                <FiInfo className='text-cyan-600 cursor-pointer' onClick={() => setIsDialogOpen(true)} onMouseOver={() => setIsDialogOpen(true)} />
            </Typography>

            <div className='text-start text-sm mb-1 mt-6'>
                {
                    isAddComponentHidden ?
                        <Button variant='outlined' onClick={() => setIsAddComponentHidden(prev => !prev)}>افزودن طرح پرسنلی</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsAddComponentHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                افزودن طرح پرسنلی
                            </span>
                        </>
                }

            </div>
            <div className={`${isAddComponentHidden ? 'hidden' : ''}`}>
                <AddCompanyCouponForSomeProducts />
            </div>

            <CompanyCouponForSomeProductsTable which={which} />

            <CustomDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title={'طرح پرسنلی'}
                desc={'شما میتوانید با شرکت ها یا ادارات مختلف قرار داد بسته، و به پرسنل آن شرکت کد تخفیف بدهید تا محصولاتتان را ارزانتر خریداری کنند! در این طرح میتوانید محصولاتتان را برای اعمال تخفیف انتخاب کنید.'}
            />
        </div>
    )
}

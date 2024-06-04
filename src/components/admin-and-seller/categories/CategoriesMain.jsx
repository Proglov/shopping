'use client'
import React, { useState, createContext } from 'react'
import CategoriesTable from './CategoriesTable'
import AddCategory from './AddCategory'
import useCategories from "@/hooks/useCategories"
import { Button } from '@mui/material'
import { IoMdClose } from "react-icons/io";


export const CategoriesContext = createContext()


export default function CategoriesMain() {
    const [isHidden, setIsHidden] = useState(true)

    const CategoriesObj = useCategories()
    const itemsPerPage = 20

    return (
        <div>
            <div className='text-start text-sm mb-1'>
                {
                    isHidden ?
                        <Button variant='outlined' onClick={() => setIsHidden(prev => !prev)}>اضافه کردن دسته بندی</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                اضافه کردن دسته بندی
                            </span>
                        </>
                }

            </div>
            <div className={`${isHidden ? 'hidden' : ''}`}>
                <AddCategory />
            </div>
            <CategoriesContext.Provider value={{ ...CategoriesObj, itemsPerPage }}>
                <CategoriesTable />
            </CategoriesContext.Provider>
        </div>
    )
}

'use client'
import React, { useState, createContext } from 'react'
import ProductsTable from './ProductsTable'
import AddProduct from './AddProduct'
import useProducts from "@/hooks/useProducts"
import { Button } from '@mui/material'
import { IoMdClose } from "react-icons/io";


export const ProductsContext = createContext()


export default function ProductsMain({ which }) {
    const [isHidden, setIsHidden] = useState(true)

    const productsObj = useProducts()
    const itemsPerPage = 20

    return (
        <div>
            <div className='text-start text-sm mb-1'>
                {
                    isHidden ?
                        <Button variant='outlined' onClick={() => setIsHidden(prev => !prev)}>اضافه کردن محصول</Button>
                        : <>
                            <Button variant='outlined' color='error' onClick={() => setIsHidden(prev => !prev)}>
                                <IoMdClose className='text-lg' />
                            </Button>

                            <span className='mx-3'>
                                اضافه کردن محصول
                            </span>
                        </>
                }

            </div>
            <div className={`${isHidden ? 'hidden' : ''}`}>
                <AddProduct />
            </div>
            <ProductsContext.Provider value={{ ...productsObj, itemsPerPage, which }}>
                <ProductsTable which={which} />
            </ProductsContext.Provider>
        </div>
    )
}

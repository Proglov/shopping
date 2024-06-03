'use client'
import React, { createContext } from 'react'
import TXTable from './TXTable'
import useTX from '@/hooks/useTX'

export const ItemsContext = createContext()

export default function TXMain({ which }) {
    const ObjNow = useTX()
    const ObjLast = useTX()
    const itemsPerPage = 20

    return (
        <div>
            {/* سفارشات اتی */}
            <ItemsContext.Provider
                value={{
                    ...ObjNow,
                    itemsPerPage,
                    isFutureOrder: true,
                    which
                }}>
                <TXTable />

            </ItemsContext.Provider>

            {/* سفارشات اخیر */}
            <ItemsContext.Provider
                value={{
                    ...ObjLast,
                    itemsPerPage,
                    isFutureOrder: false,
                    which
                }}>
                <TXTable />
            </ItemsContext.Provider>
        </div>
    )
}

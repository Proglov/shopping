import React, { createContext } from 'react'
import CommentsTable from './SellersTable'
import useSellers from '@/hooks/useSellers'

export const ItemsContext = createContext()

export default function SellersMain() {
    const ObjValidated = useSellers()
    const ObjNotValidated = useSellers()
    const itemsPerPage = 20

    return (
        <div>

            <ItemsContext.Provider
                value={{
                    ...ObjNotValidated,
                    itemsPerPage,
                    validated: false,
                }}
            >
                <CommentsTable />
            </ItemsContext.Provider>

            <ItemsContext.Provider
                value={{
                    ...ObjValidated,
                    itemsPerPage,
                    validated: true,
                }}
            >
                <CommentsTable />
            </ItemsContext.Provider>

        </div>
    )
}

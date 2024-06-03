import React, { createContext } from 'react'
import CommentsTable from './CommentsTable'
import useComment from '@/hooks/useComment'

export const ItemsContext = createContext()

export default function CommentsMain() {
    const ObjValidated = useComment()
    const ObjNotValidated = useComment()
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

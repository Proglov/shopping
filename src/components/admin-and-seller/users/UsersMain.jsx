import { createContext } from "react"
import UsersTable from "./UsersTable"
import useUsers from "@/hooks/useUsers"

export const UsersContext = createContext()

export default function UsersMain() {

    const UsersObj = useUsers()
    const itemsPerPage = 10

    return (
        <UsersContext.Provider value={{ ...UsersObj, itemsPerPage }}>
            <UsersTable />
        </UsersContext.Provider>
    )
}

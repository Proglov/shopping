import { createContext } from "react"
import UsersTable from "./UsersTable"

export const UsersContext = createContext()

export default function UsersMain() {

    return (
        <UsersTable />
    )
}

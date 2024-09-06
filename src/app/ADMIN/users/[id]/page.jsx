import UserMain from "@/components/admin/user/UserMain";
import { searchParamsHandler } from "../../page";


export default async function page({ params: { id }, searchParams }) {
    const tabs = searchParamsHandler(['tx', 'comments'], searchParams?.tab)

    return <UserMain id={id} tabs={tabs} />
}
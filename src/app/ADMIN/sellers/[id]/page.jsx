import SellerMain from "@/components/admin/seller/SellerMain"
import { searchParamsHandler } from "@/utils/funcs"


export default async function page({ params: { id }, searchParams }) {
    const tabs = searchParamsHandler(['products', 'tx', 'comments'], searchParams?.tab)

    return <SellerMain id={id} tabs={tabs} />
}
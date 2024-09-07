import ProductMain from '@/components/admin/product/ProductMain'
import { searchParamsHandler } from '@/utils/funcs'


export default function page({ params: { id }, searchParams }) {
    const tabs = searchParamsHandler(['tx', 'comments'], searchParams?.tab)
    return (
        <ProductMain id={id} tabs={tabs} />
    )
}
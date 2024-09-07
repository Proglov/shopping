import Main from '@/components/seller/MainSeller'
import { searchParamsHandler } from '@/utils/funcs'

export default function Home({ searchParams }) {
  const tabs = searchParamsHandler(['products', 'tx', 'setting', 'discounts'], searchParams?.tab)
  const discountTabs = searchParamsHandler(['festivals', 'majorShopping', 'company'], searchParams?.discountTab)

  return (
    <Main tabs={tabs} discountTabs={discountTabs} />
  )
}
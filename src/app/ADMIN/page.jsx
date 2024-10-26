import Main from '@/components/admin/MainAdmin'
import { searchParamsHandler } from '@/utils/funcs'


export default function Home({ searchParams }) {
  const tabs = searchParamsHandler(['products', 'warehouses', 'users', 'userInPersons', 'transactionInPerson', 'sellers', 'categories', 'subcategories', 'provinces', 'cities', 'tx', 'comments', 'discounts'], searchParams?.tab)
  const discountTabs = searchParamsHandler(['festivals', 'majorShopping', 'company'], searchParams?.discountTab)

  return (
    <Main tabs={tabs} discountTabs={discountTabs} />
  )
}

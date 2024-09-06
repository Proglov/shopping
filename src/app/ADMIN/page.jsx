import Main from '@/components/admin/MainAdmin'

export const searchParamsHandler = (array, tab) => {
  const res = {}

  array.map((val, index) => {
    res[index] = val
    res[val] = index
  })

  res.active = typeof res[tab] === 'number' ? res[tab] : 0;
  return res
}

export default function Home({ searchParams }) {
  const tabs = searchParamsHandler(['products', 'users', 'sellers', 'categories', 'subcategories', 'tx', 'comments', 'discounts'], searchParams?.tab)
  const discountTabs = searchParamsHandler(['festivals', 'majorShopping', 'company'], searchParams?.discountTab)

  return (
    <Main tabs={tabs} discountTabs={discountTabs} />
  )
}

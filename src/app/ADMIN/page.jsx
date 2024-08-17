import Main from '@/components/admin/MainAdmin'
import AdminProtector from './AdminProtector'

const Wait = () => {
  return (
    <div className='text-center w-screen h-screen bg-black text-slate-50'>
      لطفا صبر کنید ...
    </div>
  )
}

const CustomObj = (array, tab) => {
  const res = {}

  array.map((val, index) => {
    res[index] = val
    res[val] = index
  })

  res.active = res[tab] || 0
  return res
}

export default function Home({ searchParams }) {
  const tabs = CustomObj(['products', 'users', 'sellers', 'categories', 'subcategories', 'tx', 'comments'], searchParams?.tab)

  return (
    <AdminProtector Wait={<Wait />} shouldRouterPush={true}>
      <Main tabs={tabs} />
    </AdminProtector>
  )
}

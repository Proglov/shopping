import Main from '@/components/admin/MainAdmin'
import AdminProtector from './AdminProtector'

const Wait = () => {
  return (
    <div className='text-center w-screen h-screen bg-black text-slate-50'>
      لطفا صبر کنید ...
    </div>
  )
}

export default function Home() {
  return (
    <AdminProtector Wait={<Wait />} shouldRouterPush={true}>
      <Main />
    </AdminProtector>
  )
}

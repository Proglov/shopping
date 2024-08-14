import Main from '@/components/seller/MainSeller'
import SellerProtector from '@/app/Seller/SellerProtector'

const Wait = () => {
  return (
    <div className='text-center w-screen h-screen bg-black text-slate-50'>
      لطفا صبر کنید ...
    </div>
  )
}

export default function Home() {
  return (
    <SellerProtector Wait={<Wait />} shouldRouterPush={true}>
      <Main />
    </SellerProtector>
  )
}
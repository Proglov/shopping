import { notFound } from 'next/navigation'
import Api from "@/services/withAuthActivities/seller"
import Main from '@/components/seller/MainSeller'

export default async function Home() {
  // const {isUserSeller} = Api
  // const isSellerData = await isUserSeller(token)

  // if (!isSellerData?.isSeller) notFound()

  return (
    <Main />
  )
}

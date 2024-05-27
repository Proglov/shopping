import { notFound } from 'next/navigation'
import { isAdmin } from "@/services/withAuthActivities/user"
import Main from '@/components/admin/MainAdmin'

export default async function Home() {
  // const isAd = await isAdmin(token)

  // if (!isAd) notFound()

  return (
    <Main />
  )
}

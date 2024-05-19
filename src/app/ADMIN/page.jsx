import { notFound } from 'next/navigation'
import { isAdmin } from "@/services/adminActivities/user"
import Main from '@/components/admin/MainAdmin'

export default async function Home() {
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTkzYjJlZDhiNmQ2ODMzOTcxNDU0YjIiLCJpYXQiOjE3MDk0MDQ4MjMsImV4cCI6MTcwOTQ5MTIyM30.c5BO4NfLFDvulsQeMo4QHKhrrmbisvoyeOTn9DjceKU"
  // const isAd = await isAdmin(token)

  // if (!isAd) notFound()

  return (
    <Main />
  )
}

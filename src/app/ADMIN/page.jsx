import { notFound } from 'next/navigation'
import { isAdmin } from "@/services/adminActivities/users"

export default async function Home() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTkzYjJlZDhiNmQ2ODMzOTcxNDU0YjIiLCJpYXQiOjE3MDkzMDcxNDEsImV4cCI6MTcwOTM5MzU0MX0.2q-dzGW5Z8p55Z-OziWDb13zytT2Kna0-ZYlOVhsXDU"
  const isAd = await isAdmin(token)

  if (!isAd) notFound()

  return (
    <>
      hi
    </>
  )
}

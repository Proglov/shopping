'use client'
import Api from '@/services/withoutAuthActivities/product'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GetParams({ id }) {
    const { getOneProductParams } = Api
    const router = useRouter()

    useEffect(() => {
        const getParams = async () => {
            try {
                const res = await getOneProductParams({ id })
                router.replace('/categories/' + res?.params)
            } catch (error) {
                router.push('/not-found')
            }
        }
        getParams()
    }, [])

    return (
        <div className='text-center mt-5'>لطفا صبر کنید ...</div>
    )
}

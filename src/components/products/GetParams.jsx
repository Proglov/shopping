'use client'
import Api from '@/services/withoutAuthActivities/product'
import { useRouter } from 'next/navigation'

export default function GetParams({ id }) {
    const { getOneProductParams } = Api
    const router = useRouter()

    const getParams = async () => {
        const res = await getOneProductParams({ id })
        router.push('/categories/' + res?.params)
    }

    getParams()
    return (
        <div className='text-center mt-5'>لطفا صبر کنید ...</div>
    )
}

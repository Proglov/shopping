'use client'
import React, { useEffect, useState } from 'react'
import Api from '@/services/withAuthActivities/seller';
import { useRouter } from 'next/navigation';
import { Provider } from "react-redux";
import { storeAdmin } from '@/components/admin-and-seller/redux/store';



export default function SellerProtector({ children, Wait, shouldRouterPush, showNotFound }) {
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const { isUserSeller } = Api
    const router = useRouter()

    useEffect(() => {
        const isAd = async () => {
            try {
                const res = await isUserSeller()
                const result = res?.isSeller
                if (!result) {
                    if (shouldRouterPush)
                        router.push("/not-found")
                    else
                        setShow(false)
                } else {
                    setShow(true)
                }
            } catch (error) {
                if (shouldRouterPush)
                    router.push("/not-found")
                else
                    setShow(false)
            } finally {
                setLoading(false)
            }
        }
        isAd()
    }, [isUserSeller, router, shouldRouterPush])

    if (loading) {
        return Wait
    }
    if (!show && !loading)
        return showNotFound
    else if (show)
        return <Provider store={storeAdmin}>{children}</Provider>;
}

import React from 'react'
import SellersTable from './SellersTable'


export default function SellersMain() {

    return (
        <div>
            <SellersTable validated={false} />
            <SellersTable validated={true} />
        </div>
    )
}

'use client'
import React from 'react'
import TXTable from './TXTable'


export default function TXMain({ which }) {

    return (
        <div>
            <TXTable isFutureOrder={true} which={which} />
            <TXTable isFutureOrder={false} which={which} />
        </div>
    )
}

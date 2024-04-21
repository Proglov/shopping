import React from 'react'
import TXTableNow from './TXTableNow'
import TXTableLast from './TXTableLast'

export default function TXMain() {
    return (
        <div>
            <TXTableNow />
            <TXTableLast />
        </div>
    )
}

import React from 'react'
import CommentsTableNow from './CommentsTableNow'
import CommentsTableLast from './CommentsTableLast'

export default function CommentsMain() {
    return (
        <div>
            <CommentsTableNow />
            <CommentsTableLast />
        </div>
    )
}

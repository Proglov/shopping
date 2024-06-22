import React from 'react'
import CommentsTable from './CommentsTable'


export default function CommentsMain() {

    return (
        <div>
            <CommentsTable validated={false} />
            <CommentsTable validated={true} />
        </div>
    )
}

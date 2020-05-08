import React from 'react'

import Engine from '../Comment/Engine'
import Comment from '../Comment/Component'


export default function Test() {

    const [commentValue, setComment] = React.useState<string | undefined>('')

    return (
        <div>
            <Engine parent_id={'none'}/>
        </div>
    )
}
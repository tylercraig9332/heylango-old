import React from 'react'
import IBadge from './IBadge'
import Badge from './Badge'

export default function Panel(props : {badges: IBadge[] | undefined}) {
    if (props.badges === undefined) return null
    return (
        <span>
            {props.badges.map(b => {
                return <span key={b._id} style={{marginRight: '5px'}}><Badge type={b.type} custom={b.custom}/></span>
            }) }
        </span>
    )
}
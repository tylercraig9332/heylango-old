import React, { useEffect, useState } from 'react'
import IBadge from './IBadge'
import Badge from './Badge'

export default function Panel(props : {user_id?: string}) {

    const [badges, setBadges] = useState<IBadge[]>([])

    useEffect(() => {
        let p = null
        if (props.user_id === undefined) p = window.sessionStorage.getItem('userId')
        else p = props.user_id
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch(`/api/b/${p}`, reqHeaders).then(res => {
            return res.json()
        }).then(b => {
            setBadges(b.reverse())
        }) 
    }, [])

    if (badges.length === 0) return null
    return (
        <div style={{width: '600px'}}>
            {badges.map(b => {
                return <span key={b._id} style={{marginRight: '5px', position: 'relative'}}><Badge type={b.type} custom={b.custom}/></span>
            }) }
        </div>
    )
}
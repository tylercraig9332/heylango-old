import React, { useEffect, useState } from 'react'
import IBadge from './IBadge'
import Badge from './Badge'

export default function Panel(props : {badges?: IBadge[]}) {

    const [badges, setBadges] = useState<IBadge[]>([])

    useEffect(() => {
        if (props.badges !== undefined) return 
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch(`/b/${window.sessionStorage.getItem('userId')}`, reqHeaders).then(res => {
            return res.json()
        }).then(b => {
            setBadges(b.reverse())
        }) 
    }, [])

    if (badges.length === 0) return null
    return (
        <span>
            {badges.map(b => {
                return <span key={b._id} style={{marginRight: '5px'}}><Badge type={b.type} custom={b.custom}/></span>
            }) }
        </span>
    )
}
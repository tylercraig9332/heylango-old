import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

type CardProps = {
    name: string,
    imageUrl: string,
    flag: string,
    code: string
}

export default function CommunityCard(props : CardProps) {
    
    const [focused, focus] = useState<boolean>(false)
    const [focusStyle, setStyle] = useState<Object>({border: '1px border white'})

    useEffect(() => {
        let f = {}
        if (focused) f = {border: '1px solid #1890ff'}
        setStyle(f)
    }, [focused])


    return (
        <Card 
            style={{width: 400, height: 630, margin: 20, textAlign: 'center', ...focusStyle}}
            hoverable
            onMouseEnter={() => focus(true)}
            onMouseLeave={() => focus(false)}
            key={props.name} 
        >
            <Link to={`/community/${props.code}`}>
            <img alt={props.name} src={props.imageUrl} style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}/>
            <h1>{props.name}</h1>
            <h1 style={{marginTop: -20}}>{props.flag}</h1>
            </Link>
        </Card>
    )
}
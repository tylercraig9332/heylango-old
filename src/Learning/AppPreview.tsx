import React from 'react'
import {Card, Icon} from 'antd'
import {Link} from 'react-router-dom'

export default function AppPreivew(props: {title : string, icon: string, description: string, path: string}) 
{
    return (
    <Link to={props.path}>
        <Card style={{width: 300, margin: 20}} title={props.title} hoverable>
            <Icon type={props.icon}/> {props.description}
        </Card>
    </Link>
    )
}
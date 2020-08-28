import React from 'react'
import {Card, Icon} from 'antd'
import {Link} from 'react-router-dom'
import Badge from '../User/Badge/Badge'

export default function AppPreivew(props: {title : string, icon: string, description: string, path: string, comingSoon?: boolean}) 
{

    const title = (props.comingSoon) ? <span>{props.title} <Badge type="comingSoon"/></span> : props.title
    return (
    <Link to={props.path}>
        <Card style={{width: 300, margin: 20}} title={title} hoverable>
            <Icon type={props.icon}/> {props.description}
        </Card>
    </Link>
    )
}
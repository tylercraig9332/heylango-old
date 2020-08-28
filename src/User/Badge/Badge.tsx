import React from 'react'
import { Tag, Icon } from 'antd'

export default function Badge(props : {type: string, custom?: string}) {
    if (props.type === undefined || props.type === null) return null
    switch (props.type) {
        case 'new':
            return <Tag color="green">New User <Icon type="smile" /></Tag>
        case 'comingSoon':
            return <Tag color="orange">Comming Soon</Tag>
        case 'contributor':
            return <Tag color="#1890ff">Contributor</Tag>
        case 'supporter':
            return <Tag color="blue">Supporter</Tag>
        case 'supporterGold':
            return <Tag color="gold"><Icon type="star" theme="filled"/> Gold Supporter <Icon type="star" theme="filled"/></Tag>
        case 'supporterDiamond':
            return <Tag color="#B9F2FF" style={{border: '1px solid #1890ff'}}><span style={{color: '#1890ff'}} ><Icon type="rocket" theme="twoTone" /> Diamond Supporter <Icon type="rocket" theme="twoTone" /></span></Tag>
        case 'custom':
            if (props.custom === '' || props.custom === undefined) return null
            return <Tag>{props.custom}</Tag>
        default:
            return null
    }
}
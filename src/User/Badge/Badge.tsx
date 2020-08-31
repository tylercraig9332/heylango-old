import React from 'react'
import { Tag, Icon, Tooltip } from 'antd'

export default function Badge(props : {type: string, custom?: string}) {
    if (props.type === undefined || props.type === null) return null
    switch (props.type) {
        case 'new':
            return <Tag color="green" style={tagStyle}>New User <Icon type="smile" /></Tag>
        case 'comingSoon':
            return <Tag color="orange">Comming Soon</Tag>
        case 'contributor':
            return <Tag color="#1890ff" style={tagStyle}>Contributor</Tag>
        case 'supporter':
            return <Tag color="blue">Supporter</Tag>
        case 'supporterGold':
            return (
                <Tooltip title="Gold Supporter">
                <Tag color="gold" style={premiumStyle}><Icon type="star" theme="filled"/> {props.custom} <Icon type="star" theme="filled"/></Tag>
                </Tooltip>
            )
        case 'supporterDiamond':
            return (
                <Tooltip title="Diamond Supporter">
                <Tag color="#B9F2FF" style={{border: '1px solid #1890ff', ...premiumStyle}}><span style={{color: '#1890ff'}} ><Icon type="rocket" theme="twoTone" /> {props.custom} <Icon type="rocket" theme="twoTone" /></span></Tag>
                </Tooltip>
            )
            case 'custom':
            if (props.custom === '' || props.custom === undefined) return null
            return <Tag>{props.custom}</Tag>
        default:
            return null
    }
}

const premiumStyle = {
    padding: 5,
    margin: 5
} as React.CSSProperties

const tagStyle = {
    margin: 5
}

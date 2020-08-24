import React from 'react'
import {Tag, Icon, Avatar} from 'antd'

export default function Support() {
    return (
        <div>
            <h2>Support Test Page</h2>
            <hr></hr>
            <Tag>Spanish C1 | German B1</Tag>
            <Tag color="#1890ff">Contributor</Tag>
            <Tag color="green">New User <Icon type="smile" /></Tag>
            <Tag color="gold"><Icon type="star" theme="filled"/> Gold Supporter <Icon type="star" theme="filled"/></Tag>
            <Tag color="#B9F2FF" style={{border: '1px solid #1890ff'}}><span style={{color: '#1890ff'}} ><Icon type="rocket" theme="twoTone" /> Diamond Supporter <Icon type="rocket" theme="twoTone" /></span></Tag>
        </div>
    )
}
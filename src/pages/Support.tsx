import React from 'react'
import {Tag, Icon, Avatar} from 'antd'
import Badge from '../User/Badge/Badge'

export default function Support() {
    return (
        <div>
            <h2>Support Test Page</h2>
            <hr></hr>
            <Badge type="custom" custom="Spanish C1 | German B1"/>
            <Badge type="contributor" />
            <Badge type="new" />
            <Badge type="supporter" />
            <Badge type="supporterGold" />
            <Badge type="supporterDiamond" />
        </div>
    )
}
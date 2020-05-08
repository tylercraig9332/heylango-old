import React from 'react'
import { BiSheet } from './BiSheet'
import Editor  from '../../Draft/DraftEditor'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

export default function Preview(props : {sheet: any}) {
    if (props.sheet === undefined) return null
    return (
        <div>
            <Link to={`/learn/bi/${props.sheet._id}`}>
                <Card title={props.sheet.title} style={cardStyle} hoverable>
                    <Editor value={props.sheet.primary}  
                                style={{height: 200}} readOnly/>
                </Card>
            </Link>
        </div>
    )
}

const cardStyle = {
    width: 400,
    height: 300,
    padding: 10,
    margin: 15,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
} as React.CSSProperties
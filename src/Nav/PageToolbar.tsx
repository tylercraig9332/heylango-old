import React from 'react'
import {PageHeader} from 'antd'

export default function PageToolbar(props: {title: string, extra?: React.ReactNode }) {
    return (
        <PageHeader
            style={{
                border: '1px solid rgb(235, 237, 240)', background: 'white'
            }}
            onBack={() => window.history.back()}
            title={props.title}
            extra={<div style={{marginTop: 5}}>{props.extra}</div>}
    />
    )
}
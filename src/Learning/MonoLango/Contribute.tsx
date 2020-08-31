import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Empty } from 'antd'

export default function Contribute() {

    const desc = (
        <div>
            <p>There are no Langos that match your filters</p>
            <p>Please consider contributing to the site</p>
        </div>
    )
    return (
        <div style={container}>
            <Empty description={desc}>
                <Link to='/learn/lango/create'><Button size="large" type="primary">Create New Lango</Button></Link>
            </Empty>
        </div>
    )
}

const container = {
    marginTop: '100px',
    marginRight: 'auto',
    marginLeft: 'auto',
    widthL: '800px'
} as React.CSSProperties
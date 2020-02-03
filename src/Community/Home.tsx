import React from 'react'
import List from '../Post/List'

import { Button } from 'antd'
import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div>
            <div style={flexContainer}>
                <h1>Community Home</h1>
                <Button type="primary" style={post}><Link to="/community/p/">Create New Post</Link></Button>
            </div>
            <hr></hr>
            <List by="idk"/>
        </div>
    )
}

const post = {
    zIndex: 2
} as React.CSSProperties

const flexContainer = {
    display: 'flex',
    justifyContent: 'space-between'
} as React.CSSProperties
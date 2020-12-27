import React, { useEffect, useState } from 'react'
import List from './List'
import { Button } from 'antd'
import { Link } from 'react-router-dom'


export default function Home() {
    return (
        <div style={wrap}>
            <div style={flexHeader}>
                <h1>Browse VidLangos</h1>
                <Link to="/learn/vid/create"><Button type="primary" size="large">Create New VidLango</Button></Link>
            </div>
            <hr style={{maxWidth: '1200px'}}></hr>
            <List by="home" />
        </div>
    )
}

const wrap = {
    maxWidth: '1400px',
    marginRight: 'auto',
    marginLeft: 'auto'
}

const flexHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    marginRight: 'auto',
    marginLeft: 'auto'
} as React.CSSProperties

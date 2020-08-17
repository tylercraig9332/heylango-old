import React, { useEffect } from 'react'
import List from '../Post/List'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { parseLanguageCode } from '../Util/functions'

export default function View() {

    const langCode = window.location.pathname.split('/')[2]

    return (
        <div>
            <div style={flexContainer}>
            <h1>{parseLanguageCode(langCode)} Community</h1>
                <Button type="primary" style={post}><Link to={`/community/p/new/${langCode}`}>Create New Post</Link></Button>
            </div>
            <hr></hr>
            <List by={langCode} />
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
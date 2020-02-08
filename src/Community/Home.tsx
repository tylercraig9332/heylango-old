import React from 'react'
import List from '../Post/List'
import Card from './Card'
import s from '../Util/static.json'

import { Button } from 'antd'
import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div>
            <div style={flexContainer}>
                <h1>Language Communities</h1>
                <Button type="primary" style={post}><Link to="/community/p/new">Create New Post</Link></Button>
            </div>
            <hr></hr>
            <div style={commContainer}>
                {s.communities.map((c : any) => {
                    return <Card key={c.code} name={c.name} imageUrl={c.imageUrl} flag={c.flag} code={c.code}/>
                })
                }
            </div>
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

const commContainer = {
    display: 'flex',
    alignItems: 'start',
    flexWrap: 'wrap'
} as React.CSSProperties
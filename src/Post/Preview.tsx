import React from 'react'
import Post from './Post'

import { Card } from 'antd'

type PostCardProps = {
    post : Post
}

export default function Preview(props : PostCardProps) {
    const { post } = props
    return (
        <div style={cardStyle} key={post.id}>
            <Card hoverable key={post.id}>
                <h3>{post.title}</h3>
                <hr style={{color: '#1890FF', marginLeft: 0, width: '10%'}}></hr>
                <p>{post.content}</p>
            </Card> 
        </div>
    )
}

const cardStyle = {
    margin: 20
} as React.CSSProperties

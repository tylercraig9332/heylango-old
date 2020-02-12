import React from 'react'
import Post from './Post'
import PreviewContent from '../Draft/PreviewEditor'
import {Link} from 'react-router-dom'
import { Card } from 'antd'
import {Like, Comment, Favorite, Share, User} from './Toolbar/Icons'

type PostCardProps = {
    post : Post
}

export default function Preview(props : PostCardProps) {
    const { post } = props

    const toolbar = [<Like postId={post.id}/>, <Comment />, <Favorite />, <Share />, <User author={post.author}/>]

    return (
        <div style={cardStyle} key={post.id}>
            <Card hoverable key={post.id} actions={toolbar}>
                <Link to={`/community/p/${post.id}`}>
                    <h2>{post.title}</h2>
                    {/*<hr style={{color: '#40a9ff', marginLeft: 0, width: '10%'}}></hr>U*/}
                    <PreviewContent value={post.content} />
                </Link>
            </Card> 
        </div>
    )
}

const cardStyle = {
    margin: 20
} as React.CSSProperties

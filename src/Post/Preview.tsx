import React from 'react'
import Post from './Post'
import PreviewContent from '../Draft/PreviewEditor'
import {Link} from 'react-router-dom'
import { Card, Icon } from 'antd'
import { Like, Comment, Favorite, Share, EditOrUser } from './Toolbar/Icons'
import { timeSince } from '../Util/functions'

type PostCardProps = {
    post : Post
}

export default function Preview(props : PostCardProps) {
    const { post } = props

    const toolbar = [
        <Like postID={post.id}/>, <Comment />,
        <Favorite />, <Share postID={post.id}/>, 
        <EditOrUser postID={post.id} handleEdit={() => {
            window.location.href = `/community/p/${post.id}`}
        }/>
    ]

    return (
        <div style={cardStyle} key={post.id}>
            <Card hoverable key={post.id} actions={toolbar}>
                <Link to={`/community/p/${post.id}`} style={{color: 'inherit'}}>
                    <h2>{post.title}</h2>
                    {/*<hr style={{color: '#40a9ff', marginLeft: 0, width: '10%'}}></hr>U*/}
                    <hr style={{margin: 0, width: 200, marginBottom: 3, border: 'none', borderTop: '1px solid #1890ff'}} />
                    <div style={row}>
                        <Icon type="read" style={iconStyle}/>
                        <PreviewContent value={post.content} style={{marginLeft: '20px'}}/>
                    </div>
                    <p style={{padding: 0, marginBottom: -20, marginTop: -10}}>posted {timeSince(post.createdAt)} ago on {new Date(post.createdAt).toLocaleDateString()}</p>
                </Link>
            </Card> 
        </div>
    )
}

const cardStyle = {
    margin: 20
} as React.CSSProperties

const row = {
    display: 'flex',
    padding: 20
}

const iconStyle = {
    fontSize: 32
}
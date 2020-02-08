import React from 'react'
import { Comment } from 'antd'
import { Link } from 'react-router-dom'
import {Like, Comment as Reply} from '../Post/Toolbar/Icons'
import Avatar from '../User/Avatar'
import IComment from './Comment'

type CommentProps = {
    id?: string,
    content? : string, // comment data
    author? : string | Object, // id for the author of the component
    parent? : string // id for parent component (Post or other Comments, etc)
    onReply? : any,
    comment?: IComment 
}

/* Comment Individual Component */
export default function Component(props : CommentProps) {
    let {author, onReply, content, parent, id} = props
    if (props.comment != undefined) {
         author = props.comment.author
         content = props.comment.content
         parent = props.comment.parent
    }

    function handleLike() {
        // TODO: run request for this handler
    }

    const myActions = [
        <div style={actionStyle}><Like onClick={handleLike}/></div>,
        <div style={actionStyle}><Reply onClick={onReply} reply/></div>
    ]

    return (
        <div key={id}>
            <Comment author={<Link to={`/profile/${author}`}>{author}</Link>} avatar={<Avatar author={author}/>} content={<div>{content}</div>} actions={myActions}/>
        </div>
    )
}

const actionStyle = {
    marginRight: 10
}
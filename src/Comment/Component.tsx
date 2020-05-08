import React, { useState } from 'react'
import { Comment } from 'antd'
import { Link } from 'react-router-dom'
import ReplyEditor from './ReplyEditor'
import { Like, Admin, Comment as Reply} from '../Post/Toolbar/Icons'
import Avatar from '../User/Avatar'
import IComment from './Comment'
import { timeSince } from '../Util/functions'

type CommentProps = {
    id?: string,
    content? : string, // comment data
    author? : string | Object, // id for the author of the component
    parent? : string // id for parent component (Post or other Comments, etc)
    onReply? : any,
    children?: IComment[],
    createdAt?: string | Object
    comment?: IComment,
    handleReply : any
}

/* Comment Individual Component */
export default function Component(props : CommentProps) {
    // I want two ways for this component to work
    let {author, onReply, content, parent, id, children, createdAt} = props
    if (props.comment != undefined) {
         author = props.comment.author
         content = props.comment.content
         parent = props.comment.parent
         children = props.comment.children
         createdAt = props.comment.createdAt
    }

    const [reply, setReply] = useState<string>('')
    const [showReply, setShowReply] = useState<boolean>(false) 

    function dateToString(c : Object | string | undefined) {
        if (c === undefined) return ''
        if (typeof(c) === 'object') return c.toLocaleString()
        return c
    }

    function handleReply() {
        console.log(reply)
        props.handleReply(parent, reply, author)
        setShowReply(false)
        setReply('')
    }

    const myActions = [
        <div style={actionStyle}><Like postID={props.parent}/></div>,
        <div style={actionStyle}><Admin parent={props.parent} parentType='comment'/></div>,
        <div style={actionStyle}><Reply onClick={() => setShowReply(!showReply)} reply/></div>
    ]

    const title = <div><Link to={`/profile/${author}`}>{author}</Link> {timeSince(dateToString(createdAt))} ago</div> 

    return (
        <div key={id} style={{width: 1000}}>
            <Comment author={title} avatar={<Avatar fetch_author={author}/>} content={<div>{content}</div>} actions={myActions}/>
            <div style={{marginLeft: 20, width: 800, marginTop: -20}}>
                <ReplyEditor value={reply} onChange={(e : any) => setReply(e.currentTarget.value)} visible={showReply} onSubmit={handleReply}/>
            </div>
        </div>
    )
}

const actionStyle = {
    marginRight: 10
}
import React, { useState, useEffect } from 'react'
import { Comment, Input } from 'antd'
import { Link } from 'react-router-dom'
import ReplyEditor from './ReplyEditor'
import { Like, EditOrAdmin, Comment as Reply} from '../Post/Toolbar/Icons'
import Avatar from '../User/Avatar'
import IComment from './Comment'
import { timeSince } from '../Util/functions'
import User from '../User/User'

type CommentComponentProps = {
    id?: string,
    comment: IComment,
    handleReply : any,
    handleEdit: any
}

const { TextArea } = Input

/* Comment Individual Component */
export default function Component(props : CommentComponentProps) {

    const [reply, setReply] = useState<string>('')
    const [showReply, setShowReply] = useState<boolean>(false) 
    const [username, setUsername] = useState<string>(props.comment.author) 
    const [editView, setEditView] = useState<boolean>(false)

    useEffect(() => {
        const headers = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch('/u/' + props.comment.author, headers).then((res) => res.json()).then((user : User) => {
            setUsername(user.username)
        })
    }, [])

    function dateToString(c : Object | string | undefined) {
        if (c === undefined) return ''
        if (typeof(c) === 'object') return c.toLocaleString()
        return c
    }

    function handleReply() {
        //console.log(reply)
        props.handleReply(props.comment.parent, reply, props.comment.author)
        setShowReply(false)
        setReply('')
    }

    const myActions = [
        <div style={actionStyle}><Like postID={props.comment.parent}/></div>,
        <div style={actionStyle}><EditOrAdmin parent={props.comment.parent} parentAuthor={props.comment.author} handleEdit={() => setEditView(!editView)} editView={editView}/></div>,
        <div style={actionStyle}><Reply onClick={() => setShowReply(!showReply)} reply/></div>
    ]

    const title = <div><Link to={`/profile/${props.comment.author}`}>{username}</Link> {timeSince(dateToString(props.comment.createdAt))} ago</div> 

    const commentBody = (editView) ? (
        <div style={{maxWidth: 500}}>
            <TextArea value={props.comment.content} onChange={(e : any) => props.handleEdit(props.comment._id, e.currentTarget.value)}/>
        </div>
    ) : (
    <div>{props.comment.content}</div>
    )
    return (
        <div key={props.comment._id} style={{width: 1000}}>
            <Comment author={title} avatar={<Avatar fetch_author={props.comment.author}/>} content={commentBody} actions={myActions}/>
            <div style={{marginLeft: 20, width: 800, marginTop: -20}}>
                <ReplyEditor value={reply} onChange={(e : any) => setReply(e.currentTarget.value)} visible={showReply} onSubmit={handleReply}/>
            </div>
        </div>
    )
}

const actionStyle = {
    marginRight: 10
}
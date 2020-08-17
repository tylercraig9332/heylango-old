import React, { useState, useEffect } from 'react'

import Post from './Post'
import DraftEditor from '../Draft/DraftEditor'
import CommentEngine from '../Comment/Engine'
import PageToolbar from '../Nav/PageToolbar'
import { IconRow, Like, EditOrUser, Admin } from './Toolbar/Icons'
import { message } from 'antd'

export default function View(props : {post_id: string}) {

    const [post, setPost] = useState<Post>()
    const [editView, setEditView] = useState<boolean>()
    const [editContent, setContent] = useState<string>()

    useEffect(() => {
        let p_id = props.post_id
        if (props.post_id === undefined) {
            const urls = window.location.pathname.split('/')
            p_id = urls[3] // The id from the url
        }
        const reqHeader = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch('/p/id/' + p_id, reqHeader).then((res : Response) => (res.status === 200) ? res.json() : '')
        .then((post : Post) => {
            setPost(post)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (post !== undefined && post.content !== editContent) {
            const reqHeader = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({content: editContent})
            }
            fetch('/p/id/' + post.id, reqHeader).then((res : Response) => {
                if (res.status === 200) {
                    message.loading({content: 'Saving', key: 'save'})
                    setTimeout(() => {
                        message.success({ content: 'Saved!', key: 'save', duration: 1 });
                      }, 1000);
                } else {
                    message.destroy()
                    message.info({content: 'Something went wrong with saving your edits', key: 'info'})
                }
            }).catch((err) => console.log(err))
        }
    }, [editContent])
    
    if (post === undefined) return <p>loading...</p>
    if (post.id === undefined) return <p>failed to load</p>
    return (
        <div style={viewContainer}>
            <div>
                    <PageToolbar title={post.title} extra={
                        <IconRow>
                            <Admin parent={post.id} parentType='post'/>
                            <EditOrUser postID={post.id} handleEdit={() => setEditView(!editView)} editView={editView}/>
                            <Like postID={post.id} />
                        </IconRow>
                    }/>
            </div>
            <div style={{padding: 10}}>
                <DraftEditor value={post.content} readOnly={!editView} onChange={(c : string) => {setContent(c)}} hidden={false}/>
            </div>
            <br></br>
            <div>
                <CommentEngine parent_id={post.id}/>
            </div>
            
        </div>
    )
}

const viewContainer = {
    maxWidth: 800,
    marginRight: 'auto',
    marginLeft: 'auto'
}
import React, { useState, useEffect } from 'react'

import Post from './Post'
import DraftEditor from '../Draft/DraftEditor'
import CommentEngine from '../Comment/Engine'
import PageToolbar from '../Nav/PageToolbar'
import { IconRow, Like, EditOrUser } from './Toolbar/Icons'
import { Affix, Button } from 'antd'

export default function View(props : {post_id?: string}) {

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

    function saveEdit() {
        // todo: make a request with editContent
    }
    
    if (post === undefined) return <p>loading...</p>
    return (
        <div style={viewContainer}>
            <div>
                    <PageToolbar title={post.title} extra={
                        <IconRow>
                            <EditOrUser postID={post.id} handleEdit={() => setEditView(!editView)} />
                            <Like postID={post.id} />
                        </IconRow>
                    }/>
            </div>
            <div style={{padding: 10}}>
                <DraftEditor value={post.content} readOnly={!editView} onChange={(c : string) => {setContent(c)}}/>
            </div>
            <div>
                {/*<CommentEngine parent_id={props.post_id}/>*/}
            </div>
            
        </div>
    )
}

const viewContainer = {
    maxWidth: 800,
    marginRight: 'auto',
    marginLeft: 'auto'
}
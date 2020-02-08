import React, { useState, useEffect } from 'react'

import Post from './Post'
import DraftEditor from '../Draft/DraftEditor'
import CommentEngine from '../Comment/Engine'

export default function View(props : {post_id?: string}) {

    const [post, setPost] = useState<Post>()

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
    
    if (post === undefined) return <p>loading...</p>
    return (
        <div style={viewContainer}>
            <h1>{post.title}</h1>
            <div>
                <DraftEditor value={post.content} readOnly/>
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
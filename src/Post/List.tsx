import React, { useEffect, useState } from 'react'
import Post from './Post'
import { message } from 'antd'
import Preview from '../Post/Preview'

type ListProps = {
    by: String | undefined // When undefined we will list all
}

export default function List(props : ListProps) {

    const [posts, setPosts] = useState<Post[]>()

    useEffect(() => {
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/p/all', reqHeaders).then(res => {
            if (res.status === 400) message.error(res.statusText)
            else return res.json()
        }).then(p => setPosts(p))
    }, [])

    return (
        <div>
            {(posts !== undefined && posts!.length > 1) ? posts.map((post) => {
                // Change to component
                return <Preview post={post} key={post.id}/>
            }) : undefined }
        </div>
    )
}
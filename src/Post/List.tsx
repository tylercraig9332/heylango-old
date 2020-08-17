import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'
import { message, Button, Result, Icon, Empty } from 'antd'
import Preview from '../Post/Preview'

type ListProps = {
    by: String | undefined // When undefined we will list all
}

export default function List(props : ListProps) {

    const [posts, setPosts] = useState<Post[]>()
    const [refresh, setRefresh] = useState<boolean>()
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch(`/p/${props.by}`, reqHeaders).then(res => {
            setLoaded(true)
            if (res.status === 400) message.error(res.statusText)
            else return res.json()
            }).then(p => setPosts(p))
    }, [refresh])


    if (!loaded) return (
        <Result 
                title={"Loading Posts"} 
                subTitle={"If this takes too long then there may be an error :/"}
                extra={<Button onClick={(() => setRefresh(!refresh))}>Refresh</Button>} 
                icon={<Icon type="loading" />}
        />)
    return (
        <div>
            {(posts !== undefined && posts!.length >= 1) ? posts.map((post) => {
                return <Preview post={post} key={post.id}/>
            }) : (
            <Empty>
                <Button type="primary" size="large"><Link to="/community/p/new">Create New Post</Link></Button>
            </Empty>
        ) }
        </div>
    )
}
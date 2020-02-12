import React, { useState, useEffect } from 'react'
import { Icon, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

const iconStyle = {fontSize: 20}

const likedStyle = {fontSize: 20, color: '#1890ff'}

export function Like(props : {postId? : string, onClick? : any}) {

    const [liked, like] = useState<boolean>(false)

    // Load in inital like state from server
    useEffect(() => {
        const reqHeaders = {
            //body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch(`/i/${props.postId}`, reqHeaders).then(r => r.json()).then(l => {
            like(l)
        })  
    }, [])

    function handleLike() {
        // send or remove like to server
        const reqHeaders = {
            body: JSON.stringify({parent: props.postId}),
            headers: {
                "Content-Type": "application/json"
            },
            method: (!liked) ? "POST" : "DELETE"
        }
        fetch('/i/', reqHeaders).catch(err => console.error(err))
        like(!liked)
    }

    return (
        <Tooltip title={(liked) ? "Liked!" : "Like"}>
            <Icon type="heart" theme={(liked) ? "filled" : "outlined"} onClick={handleLike} style={(liked) ? likedStyle : iconStyle}/>
        </Tooltip>
    )
}

export function Comment(props: {reply?: boolean, onClick?: any}) {
    return (
        <Tooltip title={(props.reply) ? "Reply" : "Comment"}>
            <Icon type="message" style={iconStyle} onClick={props.onClick}/>
        </Tooltip>
    )
}

export function Favorite() {
    return (
        <Tooltip title="Favorite">
            <Icon type="star" style={iconStyle}/>
        </Tooltip>
    )
}

export function Share() {
    return (
        <Tooltip title="Share">
            <Icon type="share-alt" style={iconStyle}/>
        </Tooltip>
    )
}

export function User(props: {author: string}) {
    return (
        <Tooltip title="View Author">
            <Link to={`/profile/${props.author}`}>
                <Icon type="user" style={iconStyle}/>
            </Link>
        </Tooltip>
    )
}
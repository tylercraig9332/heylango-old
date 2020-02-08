import React, { useState } from 'react'
import { Icon, Tooltip } from 'antd'

const iconStyle = {fontSize: 20}

const likedStyle = {fontSize: 20, color: '#1890ff'}

export function Like(props : {postId? : string, onClick? : any}) {

    const [liked, like] = useState<boolean>(false)

    function handleLike() {
        like(!liked)
        // TODO: make request to server and handle possible errors
        props.onClick()
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

export function User() {
    return (
        <Tooltip title="View Author">
            <Icon type="user" style={iconStyle}/>
        </Tooltip>
    )
}
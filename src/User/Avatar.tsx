import React, { useState, useEffect } from 'react'
import { Avatar, Tooltip } from 'antd'
import User from './User'

export default function UserAvatar(props : {author? : string | Object}) {

    const [aData, setData] = useState<string>('Anon')
    const [username, setUsername] = useState<string>('Anonymous')

    useEffect(() => {
        const headers = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch('/u/' + props.author, headers).then((res) => res.json()).then((user : User) => {
            console.log(user)
            setData(user.username.charAt(0))
            setUsername(user.username)
        })
    }, [])

    return (
        <Tooltip title={`${username}`}>
            <Avatar style={{backgroundColor: '#1890ff'}}>{username}</Avatar>
        </Tooltip>
    )
}
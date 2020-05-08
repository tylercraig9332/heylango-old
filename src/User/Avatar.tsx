import React, { useState, useEffect } from 'react'
import { Avatar, Tooltip } from 'antd'
import User from './User'

export default function UserAvatar(props : {fetch_author? : string | Object, user?: User}) {

    const [aData, setData] = useState<string>('Anon')
    const [username, setUsername] = useState<string>('Anonymous')

    useEffect(() => {
        let f = props.fetch_author
        if (props.fetch_author === undefined) {
            f = 'me'
        }
        const headers = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch('/u/' + f, headers).then((res) => res.json()).then((user : User) => {
            console.log(user)
            setData(user.username.charAt(0))
            setUsername(user.username)
        })
    }, [props.fetch_author])

    useEffect(() => {
        let u = 'Anon'
        if (props.user !== undefined) {
            u = props.user.username
        }
        setUsername(u)
    }, [props.user])

    return (
        <Tooltip title={`${username}`}>
            <Avatar style={{backgroundColor: '#1890ff'}}>{username}</Avatar>
        </Tooltip>
    )
}
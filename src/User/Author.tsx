import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//import Avatar from './Avatar'
import { Avatar, Tooltip } from 'antd'
import BadgePanel from './Badge/Panel'
import User from './User'

export default function Author(props : {user_id?: string}) {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        let u_id = props.user_id
        if (props.user_id === undefined) u_id = 'me'
        const headers = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch('/u/' + u_id, headers).then((res) => res.json()).then((user : User) => {
            setUser(user)
        })
    }, [])


    if (user === undefined) return null // TODO: make this return a skeleton instead.
    return (
        <div style={container}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Tooltip title={user.username}>
                    <Avatar size="large" style={{backgroundColor: '#1890ff'}}>{user?.username}</Avatar>
                </Tooltip>
            </div>
            <div style={{marginLeft: '5px'}}>
                <h3><Tooltip title="View Profile">
                        <Link to={`/profile/${user.id}`}>{user?.username}</Link>
                </Tooltip></h3>
                <BadgePanel />
            </div>
        </div>
    )
}

const container = {
    display: 'flex',
    //border: '1px solid',
    //width: 400,
    maxWidth: '95%',
} as React.CSSProperties
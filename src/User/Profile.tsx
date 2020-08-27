import React, { useEffect, useState } from 'react'
import User from './User'
import Avatar from './Avatar'
import Loading from '../Util/Loading'
import ListPost from '../Post/List'
import IBadge from './Badge/IBadge'
import BadgePanel from './Badge/Panel'

import { message, Descriptions } from 'antd'

export default function Profile() {

    const [user, setUser] = useState<User>()
    const [loaded, setLoaded] = useState<boolean>(false)
    const [badges, setBadges] = useState<IBadge[]>()

    useEffect(() => {
        //console.log(window.location.pathname.split('/')[2])
        let p = window.location.pathname.split('/')[2]
        if (p === undefined) p = 'me'
        const reqHeaders = {
          headers: {
              "Content-Type": "application/json"
          },
          method: "GET"
        }
        fetch('/u/' + p, reqHeaders).then((res : Response) => {
            if (res.status === 400) throw new Error("User not logged in")
            return res.json()
        })
        .then((me : User) => {
            let d = new Date(me.createdAt)
            me.createdAt = d.toUTCString()
            setUser(me)
            setLoaded(true)
        })
        .catch(e => {
            console.log(e)
            message.error(e.toString())
            setLoaded(true)
        })
        fetch('/b/' + p, reqHeaders).then(res => {
            if (res.status === 400) console.log(res)
            return res.json()
        }).then(b => {
            setBadges(b)
        })
    }, [])

    // TODO: handle loading and other possible error views
    if (!loaded) return (<Loading message="Loading" />)
    if (user === undefined) return (<div><h1>Profile</h1></div>)
    return (
        <div>
            <h1>{/*<Avatar user={user} />*/} {user.username} <span style={{padding: 5}}></span><BadgePanel badges={badges} /></h1>
            <hr></hr>
            <Descriptions bordered title="Profile Details:">
                <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Interaction Points (ip)">{user.meta.ip}</Descriptions.Item>
                <Descriptions.Item label="Date Joined">{user.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Account Identifier">{user.id}</Descriptions.Item>
                <Descriptions.Item label="User Role">{user.meta.role}</Descriptions.Item>
            </Descriptions>
            <br></br>
            <hr></hr>
            <h3><strong>Recent Posts:</strong></h3>
            <ListPost by={`u/${user.id}`} />
        </div>
    )
}

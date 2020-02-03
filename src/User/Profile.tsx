import React, { useEffect, useState } from 'react'
import User from './User'

import { message } from 'antd'

export default function Profile() {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        const reqHeaders = {
          headers: {
              "Content-Type": "application/json"
          },
          method: "GET"
        }
        fetch('/u/me', reqHeaders).then((res : Response) => {
            if (res.status === 400) throw new Error("User not logged in")
            return res.json()
        })
        .then((me : User) => {
            setUser(me)
        })
        .catch(e => {
            console.log(e)
            message.error(e.toString())
        })
    }, [])

    // TODO: handle loading and other possible error views
    if (user === undefined) return (<div><h1>Profile</h1></div>)
    return (
        <div>
            <h1>Profile</h1>
            <h3>Welcome {user.username}!</h3>
        </div>
    )
}

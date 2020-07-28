import React, { useEffect, useState } from 'react'

import {Button, Result} from 'antd'

import {Link} from 'react-router-dom'

export default function Logout() {
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        // TODO: make request to logout
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/u/logout', reqHeaders).then((res) => {
            window.sessionStorage.removeItem('userId')
            window.sessionStorage.removeItem('username')
            window.sessionStorage.removeItem('userRole')
            setSuccess(res.status === 200)
            setError(res.status === 400)
        })
    }, [])

    if (success) return <Result status="success" title="Successfully logged out!" extra={<Button type="primary"><Link to='/portal'>Login</Link></Button>} />
    return (error) ? <Result status="error" title="An error has occurred" /> : <Result status="info" title="Loggin out"/>

}


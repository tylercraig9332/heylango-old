import React, { useState, useEffect } from 'react'
import List from './List'
import {Link} from 'react-router-dom'
import { message, Result, Button } from 'antd'

export default function Home() {

    const [logged, setLogged] = useState<boolean>(false)

    useEffect(() => {
        let l = window.sessionStorage.getItem('logged')
        let t = false
        if (l == 'true') t = true
        if (!t) {
            message.info('Must be logged in to view saved words and expressions')
        }
        setLogged(t)
    }, [])

    const extraComp = (
        <Link to={'/portal'}>
                <Button type="primary" key="portal">
                    Login
                </Button>
        </Link>
    )

    if (!logged) return <Result title="Please Login to view saved words and expressions" extra={extraComp} />
    return (
        <div>
            <h1>Saved Words and Expressions</h1>
            <p>Words saved from Langos will appear here</p>
            <hr></hr>
            <List />
        </div>
    )
}
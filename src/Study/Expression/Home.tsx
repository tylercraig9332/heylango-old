import React, { useState, useEffect } from 'react'
import List from './List'
import { message } from 'antd'
import NotLogged from '../../User/NotLogged'

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

    if (!logged) return <NotLogged message={'to view saved words and expressions'}/>
    return (
        <div>
            <h1>Saved Words and Expressions</h1>
            <p>Words saved from Langos will appear here</p>
            <hr></hr>
            <List />
        </div>
    )
}
import React, { useEffect, useState } from 'react'
import IVidLango from '../VidLango'
import Preview from '../Preview'
import { Button, message } from 'antd'
import { Link } from 'react-router-dom'

export default function Home() {

    const [langos, setLangos] = useState<Array<IVidLango>>([])

    useEffect(() => {
        fetch('/l/vid/list').then(res => {
            if (res.status !== 200) {
                message.error(res.statusText)
            }
            return res.json()
        }).then(data => setLangos(data))
    }, [])

// https://www.youtube.com/watch?v=x7R8joj0PHE
    return (
        <div>
            <div style={flexHeader}>
                <h1>Browse VidLangos</h1>
                <Link to="/learn/vid/create"><Button type="primary" size="large">Create New VidLango</Button></Link>
            </div>
            <hr></hr>
            <div style={flexBody}>
            {
                langos.map((lango) => {
                    return <Preview vidLango={lango} />
                })
            }
            </div>
        </div>
    )
}

const flexHeader = {
    display: 'flex',
    justifyContent: 'space-between'
} as React.CSSProperties

const flexBody = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
} as React.CSSProperties
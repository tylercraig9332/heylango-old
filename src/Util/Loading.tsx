import React, { useEffect, useState } from 'react'
import {Icon, Spin, message} from 'antd'

export default function Loading(props : {message?: string | React.ReactElement}) {

    const [longTime, setLongTime] = useState<boolean>(false)

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            //message.warning(`This item is taking a while to load. Please try refreshing`)
            setLongTime(true)
        }, 5000)
        return function onReturn() {
            window.clearTimeout(timeout)
            return;
        }
    } ,[])

    if (longTime) return <div style={pageWrap}><p style={breakStyle}>This item has taken a while to load. Please try refreshing</p></div>
    return (
        <div style={pageWrap}>
            <Spin indicator={<Icon type="loading" style={{fontSize: 48}} spin/>}/>
            <p style={breakStyle}>{props.message}</p>
        </div>
    )
}

const pageWrap = {
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: '100%',
    width: '100%',
    padding: '20px'
} as React.CSSProperties

const breakStyle = {
    display: 'flex',
    flexBasis: '100%',
    height: 0,
    justifyContent: 'center'
} as React.CSSProperties
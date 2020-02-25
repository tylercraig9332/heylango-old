import React from 'react'
import {Icon, Spin} from 'antd'

export default function Loading(props : {message?: string | React.ReactElement}) {
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
} as React.CSSProperties

const breakStyle = {
    display: 'flex',
    flexBasis: '100%',
    height: 0,
    justifyContent: 'center'
} as React.CSSProperties
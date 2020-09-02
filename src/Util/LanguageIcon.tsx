import React from 'react'
import {Tooltip} from 'antd'
export default function LanguageIcon(props : {src?: string, name?: string}) {
    return (
        <div style={container}>
            <Tooltip title={`Learn ${props.name}`} placement={'topLeft'}>
                <img src={props.src} height={60} width={90}/>
            </Tooltip>
        </div>
    )
}

const container = {
    margin: '10px',
    height: 60,
    width: 90
} as React.CSSProperties
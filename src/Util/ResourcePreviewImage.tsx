import React from 'react'
import { Avatar } from 'antd'
export default function ResourcePreviewImage(props : {src? : string}) {

    if (props.src === undefined || props.src.length < 4) return <Avatar icon="read" size={75}/>
    return (
        <Avatar shape="square" src={props.src} size={75}/>
    )
}
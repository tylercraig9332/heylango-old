import React from 'react'
import 'antd/dist/antd.css'; // antd generic theme

export default function LaunchContainer(props : any) {
    return (
        <div className="launch">
            {props.children}
        </div>
    )
}
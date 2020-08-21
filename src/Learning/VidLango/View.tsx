import React from 'react'
import VideoPlayer from './VideoPlayer'

export default function View() {

    return (
        <div>
            <h1>VidLango</h1>
            <hr></hr>
            <div style={videoStyleWrap}>
                <VideoPlayer video_id="OM5WiuSCxwk" visible/>
                <p>This is a test... I would like to put subtitle translations here and other tools to help parse videos</p>
            </div>
        </div>
    )
}

const videoStyleWrap = {
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto'
} as React.CSSProperties
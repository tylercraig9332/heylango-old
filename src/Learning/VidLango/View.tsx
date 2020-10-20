import React from 'react'
import InteractivePlayer from './InteractivePlayer'
//import VideoPlayer from './VideoPlayer'

export default function View() {

    return (
        <div>
            <h1>VidLango Test</h1>
            <hr></hr>
            <div style={videoStyleWrap}>
                <InteractivePlayer video_id="3BlqCoutRrI"/>
            </div>
        </div>
    )
}

const videoStyleWrap = {
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto'
} as React.CSSProperties
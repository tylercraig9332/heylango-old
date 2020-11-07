import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import Loading from '../../../Util/Loading'
import SubtitleViewer from '../Player/Components/SubtitleViewer'
import InteractivePlayer from '../Player/YoutubePlayer'
import IVidLango from '../VidLango'
//import VideoPlayer from './VideoPlayer'

export default function View(props : {vidLango : IVidLango | undefined, preview?: boolean}) {

    const [vidLango, setVidLango] = useState<IVidLango>()
    
    useEffect(() => {
        if (props.vidLango === undefined) {
            // TODO: handle error or load from url
            const urls = window.location.pathname.split('/')
            const id = urls[3]
            fetch('/l/vid/' + id).then(res => {
                if (res.status !== 200) {
                    message.error(res.statusText)
                    return
                }
                return res.json()
            }).then(data => {
                const v = {
                    ...data[0],
                    snippet: JSON.parse(data[0].snippet)
                }
                setVidLango(v)
            })
        } else {
            setVidLango(props.vidLango)
        }
    }, [])

    if (vidLango === undefined) return <Loading message="Loading VidLango..." />
    return (
        <div>
            { (props.preview) ?
                <h3>{vidLango.snippet?.title}</h3> :
                <h1>{vidLango.snippet?.title}</h1>
            }
            <hr></hr>
            <div style={videoStyleWrap}>
                <InteractivePlayer video_id={vidLango.video_id} captions={vidLango.captions} preview={props.preview}/>
            </div>
        </div>
    )
}

const videoStyleWrap = {
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto'
} as React.CSSProperties
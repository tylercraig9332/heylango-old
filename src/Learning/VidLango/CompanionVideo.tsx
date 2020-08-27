import React, { useState, useEffect } from 'react'
import VideoPlayer from './VideoPlayer'
import {Modal, Col, Input, Button, message, Icon} from 'antd'

export default function CompanionVideo(props : {onChange: any}) {

    const [videoModal, setVideoModal] = useState<boolean>(false)
    const [videoUrl, setUrl] = useState<string>('')
    const [videoId, setVideoId] = useState<string>('')

    useEffect(() => {
        props.onChange(videoId)
    }, [videoId])

    function parseVideoID(url : string) {
        let video_id = url.split('v=')[1];
        if (video_id == undefined) {
            video_id = url.split('/')[3]
            if (video_id == undefined) {
                message.error('url could not be processed');
                return ''
            }
        }
        // TODO: add handleing for if the url does not work
        let ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        console.log(video_id)
        return video_id
    }

    function onOk() {
        setVideoModal(false)
        setVideoId(parseVideoID(videoUrl))
    }

    if (videoId.length > 1) return <div 
            style={{
                minHeight: '394px',
                minWidth: '700px'
            }}> 
        <VideoPlayer video_id={videoId} visible />
    </div>
    return (
        <React.Fragment>
            <Modal title="Add Video" visible={videoModal} onCancel={() => setVideoModal(false)} onOk={onOk}>
                Paste YouTube Link 
                <Input value={videoUrl} onChange={(e) => setUrl(e.target.value)}/>
                (Only YouTube is currently supported)
            </Modal>
            <Button onClick={() => setVideoModal(!videoModal)}>Add Companion Video <Icon type="youtube" /></Button>
        </React.Fragment>
    )
}
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SheetView from './SheetView'
import VideoPlayer from '../VidLango/VideoPlayer'
import { Button, Result, Upload, message, Row, Col, Modal, Input, Icon } from 'antd'

export default function Create() {

    const [langoSheet, setlangoSheet] = useState<Object | undefined>()
    const [success, setSuccess] = useState<boolean>(false)
    const [successLink, setSuccessLink] = useState<string>('')
    

    function save() {
        // send sheet to server and handle response / success
        //console.log(langoSheet)
        const reqHeaders = {
            body: JSON.stringify(langoSheet),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/l/m/', reqHeaders).then(res => {
            // todo: get it from res and set it so result button can use it.
            //setSuccessLink(`/learn/m/${res.id}`)
            setSuccess(res.status === 200)
            return res.json()
        }).then(lango => {console.log(lango);setSuccessLink(`/learn/m/${lango._id}`)})
    }

    /** This function will be called by subcomponents when it updates itself so this component will be updated.
     * @var {Object} e - langoSheet data.
     */
    function extract(e : Object) {
        // saves the local object to prepare it for the save
        // I also might want to make a handler to save this object to the local session
        setlangoSheet(e)
        //console.log(e)
    }

    const uploadProps = {
        name: 'file',
        action: '/l/bi/audio',
        headers: {
          authorization: 'authorization-text',
        },
        accept:"audio/*",
        onChange(info : any) {
            console.log(info)
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
      };

if (success) return (<Result status="success" title={"Lango Sheet Successfully Created!"} 
                                extra={<Button type="primary"><Link to={successLink}>View</Link></Button>}/>)
    return (
        <div style={containerStyle}>
            <h1>Create New Lango Sheet</h1>
            <SheetView send={extract} />
            <div style={{padding: 10, display: 'flex', justifyContent: 'center'}}>
                <Row type="flex" justify="start">
                    <CompanionVideo />
                    <Col span={3}>
                        <Upload {...uploadProps}>
                            <Button>
                            Upload Audio <Icon type="upload" />
                            </Button>
                        </Upload>
                    </Col>
                </Row>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', padding: 20}}>
                <Button type="primary" size="large" onClick={save} block style={{width: '80%'}}>Create New Lango</Button>
            </div>
        </div>
    )
}


export function CompanionVideo() {

    const [videoModal, setVideoModal] = useState<boolean>(false)
    const [videoUrl, setUrl] = useState<string>('')
    const [videoId, setVideoId] = useState<string>('')

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

    if (videoId.length > 1) return <VideoPlayer videoID={videoId} visible />
    return (
        <Col span={16}>
            <Modal title="Add Video" visible={videoModal} onCancel={() => setVideoModal(false)} onOk={onOk}>
                Paste YouTube Link 
                <Input value={videoUrl} onChange={(e) => setUrl(e.target.value)}/>
                (Only YouTube is currently supported)
            </Modal>
            <Button onClick={() => setVideoModal(!videoModal)}>Add Companion Video <Icon type="youtube" /></Button>
        </Col>
    )
}


const containerStyle = {
    width: '95%',
    maxWidth: '800px',
    marginRight: 'auto',
    marginLeft: 'auto'
} as React.CSSProperties
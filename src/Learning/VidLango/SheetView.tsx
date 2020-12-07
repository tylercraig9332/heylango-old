import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Button, message, Popconfirm, Icon } from 'antd'
import View from './Pages/View'
import AddCaption from './Player/Components/AddCaption'

export default function SheetView(props : {send? : any, recieve?: any}) {

    const [video_id, setVideo_id] = useState<string>()
    const [video_url, setVideo_url] = useState<string>('')

    const [showPreview, setShow] = useState<boolean>(false)
    const [vidLango, setVidLango] = useState<any>()

    const [render, setUpdate] = useState<boolean>(false)

    useEffect(() => {
        // Refreshes data saved from local storage in case of refresh
        const l : any = window.localStorage.getItem('createLango')
        if (l !== null && l !== undefined && l.length > 0) {
            const lango = JSON.parse(l)
            console.log(lango)
            setVidLango(lango)
            setVideo_id(lango.video_id)
            setShow(true)
        }
    }, [])

    useEffect(() => {
        setUpdate(false)
    }, [render])

    useEffect(() => {
        setVideo_id(parseVideoID(video_url))
    }, [video_url])

    function importData() {
        const reqHeader = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch('/l/vid/yt/' + video_id, reqHeader).then(res => {
            if (res.status !== 200) message.error(res.statusText)
            else return res.json()
        }).then(l => {
            /*const l = {
                ...data,
                snippet: JSON.parse(data.snippet)
            }
            console.log(l)*/
            setVidLango(l)
            setShow(true)
            // Save to localStorage in case of refresh
            window.localStorage.setItem('createLango', JSON.stringify(l))
        })
    }

    function parseVideoID(url : string) {
        if (url.length === 0) return ''
        let video_id = url.split('v=')[1];
        if (video_id == undefined) {
            video_id = url.split('/')[3]
            if (video_id == undefined) {
                message.error('url could not be processed');
                return ''
            }
        }
        let ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id
    }

    function updateCaptions(captions : any, updateType: string) {
        let v = vidLango
        let c = [...v.captions]
        if (updateType === 'add') {
            c.push(captions)
        }
        else if (updateType === 'remove') {
            c.splice(captions, 1)
            message.success(`Captions removed successfully!`);
        }
        v.captions = c
        setVidLango(v)
        setUpdate(true)
        window.localStorage.setItem('createLango', JSON.stringify(v))
    }

    function cancel() {
        window.localStorage.removeItem('createLango')
        document.location.reload()
    }

    async function save() {
        const reqHeaders = {
            body: JSON.stringify(vidLango),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT"
        }
        fetch('/l/vid/' + vidLango._id, reqHeaders).then(res => {
            if (res.status !== 200) {
                message.error('An error has occured')
            }
            else {
                window.localStorage.removeItem('createLango')
                window.location.href = '/learn/vid/' + vidLango._id
            }
        })
    }

    const importFromYouTube = (
        <div>
            <span style={{color: 'darkgray'}}>Paste YouTube Link</span>
            <Row type="flex" justify="start" >
                <Col span={10}>
                    <Input value={video_url} onChange={(e : any) => setVideo_url(e.target.value)}/>
                </Col>
            </Row>
            <span style={{color: 'darkgray'}}>Or Video ID</span>
            <Row type="flex" justify="start" >
                <Col span={10}>
                    <Input value={video_id} onChange={(e : any) => setVideo_id(e.target.value)}/>
                </Col>
                
            </Row>
            <div style={{margin: 10}}></div>
            <Row>
                <Col span={4}>
                    <Button type="primary" onClick={importData}>Import Data</Button>
                </Col>
            </Row>
        </div>
    )

    if (!showPreview) return importFromYouTube
    return (
        <div>
            <span style={{color: 'darkgray'}}>Preview</span>
            <View key={`${render}view`} vidLango={vidLango} preview={true}/>
            <span style={{color: 'darkgray'}}>Captions</span>
            <AddCaption key={`${render}addCap`} onChange={updateCaptions} captions={vidLango.captions} />
            <Button type="primary" onClick={save} block>Save VidLango</Button>
            <div style={{padding: 5}}></div>
            <Popconfirm title="Are you sure you want to cancel?" onConfirm={cancel} okText="Yes" cancelText="No" icon={<Icon type="exclamation-circle" style={{color: 'red'}}/>}>
                <Button block>Cancel</Button>
            </Popconfirm>
        </div>
    )
}
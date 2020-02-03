import React, { useState } from 'react'
import Post from './Post'
import s from '../Util/static.json'

import { Input, Row, Col, Upload, Button, Icon, Cascader } from 'antd'

import Editor from '../Draft/DraftEditor'

export default function Create() {

    const [title, setTitle] = useState<string>()
    const [image, setImage] = useState<any>()
    const [rawContent, setRawContent] = useState<string>()
    const [community, setCommunity] = useState<string>()

    React.useEffect(() => {
        // TODO: I am going to make a localSession save for the post in case something happends to the client.
        // The broswer will save the data
    })

    function post() {
        const postData = {
            "title": title,
            "image": image,
            "content": rawContent,
            "community": community
        }
        console.log(postData)
    }


    return (
        <div style={container}>
            <h1>Create New Post</h1>
            <hr></hr>
            <Row style={row}>
                <Input size="large" placeholder="title" onChange={(e) => setTitle(e.currentTarget.value)}/>
            </Row>
            <Row style={row} type="flex" justify="space-between">
                <Col>
                    <Upload listType="picture">
                        <Button><Icon type="upload" /> Upload Preview Image (optional)</Button>
                    </Upload>
                </Col>
                <Col> 
                        <Cascader 
                            options={s.cascade} placeholder="Select Language Community" 
                            style={{width: 275}} expandTrigger="hover"
                            onChange={(e) => setCommunity(e.pop())}
                        />
                </Col>
            </Row>
            <Row style={row}>
                <Editor placeholder="text (optional)" onChange={(c : string) => setRawContent(c)}/>
            </Row>
            <Row style={row}>
                <Button size="large" onClick={post} type="primary" block>Post</Button>
            </Row>
        </div>
    )
}

const container = {
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto'
} as React.CSSProperties

const row = {
    marginTop: 10, 
}
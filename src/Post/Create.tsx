import React, { useState } from 'react'
import Post from './Post'
import language from '../Util/language.json'
import { Link } from 'react-router-dom'
import { Input, Row, Col, Upload, Button, Icon, Cascader, Result } from 'antd'

import Editor from '../Draft/DraftEditor'
import { LanguageSelect } from '../Util/Select'
import NotLogged from '../User/NotLogged'

export default function Create() {

    const [title, setTitle] = useState<string>()
    const [image, setImage] = useState<any>()
    const [rawContent, setRawContent] = useState<string>()
    const [community, setCommunity] = useState<string>()

    const [success, pass] = useState<string[]>(['unposted', '']) // [status, result]

    React.useEffect(() => {
        // TODO: I am going to make a localSession save for the post in case something happends to the client.
        // The broswer will save the data
    })

    function post() {
        const postData = {
            "title": title,
            //"image": image,
            "content": rawContent,
            "community": community
        }
        const reqHeaders = {
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/p/', reqHeaders).then(async (res) => {
            if (res.status == 200) {
                console.log("Success!")
                let obj = await res.json()
                console.log(obj)
                pass(['success', obj[0].id])
            } else {
                console.log(res.statusText)
                alert(res.statusText)
                pass(['error', res.statusText])
            }
        })
        console.log(postData)
    }

    if (success[0] === 'success') {
        return (
            <Result 
                title="Post Created Successfully!" 
                extra={<Link to={`/community/p/${success[1]}`}><Button type="primary">View Post</Button></Link>}
            />
        )
    } else if (success[0] === 'error') {
        return (
        <Result
            status="error"
            title="Something went wrong"/>
        )
    }

    if (window.sessionStorage.getItem('userId') === null || window.sessionStorage.getItem('userId') === '') return <NotLogged message="to make a post"/>
    return (
        <div style={container}>
            <h1>Create New Post</h1>
            <hr></hr>
            <Row style={row}>
                <Input size="large" placeholder="title" onChange={(e) => setTitle(e.currentTarget.value)}/>
            </Row>
            <Row style={row} type="flex" justify="space-between">
                {/*<Col>
                    <Upload listType="picture">
                        <Button><Icon type="upload" /> Upload Preview Image (optional)</Button>
                    </Upload>
                </Col>*/}
                <Col>
                    <div style={{width: 300}}>
                        <LanguageSelect 
                            onChange={(e : any) => setCommunity(e)} value={community} placeholder={'Select Language Community'}
                        />
                    </div> 
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
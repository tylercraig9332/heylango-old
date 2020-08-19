import React, { useState, useEffect } from 'react'
import Editor from '../../Draft/DraftEditor'
import LanguageSelect from '../../Util/LanguageSelect'
import {Row, Col, Button, Input} from 'antd'

export default function SheetView(props :  {readOnly?: boolean, send? : any, id?: string}) {


    const [enablePreview, setPreview] = useState<boolean>(false)
    
    const [content, setContent] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [language, setLanguage] = useState<string>()

    useEffect(() => {
        if (!props.readOnly && props.send != undefined) {
            props.send({
                title: title,
                content: content,
                description: description,
                language: language
            })
        }
    }, [content, title, description, language])

    return (
        <div>
            <Row type="flex" justify="start" align="bottom">
                <span style={{color: 'darkgray'}}>Title</span>
                <Input value={title} size='large' onChange={(e : any) => setTitle(e.target.value)}/>
                <span style={{margin: 5}}></span>
            </Row>
            <Row type="flex" justify="start">
                <span style={{color: 'darkgray'}}>Description</span>
                <Input.TextArea value={description} onChange={(e : any) => setDescription(e.target.value)}/>
                <span style={{margin: 5}}></span>
            </Row>
            <Row type="flex" justify="start">
                <span style={{color: 'darkgray'}}>Language</span>
                <LanguageSelect value={language} onChange={setLanguage} />
            </Row>
            <hr></hr>
            <Row type="flex" justify="start">
                <span style={{color: 'darkgray'}}>Content</span>
                    <Editor value={content} onChange={setContent} 
                        readOnly={enablePreview}
                        wordLearner={enablePreview}
                        style={editorStyle}
                        wrap />
                
            </Row>
            <Row type="flex" justify="center">
                <Col><Button type="primary" onClick={() => setPreview(!enablePreview)}>Preview Word Learner</Button></Col>
            </Row>
        </div>
    )
}



const editorStyle = {
    width: '100%',
    marginBottom: 20,
    fontSize: 20
} as React.CSSProperties
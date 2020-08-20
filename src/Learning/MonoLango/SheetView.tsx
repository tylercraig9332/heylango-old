import React, { useState, useEffect } from 'react'
import Editor from '../../Draft/DraftEditor'
import LanguageSelect from '../../Util/LanguageSelect'
import {Row, Col, Button, Input, Icon, Modal} from 'antd'
import PreviewImage from '../../Util/ResourcePreviewImage'

export default function SheetView(props :  {readOnly?: boolean, send? : any, id?: string}) {


    const [enablePreview, setPreview] = useState<boolean>(false)
    const [enableImageModal, setImageModal] = useState<boolean>(false)
    const [previewComplete, setPreviewComplete] = useState<boolean>(false)
    
    const [content, setContent] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [language, setLanguage] = useState<string>()
    const [imgSrc, setImgSrc] = useState<string>()

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


    const previewImageModal = (
        <Modal 
            title="Add Preview Image"
            visible={enableImageModal}
            onCancel={() => setImageModal(false)}
            onOk={() => {
                setPreviewComplete(true)
                setImageModal(false)
            }}
        >
            Image URL
            <Input value={imgSrc} placeholder={'leave empty to use default image'} onChange={(e : any) => setImgSrc(e.currentTarget.value)} />
            upload feaute coming soon...
        </Modal>
    )
        

    return (
        <div>
            <Row type="flex" justify="start" align="bottom">

                    <span style={{color: 'darkgray'}}>Title</span>
                    <Input value={title} size='large' onChange={(e : any) => setTitle(e.target.value)}/>
                    <span style={{margin: 5}}></span>
            </Row>
            <span style={{color: 'darkgray'}}>Preview</span>
            <Row type="flex" justify="start">
                <Col span={6}>
                    <Button onClick={() => setImageModal(true)}>
                    Add Preview Image <Icon type="picture" />
                    </Button>
                </Col>
                <Col span={3}>
                {(previewComplete) ? <PreviewImage src={imgSrc} /> : null}
                </Col>
            </Row>
            <span style={{margin: 5}}></span>   
            <Row type="flex" justify="start">
                <span style={{color: 'darkgray'}}>Description</span>
                <Input.TextArea value={description} rows={1} autoSize={true} onChange={(e : any) => setDescription(e.target.value)}/>
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
            {previewImageModal}
        </div>
    )
}



const editorStyle = {
    width: '100%',
    marginBottom: 20,
    fontSize: 20,
    height: 300
} as React.CSSProperties
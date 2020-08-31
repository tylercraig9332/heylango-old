import React, { useState, useEffect } from 'react'
import Editor from '../../Draft/WordLearner/WordLearner'
import {LanguageSelect, CEFRSelect} from '../../Util/Select'
import {Row, Col, Button, Input, Icon, Modal, Upload, message} from 'antd'
import PreviewImage from '../../Util/ResourcePreviewImage'
import CompanionVideo from '../VidLango/CompanionVideo'

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

export default function SheetView(props :  {readOnly?: boolean, send? : any, id?: string}) {


    const [enablePreview, setPreview] = useState<boolean>(false)
    const [enableImageModal, setImageModal] = useState<boolean>(false)
    const [previewComplete, setPreviewComplete] = useState<boolean>(false)
    
    const [content, setContent] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [language, setLanguage] = useState<string>()
    const [difficulty, setDifficulty] = useState<string>()
    const [video_id, setVideo_id] = useState<string>()
    const [imgSrc, setImgSrc] = useState<string>()

    useEffect(() => {
        if (!props.readOnly && props.send != undefined) {
            props.send({
                title: title,
                content: content,
                description: description,
                language: language,
                difficulty: difficulty,
                video_id: video_id,
                imgSrc: imgSrc
            })
        }
    }, [content, title, description, language, difficulty, video_id, imgSrc])


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
            <p>upload feaute coming soon...</p>
            <Button onClick={() => {
                setImgSrc(`https://img.youtube.com/vi/${video_id}/sddefault.jpg`)
                setPreviewComplete(true)
                setImageModal(false)
            }}>Use Youtube Video Thumbnail</Button>
        </Modal>
    )
        

    return (
        <div>
            <Row type="flex" justify="start" align="bottom">

                    <span style={{color: 'darkgray'}}>Title</span>
                    <Input value={title} size='large' onChange={(e : any) => setTitle(e.target.value)}/>
                    <span style={{margin: 5}}></span>
            </Row>
            <span style={{color: 'darkgray'}}>Video</span>
            <div style={{paddingRight: 10, display: 'flex', justifyContent: 'start'}}>
                <Row type="flex" justify="start" align="middle">
                    <Col span={14}>
                        <CompanionVideo onChange={setVideo_id}/>
                    </Col>
                    {/*<Col span={2}>
                        Or
                    </Col>
                    <Col span={7}>
                        <Upload {...uploadProps}>
                            <Button>
                            Upload Audio <Icon type="upload" />
                            </Button>
                        </Upload>
                    </Col>*/}
                    <span style={{margin: 5}}></span>
                </Row>
            </div>
            <span style={{color: 'darkgray', marginTop: '5px'}}>Image Preview</span>
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
            </Row>
            <Row type="flex" justify="start">
                <span style={{color: 'darkgray'}}>Language</span>
                <LanguageSelect value={language} onChange={setLanguage} />
            </Row>
            <Row type="flex" justify="start">
                <span style={{color: 'darkgray'}}>Difficulty <a href="https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages">(CEFR)</a></span>
                <CEFRSelect value={difficulty} onChange={setDifficulty} />
            </Row>
            <hr></hr>
            <Row type="flex" justify="start">
                <span style={{color: 'darkgray'}}>Content</span>
                    <Editor value={content} onChange={setContent} 
                        readOnly={enablePreview}
                        style={editorStyle}
                        wordsPerPage={40}
                        lineHeight={'60px'}
                        fontSize={'25px'}
                    />
                
            </Row>
            <Row type="flex" justify="end">
                <Col style={{marginTop: '5px'}}><Button type="primary" onClick={() => setPreview(!enablePreview)}>Preview Word Learner</Button></Col>
            </Row>
            {previewImageModal}
        </div>
    )
}



const editorStyle = {
    width: '100%',
    marginBottom: 20,
    fontSize: 20,
    minHeight: 300
} as React.CSSProperties
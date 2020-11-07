import React, { useState, CSSProperties } from 'react'
import { Button, Modal, Upload, Icon, message, Popconfirm } from 'antd'

export default function AddCaption(props : {onChange : any, captions: Array<any>}) {
    const [showView, setShow] = useState<boolean>(false)

    React.useEffect(() => {
        
    }, [])

    function onUpload(info : any) {
        if (info.file.status !== 'uploading') {
            console.info('uploading...', info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`Captions added successfully!`);
            props.onChange(info.file.response, 'add')
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    const uploadProps = {
        name: 'sub',
        action: `/l/vid/sub`,
        onChange: onUpload
    }

    return (
        <div style={{padding: '0px 0 20px 0'}}>
            <Button type="primary" onClick={() => setShow(true)}>Add Captions</Button>
            <Modal title="Add Captions" visible={showView} onOk={() => setShow(false)} onCancel={() => setShow(false)}>
                <div style={displayList}>
                    <div style={{color: 'darkgray'}}>Upload Subtitle (only SRT file type supported)</div>
                    <Upload {...uploadProps}>
                        <Button>
                            <Icon type="upload" /> Select File
                        </Button>
                    </Upload>
                    <div style={{color: 'darkgray', marginTop: '10px'}}>Import from YouTube</div>
                    <Button>
                    <Icon type="youtube" /> Check Availability
                    </Button>
                    <div style={{color: 'darkgray', marginTop: '10px'}}>Added Captions</div>
                    <ul>
                    {
                        props.captions.map((caption, i) => {
                            return <li key={caption.name + '-'+ i}>
                                {caption.name} - {caption.lCode} 
                                    <Popconfirm title="Are you sure you want to remove these captions?" onConfirm={() => props.onChange(i, 'remove')}>
                                            <Icon type="delete" style={{color: 'red'}} />
                                    </Popconfirm>
                            </li>
                        })
                    }
                    </ul>
                </div>
            </Modal>
        </div>
    )
}

const displayList = {
    disply: 'flex',
    flexDirection: 'column'
} as CSSProperties
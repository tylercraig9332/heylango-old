import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SheetView from './SheetView'
import { Button, Result, Upload, message } from 'antd'

export default function Create() {

    const [biSheet, setBiSheet] = useState<Object | undefined>()
    const [success, setSuccess] = useState<boolean>(false)

    function save() {
        // send sheet to server and handle response / success
        console.log(biSheet)
        const reqHeaders = {
            body: JSON.stringify(biSheet),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/api/l/bi/', reqHeaders).then(res => {
            // todo: get it from res and set it so result button can use it.
            setSuccess(res.status === 200)
        })
    }

    /** This function will be called by subcomponents when it updates itself so this component will be updated.
     * @var {Object} e - BiSheet data.
     */
    function extract(e : Object) {
        setBiSheet(e)
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

if (success) return (<Result status="success" title={"BiLango Sheet Successfully Created!"} 
                                extra={<Button type="primary"><Link to="todo">View</Link></Button>}/>)
    return (
        <div>
            <h1>Create New BiLango Sheet</h1>
            <SheetView send={extract} />
            <div style={{padding: 10, display: 'flex', justifyContent: 'center'}}>
                <Upload {...uploadProps}>
                    <Button>
                    Upload Audio
                    </Button>
                </Upload>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', padding: 20}}>
                <Button type="primary" size="large" onClick={save} block style={{width: '80%'}}>Create New BiSheet</Button>
            </div>
        </div>
    )
}
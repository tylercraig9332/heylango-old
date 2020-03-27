import React, { useEffect, useState } from 'react'
import Editor from '../../Draft/DraftEditor'
import PageToolbar from '../../Nav/PageToolbar'

import { Row, Col, Button, Tooltip, Input } from 'antd'

export default function SheetView(props : {readOnly?: boolean, id?: string, send?: (t : Object) => void, newSheet?: boolean}) {

    const [title, setTitle] = useState<string>()
    const [primary, setPrimary] = useState<string>()
    const [secondary, setSecondary] = useState<string>()
    const [notes, setNotes] = useState<string>()

    const [primaryVisable, setPrimaryVisable] = useState<boolean>(true)
    const [secondaryVisable, setSecondaryVisable] = useState<boolean>(true)
    const [notesVisable, setNotesVisable] = useState<boolean>(true)

    useEffect(() => {
        if (props.id == undefined) return
        let id = props.id
        if (props.id === undefined) { 
            id = '0'
            return
        } 
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        
        fetch('/l/bi/' + props.id, reqHeaders).then(r => r.json())
        .then(data => {
            console.log(data)
            setTitle(data.title)
            setPrimary(data.primary)
            setSecondary(data.secondary)
            setNotes(data.notes)
        })
    }, [])

    useEffect(() => {
        if (!props.readOnly && props.send != undefined) {
            props.send({
                title: title,
                primary: primary,
                secondary: secondary,
                notes: notes
            })
        }
    }, [title, primary, secondary, notes])

    return (
        <div style={containerStyle}>
            <div id="audioPlayer"></div>
            {props.readOnly ? (
                <div style={{width: '90%', marginLeft: '7%'}}>
                    <PageToolbar title={title || 'Title'} /> 
                    <br></br>
                </div>
            ) : (
                <Row type="flex" justify="center" style={{marginBottom: 20 }}>
                    <h2><Input value={title} size='large' placeholder="Sheet Title" onChange={(e : any) => setTitle(e.target.value)}/></h2>
                </Row>
            )
            }
            <Row type="flex" justify="center">
                <Col span={6}>
                    <div id="primary" >
                        <h3>Target Text <HideSheetButton onClick={() => setPrimaryVisable(!primaryVisable)} hidden={!props.readOnly}/></h3>
                        <Editor value={primary} onChange={setPrimary} 
                            style={{height: 400}} readOnly={props.readOnly} hidden={!primaryVisable} wrap/>
                    </div>
                </Col>
                <Col span={1}></Col>
                <Col span={6}>
                    <div id="secondary" >
                        <h3>Secondary Text <HideSheetButton onClick={() => setSecondaryVisable(!secondaryVisable)} hidden={!props.readOnly}/></h3> 
                        <Editor value={secondary} onChange={setSecondary} 
                        style={{height: 400}} readOnly={props.readOnly} hidden={!secondaryVisable} wrap/>
                    </div>
                </Col>
                <Col span={1}></Col>
                <Col span={6}>
                    <div id="notes" >
                        <h3>Notes / Other <HideSheetButton onClick={() => setNotesVisable(!notesVisable)} hidden={!props.readOnly}/></h3>
                        <Editor value={notes} onChange={setNotes} 
                        style={{height: 400}} readOnly={props.readOnly} hidden={!notesVisable} wrap/>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const containerStyle = {
    paddingTop: 30,
    paddingBottom: 30
} as React.CSSProperties


function HideSheetButton(props : {onClick?: any, hidden?: boolean}) {
    if (props.hidden) return null
    return (
        <Tooltip title="Hide">
                <Button icon="eye-invisible" shape="circle" onClick={props.onClick}/>
        </Tooltip>
    )
}
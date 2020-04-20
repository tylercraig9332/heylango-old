import React, { useState, useEffect } from 'react'
import {Editor, EditorState, convertFromRaw} from 'draft-js'
import EditorProps from './EditorProps'

export default function PreviewEditor(props : EditorProps) {

    const [eState, setEState] = useState<EditorState>(EditorState.createEmpty())

    useEffect(() => {
        if (props.value != undefined) {
            const contentState = convertFromRaw(JSON.parse(props.value))
            setEState(EditorState.createWithContent(contentState))
        }
    }, [])

    return (
        <div style={{...props.style, ...wrapStyle}}>
            <Editor editorState={eState} onChange={setEState} readOnly/>
        </div>
    )
}

/* This height will only show two lines of text */
const wrapStyle = {
    height: 40,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}
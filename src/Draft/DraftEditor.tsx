import React, { useState, useEffect, useRef } from 'react'
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import './DraftEditorPlaceholder.css'

type DraftEditorProps = {
    placeholder: string | undefined,
    readOnly?: boolean,
    value?: string,
    onChange?: any
}

export default function DraftEditor(props : DraftEditorProps) {

    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())

    const editor = useRef<any>(null)

    const [focus, setFocus] = useState<boolean>(false)
    const [highlight, setHighlight] = useState<boolean>(false)

    useEffect(() => {
        if (props.value !== undefined) {
            const contentState = convertFromRaw(JSON.parse(props.value))
            setEditorState(EditorState.createWithContent(contentState))
        }   
    }, [])

    useEffect(() => {
        if (editorState != null && !props.readOnly) {
            const contentState = editorState.getCurrentContent()
            const rawContent = JSON.stringify(convertToRaw(contentState))
            props.onChange(rawContent)
        }
    }, [editorState])

    useEffect(() => {
        /* Anytime one clicks within the box focus will be applied */
        /* Drafts deafult focus trigger is when one clicks after the text which is big dumb :( */
        const node = editor.current
        if (node && focus) {
            node.focus()
        } else if (node && !focus) {
            node.blur()
        }
    }, [focus])

    return (
        <div style={(focus || highlight) ? focused : styleWrap} onClick={() => setFocus(true)} onBlur={() => setFocus(false)}
            onMouseEnter={() => setHighlight(true)} onMouseLeave={() => setHighlight(false)}>
            <Editor
                ref={editor}
                editorState={editorState} 
                onChange={setEditorState} 
                placeholder={props.placeholder} 
                readOnly={props.readOnly}
                />
        </div>
    )
}

const styleWrap = {
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    padding: '10px',
    transition: 'all 0.3s',
    minHeight: 100
} as React.CSSProperties

const focused = {
    border: '1px solid #1890ff',
    borderRadius: '4px',
    padding: '10px',
    boxShadow: '0 2px 8px fade(#1890ff, 20%)',
    transition: 'all 0.3s',
    minHeight: 100
} as React.CSSProperties
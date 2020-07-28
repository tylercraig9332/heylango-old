import React, { useState, useEffect, useRef } from 'react'
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import EditToolbar from './Toolbar/EditToolbar'
import './DraftEditorPlaceholder.css'
import DraftEditorProps from './EditorProps'
import wordDecorator from './WordLearner/WordDecorator'

export default function DraftEditor(props : DraftEditorProps) {

    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty(props.wordLearner ? wordDecorator : undefined))

    const editor = useRef<any>(null)

    const [focus, setFocus] = useState<boolean>(false)
    const [highlight, setHighlight] = useState<boolean>(false)

    useEffect(() => {
        if (props.value !== undefined && props.value.length > 0) {
            const contentState = convertFromRaw(JSON.parse(props.value))
            setEditorState(EditorState.createWithContent(contentState, props.wordLearner ? wordDecorator : undefined))
        }   
    }, [props.value])

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

    let editorStyle = (focus || highlight) ? focused : styleWrap
    if (props.readOnly) editorStyle = readOnlyStyle
    if (props.readOnly && props.wrap) editorStyle = styleWrap

    if (props.hidden) return <div style={{backgroundColor: '#1890ff', ...styleWrap, ...props.style}}></div>
    return (
        <div style={{...editorStyle, ...props.style}} onClick={() => setFocus(true)} onBlur={() => setFocus(false)}
            onMouseEnter={() => setHighlight(true)} onMouseLeave={() => setHighlight(false)}>
            {((focus || highlight) && !props.readOnly) ? <EditToolbar setEditorState={setEditorState} getEditorState={() => editorState}/>  : null}
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

const readOnlyStyle = {
    paddingTop: '10px',
    paddingBottom: '10px'
}

const cardStyle = {
    transition: 'all 0.3s',
    minHeight: 100,
    padding: '10px'
} as React.CSSProperties

const styleWrap = {
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    ...cardStyle
    
} as React.CSSProperties

const focused = {
    border: '1px solid #1890ff',
    borderRadius: '4px',
    boxShadow: '0 2px 8px fade(#1890ff, 20%)',
    ...cardStyle
} as React.CSSProperties
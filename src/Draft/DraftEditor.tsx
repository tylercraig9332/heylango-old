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
        let decorator = (props.wordLearner) ? wordDecorator : undefined
        let contentState = EditorState.createEmpty(decorator).getCurrentContent()
        if (props.value !== undefined) {
            //console.log("props.value", props.value)
            contentState = convertFromRaw(JSON.parse(props.value))
            //console.log("content value", JSON.stringify(convertToRaw(contentState)))
        }
        //setEditorState(EditorState.createWithContent(contentState, decorator))
        const t = EditorState.push(editorState, contentState, 'change-block-data')
        setEditorState(t)
    }, [])

    useEffect(() => {
        //console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
        if (editorState != null && !props.readOnly) {
            // Saves the current content and passes it up through the onChange prop
            const contentState = editorState.getCurrentContent()
            const rawContent = JSON.stringify(convertToRaw(contentState))
            props.onChange(rawContent)
        }
    }, [editorState])

    useEffect(() => {
        // This allows the props.wordLearner to be changed after the parent component has been mounted.
        
        if (props.wordLearner === false || props.wordLearner === undefined) return
        //console.log('this has been ran', props.wordLearner)
        let d = (props.wordLearner) ? wordDecorator : undefined
        const eState = EditorState.set(editorState, {decorator : d});
        setEditorState(eState)
    }, [props.wordLearner])

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
            <Editor
                ref={editor}
                key={props.value}
                editorState={editorState} 
                onChange={setEditorState} 
                placeholder={props.placeholder} 
                readOnly={props.readOnly}
                />
            {((focus || highlight) && !props.readOnly) ? <EditToolbar setEditorState={setEditorState} getEditorState={() => editorState}/>  : null}
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
    padding: '10px',
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
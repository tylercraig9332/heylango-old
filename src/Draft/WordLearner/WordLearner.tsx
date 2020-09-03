import React, { useState, useEffect, useRef } from 'react'
import { Editor, EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js'
import WordLearnerProps from './WordLearnerProps' 
import WordDecorator from './WordDecorator'
import { Icon, Tooltip, Steps, Modal, Slider, Card, Button, Switch } from 'antd'
import SelectContextMenu from './SelectContextMenu'

const { Step } = Steps


export default function WordLearner(props : WordLearnerProps) {

    const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty())
    
    const [batchNumber, setBatchNumber] = useState<number>(0)
    const [batches, setBatches] = useState<string[]>([])

    const [settingsView, setSettingsView] = useState<boolean>(false)

    const [lineHeight, setLineHeight] = useState<string>(props.lineHeight === undefined ? '70px' : props.lineHeight)
    const [fontSize, setFontSize] = useState<string>(props.fontSize === undefined ? '30px' : props.fontSize)
    const [wordsPerPage, setWordsPerPage] = useState<number>(25)
    const [pausePlay, setPausePlay] = useState<boolean>(true)

    const editor = useRef<any>(null)
    const [focus, setFocus] = useState<boolean>(false)
    const [highlight, setHighlight] = useState<boolean>(false)

    const [mouseupevent, setMouseupevent] = useState<any>()

    useEffect(() => {
        if (props.lineHeight === undefined) return 
        setLineHeight(props.lineHeight)
    }, [props.lineHeight])

    useEffect(() => {
        if (props.fontSize === undefined) return
        setFontSize(props.fontSize)
    }, [props.fontSize])

    useEffect(() => {
        if (props.wordsPerPage === undefined) return
        setWordsPerPage(props.wordsPerPage)
    }, [props.wordsPerPage])

    useEffect(() => {
        // removes the wordLearner decorator 
        
        // When: Occurs when going from readOnly to an editable view
        // What: Restores editorState to it's original condition
        if (!props.readOnly && batches.length > 0) {
            let a = breakBlocks(batches)
            const cState = ContentState.createFromText(a)
            const eState = EditorState.createWithContent(cState, undefined)
            setEditorState(eState)
            return 
        }
        let d = (!props.readOnly) ? undefined : WordDecorator
        const cState = editorState.getCurrentContent()
        const eState = EditorState.createWithContent(cState, d)
        setEditorState(eState)
    }, [props.readOnly])

    useEffect(() => {
        // seperate text based on length into batches
        if (props.value === undefined || !props.readOnly) return
        let b = getBlocks(props.value, wordsPerPage)
        setBatches(b)
    }, [props.value, wordsPerPage, props.readOnly])

    useEffect(() => {
        // Edits are happending we want to restore batch lenght
        if (batches.length > 0 && !props.readOnly) {
            setBatches([])
            setBatchNumber(0)
            return
        }
        if (editorState != null && !props.readOnly && batches.length === 0) {
            // Saves the current content and passes it up through the onChange prop
            const contentState = editorState.getCurrentContent()
            //const rawContent = JSON.stringify(convertToRaw(contentState))
            const rawText = contentState.getPlainText()
            props.onChange(rawText)
        }
    }, [editorState])

    useEffect(() => {
        if (batches.length === 0) return
        if (batchNumber >= batches.length) {
            setBatchNumber(batches.length - 1)
            return
        }
        if (batchNumber < 0) {
            setBatchNumber(0)
            return
        }
        const cs = ContentState.createFromText(batches[batchNumber])
        setEditorState(EditorState.createWithContent(cs,  WordDecorator))
    }, [batchNumber, batches])

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

    useEffect(() => {
        if (pausePlay && mouseupevent === undefined && props.readOnly) pausePlayVideo(highlight)
    }, [highlight])

    /** Takes in text and seperated it into blocks based on wordsPerBlock */
    function getBlocks(text : string, wordsPerBlock : number) {
        const WORD_REGEX = /\p{L}+/gu
        const matchItr = text.matchAll(WORD_REGEX)
        let item = matchItr.next()
        let i = 0
        let chunckIndex = 0
        let from = 0
        let blocks : string[] = []
        while (item.value != undefined) {
            //console.log(item, item.value['index'], from, i)
            if (i % wordsPerBlock == 0 && i != 0) {
                //console.log('break', from, i, item.value['index'], item.value)
                blocks[chunckIndex++] = text.substring(from, item.value['index'])
                //chunckIndex++
                from = item.value['index']
            }
            i++
            item = matchItr.next()
        }
        blocks[chunckIndex] = text.substring(from, text.length - 1)
        return blocks
    }

    /** Takes the string array and makes it into one string */
    function breakBlocks(blocks : string[]) {
        let s = blocks[0]
        for (let i = 1; i < blocks.length; i++) {
            s += blocks[i]
        }
        return s
    }

    function pausePlayVideo(pause : boolean) {
        let postMessage = '{"event":"command","func":"pauseVideo","args":""}'
        if (!pause) {
            postMessage = '{"event":"command","func":"playVideo","args":""}'
        }
        let video = document.querySelector('iframe')
        if (video != null) {
            if (video.contentWindow != null) {
                video.contentWindow.postMessage(postMessage, '*')
            }
        }    
    }

    const editorFocusStyle = (focus || highlight) ? focusStyle : nonFocusStyle


    const lineHeightgMarks = {
        20 : '20px',
        40: '40px',
        60: '60px',
        80: '80px',
        100: '100px',
    }

    const fontSizeMarks = {
        15: '10px',
        20: '20px',
        25: '25px',
        30: '30px',
        35: '35px',
        40: '40px',
    }
    const wordsPerPageMarks = {
        25: '25 Words',
        50: '50 Words',
        75: '75 Words',
        100: '100 Words'
    }

    const settingsModal = (
        <Modal 
            title="WordLearner Settings"
            visible={settingsView}
            onOk={() => setSettingsView(false)}
            onCancel={() => setSettingsView(false)}
        >
            <strong>Line Height Spacing</strong>
            <Slider marks={lineHeightgMarks} defaultValue={Number(lineHeight.slice(0, -2))} step={5} min={20} onChange={(v) => setLineHeight(v.toString() + 'px')}/>
            <br></br>
            <strong>Font Size</strong>
            <Slider marks={fontSizeMarks} defaultValue={Number(fontSize.slice(0, -2))} min={15} max={40} onChange={(v) => setFontSize(v.toString() + 'px')}/>
            <strong>Words Per Page</strong>
            <Slider marks={wordsPerPageMarks} defaultValue={wordsPerPage} min={10} max={125} onChange={(v) => setWordsPerPage(Number(v.toString()))}/>
            <div style={{paddingTop: '20px'}}><strong>Autopause WordViewer </strong> <Switch defaultChecked onChange={(v) => setPausePlay(v)} /></div>
        </Modal>
    )
    if (!props.readOnly) {
        return (
            <div className="editor" style={{...editorFocusStyle, ...editorStyle, fontSize: fontSize, lineHeight: lineHeight }}
                onClick={() => setFocus(true)} onBlur={() => setFocus(false)}
                onMouseEnter={() => setHighlight(true)} onMouseLeave={() => setHighlight(false)}
            >
                <Editor editorState={editorState} onChange={setEditorState} readOnly={props.readOnly} />
            </div>
        )
    }
    return (
        <div>
            <SelectContextMenu event={mouseupevent} clearEvent={() => setMouseupevent(undefined)}/>
            {settingsModal}
            <div style={stepStyle}>
                <Steps current={batchNumber}>
                    {batches.map((batch : string, i : number) => {
                        if (i >= batchNumber - 3 && i <= batchNumber + 3) {
                            type process = 'finish' | 'wait' | 'process' | undefined
                            let s : process = (i < batchNumber) ? "finish" : "wait"
                            if (i == batchNumber) s = "process"
                            const stepIcon = (s === 'finish') ? "check-circle" : i+1 
                            return <Step key={i} status={s} icon={stepIcon} /> 
                        }
                    })}
                </Steps>
                <Tooltip title="View Settings">
                    <Icon style={{fontSize: '25px', marginLeft: '10px'}} type="setting" onClick={() => setSettingsView(true)}/>
                </Tooltip>
            </div>
            <div style={{...containerStyle, ...props.style}}>
                <div className="left" style={{...columnStyle, justifyContent: 'end'}}>
                    <Tooltip title="Previous Page" placement="left">
                        <Icon type="caret-left" className="icon" onClick={() => setBatchNumber(batchNumber - 1)}/>
                    </Tooltip>
                </div>
                <div 
                    className="editor" id="editor"
                    style={{...editorFocusStyle, ...editorStyle, fontSize: fontSize, lineHeight: lineHeight }}
                    onClick={() => setFocus(true)} onBlur={() => setFocus(false)}
                    onMouseEnter={() => setHighlight(true)} onMouseLeave={() => setHighlight(false)}
                    onMouseUp={(e) => {e.persist(); setMouseupevent(e)}}
                >
                    <Editor editorState={editorState} onChange={setEditorState} readOnly={props.readOnly} />
                </div>
                <div className="right" style={{...columnStyle, justifyContent: 'start'}}>
                    <Tooltip title="Next Page" placement="right">
                        <Icon type="caret-right" className="icon" onClick={() => setBatchNumber(batchNumber + 1)}/>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

const containerStyle = {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center'
} as React.CSSProperties

const columnStyle = {
    display: 'flex',
    alignItems: 'center',
} as React.CSSProperties

const editorStyle = {
    minHeight: '100px',
    width: '800px'
} as React.CSSProperties

const cardStyle = {
    transition: 'all 0.3s',
    minHeight: 100,
    padding: '10px',
} as React.CSSProperties

const nonFocusStyle = {
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    ...cardStyle
    
} as React.CSSProperties

const focusStyle = {
    border: '1px solid #1890ff',
    borderRadius: '4px',
    boxShadow: '0 2px 8px fade(#1890ff, 20%)',
    ...cardStyle
} as React.CSSProperties

const stepStyle = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '800px',
    marginBottom: '10px'
}
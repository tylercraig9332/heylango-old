import React, { useState, useEffect } from 'react'
import {Card, Button, Icon, message} from 'antd'

/** Select context menu that appears on the mouseup event 
 *  I had a plethera of problems with typeing so I have it all set to any
 */
export default function SelectContextMenu(props : {event : any}) {

    const [contextMenuView, setContexMenuView] = useState<boolean>()
    const [contextX, setContextX] = useState<number>(0)
    const [contextY, setContextY] = useState<number>(0)
    const [selectedText, setSelectedText] = useState<string>('')

    useEffect(() => {
        let s = ''
        let ws = window.getSelection()
        if (ws != null) {
            s = ws.toString()
        }
        if (s.length === 0) {
            setSelectedText('')
            setContexMenuView(false)
            return
        }
        const x = props.event.pageX
        const y = props.event.pageY
        setContextX(x)
        setContextY(y)
        setContexMenuView(true)
        setSelectedText(s)
    }, [props.event])

    function saveExpression() {
        const lCode = window.sessionStorage.getItem('LangoLanguage')
        if (lCode === undefined) {
            message.error('Unable to load language. Please refresh the page')
            return
        }
        const reqHeaders = {
            body: JSON.stringify({value: selectedText, language: lCode}),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/s/ex/', reqHeaders).then(res => {
            // todo: get it from res and set it so result button can use it.
            message.success('Expression Saved!')
            setContexMenuView(false)
            setSelectedText('')
        })
    }
        
    if (!contextMenuView) return null
    return (
        <div key={`${contextX}/${contextY}`} 
            style={{position: 'absolute', top: `${contextY - 140 }px`, left: `${contextX - 40}px`, zIndex: 3}}
        >
            <Card>
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <Icon style={closeStyle} type="close-circle" onClick={() => {
                        setSelectedText('')
                        setContexMenuView(false)
                    }}/>
                    </div>
                <h2>{selectedText}</h2>
                <Button type="primary" onClick={saveExpression} block>
                    Save Expression
                </Button>
            </Card>
        </div>
    )
}

const closeStyle = {
    position: 'absolute',
    right: '3px',
    top: '3px',
    cursor: 'pointer'
} as React.CSSProperties
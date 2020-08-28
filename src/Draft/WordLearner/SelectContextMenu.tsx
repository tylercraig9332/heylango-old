import React, { useState, useEffect } from 'react'
import {Card, Button, Icon, message} from 'antd'

/** Select context menu that appears on the mouseup event 
 *  I had a plethera of problems with typeing so I have it all set to any
 */
export default function SelectContextMenu(props : {event : any, clearEvent: any}) {

    const [contextMenuView, setContexMenuView] = useState<boolean>()
    const [contextX, setContextX] = useState<number>(0)
    const [contextY, setContextY] = useState<number>(0)
    const [selectedText, setSelectedText] = useState<string>('')
    const [translations, setTranslations] = useState<string[]>([])
        
    useEffect(() => {
        let s = ''
        let ws = window.getSelection()
        if (ws != null) {
            s = ws.toString()
        }
        if (s.length === 0) {
            setSelectedText('')
            setContexMenuView(false)
            props.clearEvent()
            return
        }
        const x = props.event.pageX
        const y = props.event.pageY

        const lCode = window.sessionStorage.getItem('LangoLanguage')
        if (lCode === undefined) {
            message.error('Unable to load language. Please refresh the page')
            return
        }
        if (s.length >= 100) {
            message.error('Please make a shorter selection for translation')
            return
        }
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/s/ex/t/' + encodeURI(s) + '/to/' + lCode, reqHeaders).then(r => r.json()).then(t => {
            setTranslations(t)
        })

        setContextX(x)
        setContextY(y)
        setContexMenuView(true)
        setSelectedText(s)
    }, [props.event])

    function saveExpression() {
        const logged = (window.sessionStorage.getItem('logged') == 'true')
        if (!logged) {
            message.error('You need to be logged in to save expressions!')
            return
        }
        const lCode = window.sessionStorage.getItem('LangoLanguage')
        if (lCode === undefined) {
            message.error('Unable to load language. Please refresh the page')
            return
        }
        let t = ''
        translations.map((translation : string, i : number) => {
            let preAppendValue = (i === 0) ? '' : ', '
            t += preAppendValue + translation
        })
        const reqHeaders = {
            body: JSON.stringify({value: selectedText, language: lCode, translation: t}),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/s/ex/', reqHeaders).then(res => {
            // todo: get it from res and set it so result button can use it.
            message.success('Expression Saved!')
            props.clearEvent()
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
                        props.clearEvent()
                        setContexMenuView(false)
                    }}/>
                    </div>
                <h2>{selectedText}</h2>
                {translations.map(t => {return <p key={t}>{t}</p>})}
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
import React, { useState, useEffect } from 'react'
import {CompositeDecorator} from 'draft-js'
import findWithRegex from '../findWithRegex'
import {Popover, Button, message} from 'antd'
import './word.css'

const ButtonGroup = Button.Group

const WORD_REGEX = /\p{L}+/gu // Highlights whole word, including other languages' characters (hence unicode modifier)

function wordStrategy(contentBlock : any, callback : any, contentState : any) {
    findWithRegex(WORD_REGEX, contentBlock, callback);
}

const WordWrap = (props : any) =>  {
    return (
        <Popover content={<PopoverContent children={props.children} />} trigger="click" title= "Selected Word" placement="bottom">
            <span className="word" style={wordStyle} data-offset-key={props.offsetKey}>
                {props.children}
            </span>
        </Popover>
    )
}

function PopoverContent(props: any) {
    const word = props.children[0].props.text

    const [success, setSuccess] = useState<boolean>(false)
    const [translations, setTranslations] = useState<string[]>([])

    useEffect(() => {
        const lCode = window.sessionStorage.getItem('LangoLanguage')
        if (lCode === undefined) {
            message.error('Unable to load language. Please refresh the page')
            return
        }
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/api/s/ex/t/' + word + '/to/' + lCode, reqHeaders).then(r => r.json()).then(t => {
            setTranslations(t)
        })
    }, [])

    function saveWord() {
        const logged = (window.sessionStorage.getItem('logged') == 'true')
        if (!logged) {
            message.error('You need to be logged in to save words!')
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
            body: JSON.stringify({value: word, language: lCode, translation: t}),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/api/s/ex/', reqHeaders).then(res => {
            // todo: get it from res and set it so result button can use it.
            setSuccess(res.status === 200)
            message.success('Word Saved!')
        })
    }

    return (
        <div style={{width: 350}}>
            <h2>{word}</h2>
            {
                translations.map((t) => {
                    return <p key={t}>{t}</p>
                })
            }
            <Button type="primary" style={popButtonStyle} onClick={saveWord} block>
                Save Word
            </Button>
            
        </div>
        
    )
}

const wordStyle = {
    marginTop: 5,
    marginBottom: 5,
    direction: 'ltr',
    unicodeBidi: 'bidi-override',
} as React.CSSProperties

const popButtonStyle = {
    marginTop: 10
} as React.CSSProperties

export default new CompositeDecorator([
    {
        strategy: wordStrategy,
        component: WordWrap
    }
])

export {WordWrap, wordStrategy}
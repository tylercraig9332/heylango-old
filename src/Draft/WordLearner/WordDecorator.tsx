import React from 'react'
import {CompositeDecorator} from 'draft-js'
import findWithRegex from '../findWithRegex'
import {Popover, Button} from 'antd'
import './word.css'

const ButtonGroup = Button.Group

const WORD_REGEX = /\p{L}+/gu // Highlights whole word, including other languages' characters (hence unicode modifier)

function wordStrategy(contentBlock : any, callback : any, contentState : any) {
    findWithRegex(WORD_REGEX, contentBlock, callback);
}

const WordWrap = (props : any) =>  {
    return (
        <Popover content={<PopoverContent children={props.children} />} trigger="click" title= "Selected Word" placement="top">
            <span className="word" style={wordStyle} data-offset-key={props.offsetKey}>
                {props.children}
            </span>
        </Popover>
    )
}

function PopoverContent(props: any) {
    const word = props.children[0].props.text
    return (
        <div style={{width: 350}}>
            <h2>{word}</h2>
            <Button type="primary" style={popButtonStyle} block>
                Translate
            </Button>

            <Button type="primary" style={popButtonStyle} block>
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
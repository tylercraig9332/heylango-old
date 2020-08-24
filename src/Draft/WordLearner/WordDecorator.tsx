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

    useEffect(() => {
        const lCode = window.sessionStorage.getItem('LangoLanguage')
        if (lCode === undefined) {
            message.error('Unable to load language. Please refresh the page')
            return
        }

    
        const location = 'global';

        // Imports the Google Cloud Translation library
       /* const {TranslationServiceClient} = require('@google-cloud/translate');
        const gcloud = require('./gcloud.json')
        const options = {keyFilename: './gcloud.json'}
        // Instantiates a client
        const translationClient = new TranslationServiceClient(options);
        async function translateText() {
        // Construct request
        const request = {
            parent: `projects/${gcloud.project_id}/locations/${location}`,
            contents: [word],
            mimeType: 'text/plain', // mime types: text/plain, text/html
            sourceLanguageCode: lCode,
            targetLanguageCode: 'en', // TODO: enable support for multiple languages
        };

        try {
            // Run request
            const [response] = await translationClient.translateText(request);

            for (const translation of response.translations) {
            console.log(`Translation: ${translation.translatedText}`);
            }
        } catch (error) {
            console.error(error.details);
        }
        }

        translateText();*/
    }, [])

    function saveWord() {
        const lCode = window.sessionStorage.getItem('LangoLanguage')
        if (lCode === undefined) {
            message.error('Unable to load language. Please refresh the page')
            return
        }
        const reqHeaders = {
            body: JSON.stringify({value: word, language: lCode}),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/s/ex/', reqHeaders).then(res => {
            // todo: get it from res and set it so result button can use it.
            setSuccess(res.status === 200)
            message.success('Word Saved!')
        })
    }

    return (
        <div style={{width: 350}}>
            <h2>{word}</h2>
            <Button type="primary" style={popButtonStyle} block>
                Translate
            </Button>
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
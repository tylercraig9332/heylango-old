import React, { useState, useEffect } from 'react'
import { Modal, message, Checkbox, Input, Button } from 'antd'
import { LanguageSelect } from '../../Util/Select'
import DeckModal from './DeckModal'

import IDeck from '../Decks/Deck'

export default function AddModal(props : {visible?: boolean, onCancel?: any, afterSave?: any, type?: string, by?: string}) {

    const [expression, setExpression] = useState<string>('')
    const [translation, setTranslation] = useState<string>('')
    const [language, setLanguage] = useState<string>('')
    const [decks, setDecks] = useState<IDeck[]>([])
    const [deckSelected, setSelected] = useState<string[]>([])

    useEffect(() => {
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/api/s/decks/', reqHeaders).then(res => {
            if (res.status === 400) message.error('An Error Occured with Loading Deck')
            return res.json()
        }).then((decks : IDeck[]) => {
            setDecks(decks)
            let s = deckSelected
            if (props.by) {
                // If we are using from within a deck, we must have it initially selected
                let by = props.by.split('/')
                s.push(by[4])
            }
            setSelected(s)
        })
        
        // for future update: auto import language from session trackers.
    }, [])

    function validateAndSave() {
        if (expression.length < 1 || expression.length < 1 || language.length < 1) {
            message.error('Unable to save: Please double check the form again to ensure everything is filled out')
            return
        }
        // Helper function that builds post reqHeaders 
        const postRequest = (body : any) =>  ({
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })

        const exp = {
            value: expression,
            translation: translation,
            language: language
        }
        
        fetch('/api/s/ex/', postRequest(exp)).then(res => {
            if (res.status !== 200) {
                message.error('Something went wrong with creating this expression')
                console.error(res.statusText)
                return
            }
            return res.json()
        }).then((exp : IDeck) => {
            message.success("New Expression Saved!")
            if (decks.length === 0) return
            let body = {
                decks: deckSelected,
                expressions: [exp._id]
            }
            fetch('/api/s/deck/ex', postRequest(body)).then(res => {
                if (res.status !== 200) {
                    message.error('Something went wrong saving your expression to decks')
                    console.error(res.statusText)
                }
                else message.success("Expression Added to Deck(s)")
                setExpression('')
                setTranslation('')
                props.afterSave()
            })
        })
    }

    function autoTranslate() {
        if (expression.length < 1) {
            message.error('Can\'t translate nothing. Please fill out Word/Phrase')
            return
        }
        // TODO: hit translate api to auto-populate translate field
    }

    return (
        <Modal title="Create New Word / Expression" 
            visible={props.visible}
            onOk={validateAndSave}
            onCancel={props.onCancel}
            okText='Save'
        >
            <div style={{color: 'spacegray'}}>Word or Phrase</div>
            <div style={{display: 'flex'}}>
                <Input key={'value'} value={expression} onChange={(e : any) => {setExpression(e.currentTarget.value)}} />
                <span style={{width: '5px'}}></span>
                <Button onClick={autoTranslate}>Auto Translate</Button>
            </div>
            <div style={{color: 'spacegray', marginTop: '10px'}}>Translation</div>
            <Input key={'translation'} value={translation} onChange={(e : any) => setTranslation(e.currentTarget.value)} />
            <div style={{color: 'spacegray', marginTop: '10px'}}>Language of Word or Phrase</div>
            <LanguageSelect value={language} onChange={(l : any) => setLanguage(l)} removeAny/>
            <div style={{color: 'spacegray', marginTop: '10px'}}>Add to deck(s)</div>
            <Checkbox.Group onChange={(e : any) => setSelected(e)} value={deckSelected}>
                {decks.map((deck : IDeck) => {
                    return (
                    <p key={deck._id} style={{margin: '0px 0px 0px 15px'}}><Checkbox value={deck._id}>{deck.title}</Checkbox></p>
                    )
                })}
            </Checkbox.Group>
        </Modal>
    )
}
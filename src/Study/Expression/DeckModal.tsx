import React, {useState, useEffect} from 'react'
import { Modal, message, Checkbox } from 'antd'
import IDeck from '../Decks/Deck'

export default function DeckModal(props : {visible?: boolean, onCancel?: any, selected?: any[], onOk?: any}) {

    const [decks, setDecks] = useState<IDeck[]>([])
    const [selected, setSelected] = useState<string[]>([])

    useEffect(() => {
        // TODO: Fetch decks based on user
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/s/deck/', reqHeaders).then(res => {
            if (res.status === 400) message.error('An Error Occured with Loading Deck')
            return res.json()
        }).then(decks => {
            setDecks(decks)
        })
    }, [props.visible])

    function handleSelected(e : any) {
        //console.log(e)
        //console.log('props', props.selected)
        setSelected(e)
    }

    function saveDeckExpression() {
        const dex = {
            expressions: props.selected,
            decks: selected
        }
        const reqHeaders = {
            body: JSON.stringify(dex),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/s/deck/ex/', reqHeaders).then(res => {
            if (res.status === 400) {
                message.error('Failed to Save Expressions to Deck')
                return
            }
            message.success('Words added to deck!')
            props.onOk()
        })
    }

    return (
        <Modal title="Add Selected to Deck"
                visible={props.visible} 
                onCancel={props.onCancel}
                onOk={saveDeckExpression}
                okText='Save'
            >
                <p>Add {props.selected?.length} selected expressions to {selected.length} selected decks.</p>
                <Checkbox.Group onChange={handleSelected} value={selected}>
                {decks.map((deck : IDeck) => {
                    return (
                       <p key={deck._id}><Checkbox value={deck._id}>{deck.title}</Checkbox></p>
                    )
                })}
                </Checkbox.Group>
            </Modal>
    )
}
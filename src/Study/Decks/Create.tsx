import React, { useState } from 'react'
import { Modal, Input, message } from 'antd'
import CardButton from '../../Util/CardButton'

export default function Create(props : {onChange?: any}) {

    const [newDeckView, setNewDeckView] = useState<boolean>(false)

    const [newDeckTitle, setNewDeckTitle] = useState<string>('')
    const [newDeckDescription, setNewDeckDescription] = useState<string>('')

    function newDeck() {
        const deckData = {
            title: newDeckTitle,
            description: newDeckDescription
        }
        const reqHeaders = {
            body: JSON.stringify(deckData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/s/deck/', reqHeaders).then((res : Response) => {
            if (res.status === 400) message.error('Something went wrong')
            return res.json()
        }).then(deck => {
            message.success('New Deck Created!')
            console.log('success', deck)
            setNewDeckView(false)
            setNewDeckDescription('')
            setNewDeckTitle('')
            props.onChange()
        })
    }

    return (
        <div>
            <h3>Create New Deck</h3>
            <CardButton icon='plus-square' onClick={() => setNewDeckView(true)}>
                New Deck
            </CardButton>
            <Modal visible={newDeckView} onOk={newDeck} title="New Deck" okText='Create' onCancel={() => setNewDeckView(false)}>
                <div style={{color: 'spacegray'}}>Deck Name</div>
                <Input value={newDeckTitle} onChange={(e) => setNewDeckTitle(e.currentTarget.value)}/>
                <div style={{color: 'spacegray'}}>Description</div>
                <Input.TextArea value={newDeckDescription} onChange={(e) => setNewDeckDescription(e.currentTarget.value)}/>
            </Modal>
            </div>
    )
}
import React, { useState } from 'react'
import IDeck from './Deck'
import { Modal, Input, Button, Popconfirm } from 'antd'

export default function EditModal(props : {deck: IDeck, visible: boolean, onClose: any}) {

    const [newTitle, setTitle] = useState<string>(props.deck.title)
    const [newDesc, setDesc] = useState<string>(props.deck.description)

    function saveChanges() {
        props.onClose()
    }

    function deleteDeck() {

    }

    return (
        <Modal title="Edit Deck" visible={props.visible} onOk={saveChanges} onCancel={props.onClose} okText="Save">
            <div style={{color: 'spacegray'}}>Deck title</div>
            <Input key={'title'} value={newTitle} onChange={(e : any) => {setTitle(e.currentTarget.value)}} />
            <div style={{color: 'spacegray'}}>Deck description</div>
            <Input key={'desc'} value={newDesc} onChange={(e : any) => {setDesc(e.currentTarget.value)}} />
            <div style={{color: 'spacegray'}}>Action</div>
            <Popconfirm title="Are you sure you want to delete this deck?" onConfirm={deleteDeck}>
                <Button type="danger">Delete Deck</Button>
            </Popconfirm>
        </Modal>
    )
}
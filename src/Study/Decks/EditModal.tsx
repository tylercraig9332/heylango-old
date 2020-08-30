import React, { useState } from 'react'
import IDeck from './Deck'
import { Modal, Input, Button, Popconfirm, message } from 'antd'

export default function EditModal(props : {deck: IDeck, visible: boolean, onClose: any}) {

    const [newTitle, setTitle] = useState<string>(props.deck.title)
    const [newDesc, setDesc] = useState<string>(props.deck.description)

    function saveChanges() {
        if (props.deck === undefined) return
        const reqHeaders = {
            body: JSON.stringify({
                title: newTitle,
                description: newDesc
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH"
        }
        fetch('/s/deck/' + props.deck._id, reqHeaders).then(res => {
            if (res.status === 400) message.error('Something went wrong :(')
            props.onClose()
        })
    }

    function deleteDeck() {
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE"
        }
        fetch('/s/deck/' + props.deck._id, reqHeaders).then(res => {
            if (res.status === 400) message.error('Something went wrong') 
            else if (res.status === 200) {
                message.success('Deck deleted')
                window.location.href = "/study/"
            }
        })
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
import React, { useState } from 'react'
import { Modal, Input, message } from 'antd'
import CardButton from '../../Util/CardButton'
import List from './List'
import NewDeck from './Create'
import NotLogged from '../../User/NotLogged'
export default function Home() {

    const [newDeckView, setNewDeckView] = useState<boolean>(false)

    const [newDeckTitle, setNewDeckTitle] = useState<string>('')
    const [newDeckDescription, setNewDeckDescription] = useState<string>('')
    const [decksRefresh, setDecksRefresh] = useState<boolean>(true)

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
        fetch('/api/s/deck/', reqHeaders).then((res : Response) => {
            if (res.status === 400) message.error('Something went wrong')
            return res.json()
        }).then(deck => {
            message.success('New Deck Created!')
            console.log('success', deck)
            setNewDeckView(false)
            setNewDeckDescription('')
            setNewDeckTitle('')
            setDecksRefresh(true)
        })
    }

    if (window.sessionStorage.getItem('userId') === null || window.sessionStorage.getItem('userId') === '') return <NotLogged message="to view saved decks"/>
    return (
        <div>
            <h1>Decks</h1>
            <p>Flash card decks</p>
            <hr></hr>
            <NewDeck onChange={() => setDecksRefresh(true)} />
            <h3>Your Decks</h3>
            <List refresh={decksRefresh} setRefresh={setDecksRefresh}/>
        </div>
    )
}
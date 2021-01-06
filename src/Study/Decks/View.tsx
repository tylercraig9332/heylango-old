import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import List from '../Expression/List'
import Loading from '../../Util/Loading'
import IDeck from './Deck'
import { message, Button, Icon, Tooltip } from 'antd'
import EditModal from './Components/EditModal'

export default function View(props : {deck_id? : string}) {

    const [deck_id, setDeck_id] = useState<string>('')
    const [deck, setDeck] = useState<IDeck>()

    const [editView, setEditView] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(true) // When true deck will be reloaded from db

    useEffect(() => {
        if (refresh === false) return
        let p_id = '' 
        if (props.deck_id === undefined) {
            const urls = window.location.pathname.split('/')
            p_id = urls[3] // The id from the url
        }
        else {
            p_id = props.deck_id
        }
        setDeck_id(p_id)

        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/api/s/deck/' + p_id).then(res => {
            if (res.status === 400) message.error('Error Loading Deck Info')
            return res.json()
        }).then((deck : IDeck) => {
            setRefresh(false)
            setDeck(deck)
        })
    }, [refresh])

    function removeSelected(selected : string[]) {
        const reqHeaders = {
            body: JSON.stringify({expressions: selected, deck_id: deck_id}),
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE"
        }
        fetch('/api/s/deck/ex', reqHeaders).then(res => {
            if (res.status === 400) message.error(res.statusText)
            else {
                setRefresh(true)
                message.success('Removed from deck')
            }
        })
    }

    if (deck_id === '' || deck === undefined) return <Loading message="Loading" />
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1>{deck.title} <Tooltip title="Edit Deck"><Button onClick={() => setEditView(true)} size="small"><Icon type="form"/></Button></Tooltip></h1> 
                <Link to={`/study/decks/review/${deck_id}`}><Button type="primary" size="large">Review Deck</Button></Link>
            </div>
            <h2>{deck.description}</h2>
            <List by={`/s/deck/ex/${deck_id}`} type="deck" onRemove={removeSelected}/>
            <div style={{marginTop: 30}}>
                <Link to={`/study/decks/review/${deck_id}`}><Button type="primary" size="large">Review Deck</Button></Link>
            </div>
            <EditModal deck={deck} visible={editView} onClose={() => {
                setRefresh(true)
                setEditView(false)
            }} />
        </div>
        
    )
}
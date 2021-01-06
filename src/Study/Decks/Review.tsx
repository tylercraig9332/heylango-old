import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import IDeck from './Deck'
import ICard from './ICard'
import Present from './Present'
import Loading from '../../Util/Loading'
import { message, Button, Icon, Tooltip } from 'antd'

export default function Review(props : {deck_id? : string}) {
    const [deck, setDeck] = useState<IDeck>()
    const [cards, setCards] = useState<ICard[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        let p_id = '' 
        if (props.deck_id === undefined) {
            const urls = window.location.pathname.split('/')
            p_id = urls[4] // The id from the url
        }
        else {
            p_id = props.deck_id
        }
        fetch('/api/s/deck/ex/' + p_id).then(res => {
            if (res.status === 400) message.error('Error Loading Cards')
            return res.json()
        }).then(cards => {
            setCards(cards)
            setLoaded(true)
        })
        fetch('/api/s/deck/' + p_id).then(res => {
            if (res.status === 400) message.error('Error Loading Deck Info')
            return res.json()
        }).then(deck => {
            setDeck(deck)
        })
    }, [])

    if (!loaded && deck !== undefined) return <Loading message="Loading..." />
    return (
        <div style={{marginRight: 'auto', marginLeft: 'auto', maxWidth: '95%', width: 700}}>
            <h1>{deck?.title} <Link to={`/study/decks/${deck?._id}`}><Tooltip title="View Deck"><Button><Icon type="select" /></Button></Tooltip></Link></h1>
            <h2>{deck?.description}</h2>
            <Present deck={cards} />
        </div>
    )
}
import React, { useEffect, useState } from 'react'
import IDeck from './Deck'
import Loading from '../../Util/Loading'
import CardButton from '../../Util/CardButton'
import { message } from 'antd'

export default function List() {

    const [decks, setDecks] = useState<IDeck[]>()

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
    }, [])

    if (decks === undefined) return <Loading message="Loading Saved Decks" />
    return (
        <div style={{display: 'flex'}}>
            {decks.map((deck : IDeck) => {
                return (
                    <CardButton icon="select">
                        {deck.title}
                        <p style={{fontSize: 20}}>{deck.description}</p>
                    </CardButton>
                )
            })}
        </div>
    )
}
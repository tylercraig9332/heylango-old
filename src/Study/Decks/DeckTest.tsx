import React from 'react'
import DeckView from './DeckView'


export default function Home() {


    const deck = [
        {
            front: 'test',
            back: 'pruebo'
        },
        {
            front: 'hello',
            back: 'hola'
        },
        {
            front: 'Hallo',
            back: 'Hello There'
        },
        {
            front: 'Hello there',
            back: 'general kenobi'
        }
    ]

    return (
        <React.Fragment>
            <h1>Decks</h1>
            <p>Flash card decks</p>
            <hr></hr>
            <DeckView deck={deck} />
        </React.Fragment>
    )
}
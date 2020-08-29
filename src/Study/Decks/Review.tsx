import React, {useState, useEffect} from 'react'
import IDeck from './Deck'
import Present from './Present'
import Loading from '../../Util/Loading'
import ICard from './ICard'

export default function Review(props : {deck_id? : string}) {
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
        fetch('/s/deck/ex/' + p_id).then(res => {
            return res.json()
        }).then(cards => {
            setCards(cards)
            setLoaded(true)
        })
    }, [])

    if (!loaded) return <Loading message="Loading..." />
    return (
        <div>
            <Present deck={cards} />
        </div>
    )
}
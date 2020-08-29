import React, { useState, useEffect, CSSProperties } from 'react'
import ICard from './ICard'
import CardView from './CardView'

import { Tooltip, Icon, Switch } from 'antd'


export default function Present(props : {deck?: ICard[]}) {
    
    const [deck, setDeck] = useState<ICard[]>([])
    const [current, setCurrent] = useState<number>(0)
    const [sound, setSound] = useState<boolean>(false)

    useEffect(() => {
        if (props.deck !== undefined) setDeck(props.deck)
    }, [])

    function updateCurrent(newCurrent : number) {
        if (newCurrent < 0 || newCurrent >= deck.length) return
        setCurrent(newCurrent)
    }

    if (deck.length === 0 || deck[current] === undefined) return <div>Empty Deck</div>
    return (
        <div className="DeckView" >
            <div className="banner" style={topRowView}>
                <span>
                    {current + 1} / {deck.length}
                </span>
                <span>
                    Card-flip sound <Switch onChange={(checked) => setSound(checked)} />
                </span>
            </div>
            <div className="cardRow" style={containerStyle}>
                <div className="left" style={{...controlContainer}}>
                    <Tooltip title="Previous Card" placement="left">
                        <Icon type="caret-left" className="icon" onClick={() => updateCurrent(current - 1)}/>
                    </Tooltip>
                </div>
                <CardView front={deck[current].value} back={deck[current].translation} sound={sound} />
                <div className="right" style={{...controlContainer}}>
                    <Tooltip title="Next Card" placement="right">
                        <Icon type="caret-right" className="icon" onClick={() => updateCurrent(current + 1)}/>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

const containerStyle = {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center'
} as React.CSSProperties

const controlContainer = {
    display: 'flex',
    alignItems: 'center',
} as CSSProperties

const topRowView = {
    display: 'flex',
    justifyContent: 'space-between',
    //border: '1px solid black',
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '600px'
}
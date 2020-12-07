import React, { useState, useEffect, CSSProperties } from 'react'
import ICard from './ICard'
import CardView from './Components/CardView'
import { Tooltip, Icon, Switch, Button, Modal } from 'antd'
import SRSBanner from './Components/SRSBanner'
import { speak } from '../../Util/textToSpeach'


export default function Present(props : {deck?: ICard[]}) {
    
    const [deck, setDeck] = useState<ICard[]>([])
    const [current, setCurrent] = useState<number>(0)
    const [tts, setTTS] = useState<boolean>(false)
    const [sound, setSound] = useState<boolean>(false)
    const [settingsView, setSettingsView] = useState<boolean>(false)

    useEffect(() => {
        if (props.deck !== undefined) setDeck(props.deck)
    }, [])

    function updateCurrent(newCurrent : number) {
        if (newCurrent < 0 || newCurrent >= deck.length) return
        setCurrent(newCurrent)
    }

    const settingsModal = (
        <Modal 
            title="Review Deck Settings" 
            visible={settingsView} 
            onOk={() => setSettingsView(false)}
            onCancel={() => setSettingsView(false)}
        >
            <div>Text-to-speach (Automatically read out card) <Switch onChange={(checked) => setTTS(checked)} /></div>
            <div>Card-flip sound (Beta) <Switch onChange={(checked) => setSound(checked)} /></div>
        </Modal>
    )

    if (deck.length === 0 || deck[current] === undefined) return <div>Empty Deck</div>
    return (
        <div className="DeckView" >
            <div className="banner" style={topRowView}>
                <span>
                    {current + 1} / {deck.length}
                </span>
                <span>
                    <Tooltip title="Settings">
                        <Icon style={{fontSize: '25px', marginLeft: '10px'}} type="setting" onClick={() => setSettingsView(true)}/>
                    </Tooltip>
                    {settingsModal}
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
            <div className="srsRow">
                {/* TODO: Add SRS banner here */}
                <SRSBanner deck={deck} current={current} onChange={() => updateCurrent(current + 1)}/>
            </div>
            <div>
                <Button onClick={() => speak(deck[current].value, deck[current].language, true)} type="primary">Listen</Button>
                {(tts) ? speak(deck[current].value, deck[current].language, false) : null}
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
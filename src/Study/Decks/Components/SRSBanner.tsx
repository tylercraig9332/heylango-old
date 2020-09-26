import React from 'react'
import './SRSButton.css'
import ICard from '../ICard'
import { Link } from 'react-router-dom'
import { Icon, message, Popover } from 'antd'

export default function SRSBanner(props : {deck : ICard[], current : number, onChange: any}) {


    function rate(by : string) {
        const cardData = {
            _id: props.deck[props.current]._id,
            grade: by
        }
        const reqHeaders = {
            body: JSON.stringify(cardData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH"
        }
        fetch('/s/ex/strength', reqHeaders).then(res => {
            console.log(res)
            if (res.status != 200) {
                message.info('Something went wrong: ' + res.statusText) 
                return
            } else {
                if (by === 'a') message.success('Nice!')
                props.onChange()
            }
        })
    }

    return (
        <div style={containerStyle}>
            <p style={{margin: 0}}>SRS <Popover content={
                <div>
                    <h3>Spaced Repition Toolbar</h3>
                    <p style={{marginBottom: 0}}>How you feel about a word will determine how often it comes back up.</p>
                    <p style={{marginBottom: 5}}>The easier the word, the less frequently it will appear, and vise versa.</p>
                    <p><Link to="/info/src">More Info</Link></p>
                </div>
            }><Icon type="question-circle" /></Popover>
            </p>
            <div style={buttonToolbarStyle}>
                
                <button className="button btn-purple" onClick={() => rate('f')}>Nope</button>
                <button className="button btn-rorange" onClick={() => rate('d')}>Tough</button>
                <button className="button btn-neut" onClick={() => rate('c')}>Okay</button>
                <button className="button btn-green" onClick={() => rate('b')}>Good</button>
                <button className="button btn-blue" onClick={() => rate('a')}>Easy</button>
            </div>
        </div>
    )
} 

const containerStyle = {
    width: 500,
    //border: '1px solid',
    margin: '0px auto 0 auto'
}   as React.CSSProperties

const buttonToolbarStyle = {
    display: 'flex',
    //border: '1px solid gray',
    justifyContent: 'space-between'
} as React.CSSProperties

const iconStyle = {
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    padding: 5
} as React.CSSProperties
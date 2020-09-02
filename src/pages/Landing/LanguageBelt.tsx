import React from 'react'
import language from '../../Util/language.json'
import LanguageIcon from '../../Util/LanguageIcon'

export default function LanguageBelt() {
    return (
        <div>
            <div style={container}>
                {language.info.map((l, i) => {
                    if (l.code === 'all') return null
                    return <LanguageIcon src={l.flagImg} name={l.name}/>
                })}
            </div>
        </div>
            
    )
}

const container = {
    display: 'flex', 
    justifyContent: 'center',
    flexWrap: 'wrap',
    background: '#C6C6C6',
    margin: '30px auto 30px auto',
    paddingTop: 5,
    paddingBottom: 5,
    overflowX: "auto", 
    overflowY: "hidden",
    width: '1337px',
    maxWidth: '95%',
    borderRadius: '10px'
} as React.CSSProperties
import React, { useState, useEffect } from 'react'
import List from './List'
import {Link} from 'react-router-dom'
import {Button} from 'antd'
import {LanguageSelect, CEFRSelect} from '../../Util/Select'

export default function Home() {

    const [filter, setFilter] = useState<string>('/all')
    const [sort, setSort] = useState<string>('popular')
    const [difficulty, setDifficulty] = useState<string>('NA')
    const [language, setLangauge] = useState<string>('all')

    useEffect(() => {
        const f  = `/${sort}/${language}/${difficulty}`
        setFilter(f)
    }, [difficulty, language, sort])

    return (
        <div style={container}>
            <h2>Browse Langos</h2>
            <hr></hr>
            <div style={toolbar}>
                <div style={{width: 300, marginRight: 10}}>
                    <LanguageSelect onChange={(l : any) => setLangauge(l)}/>
                </div>
                <div style={{width: 300, marginRight: 10}}>
                    <CEFRSelect onChange={(d : any) => {
                        if (d === 'N/A') d = 'NA'
                        setDifficulty(d)
                    }}/>
                </div>
                <Link to="/learn/m/create"><Button type="primary" style={{width: 300}}>Create New Lango</Button></Link>
            </div>
            
            <List by={filter} />
        </div>
    )
}

const container = {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 1000
} as React.CSSProperties

const toolbar = {
    display: 'flex',
    justifyContent: 'space-between'
} as React.CSSProperties
import React, { useState, useEffect } from 'react'
import List from './List'
import {Link} from 'react-router-dom'
import {Button, Pagination} from 'antd'
import {LanguageSelect, CEFRSelect} from '../../Util/Select'
import Loading from '../../Util/Loading'

export default function Home() {

    const [loaded, setLoaded] = useState<boolean>(false)

    const [filter, setFilter] = useState<string>('/all')
    const [sort, setSort] = useState<string>('popular')
    const [difficulty, setDifficulty] = useState<string>('NA')
    const [language, setLangauge] = useState<string>('all')
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        let l = window.sessionStorage.getItem('LangoLanguage')
        console.log(l)
        if (l === null) {
            l = 'all'
        }
        setLangauge(l)
        setLoaded(true)
    }, [])

    useEffect(() => {
        window.sessionStorage.setItem('LangoLanguage', language)
        const f  = `/${sort}/${language}/${difficulty}/${page}`
        setFilter(f)
    }, [difficulty, language, sort, page])

    if (!loaded) return <Loading message="Loading Lango Browser.." />
    return (
        <div style={container}>
            <h2>Browse Langos</h2>
            <hr></hr>
            <div style={toolbar}>
                <div style={{width: 300, marginRight: 10}}>
                    <LanguageSelect value={language} onChange={(l : any) => setLangauge(l)}/>
                </div>
                <div style={{width: 300, marginRight: 10}}>
                    <CEFRSelect onChange={(d : any) => {
                        if (d === 'N/A') d = 'NA'
                        setDifficulty(d)
                    }}/>
                </div>
                <Link to="/learn/lango/create"><Button type="primary" style={{width: 300}}>Create New Lango</Button></Link>
            </div>
            <List by={filter} />
            <Pagination total={(page * 7) + 7} current={page} onChange={(page, pageSize) => setPage(page)} defaultPageSize={7}/>
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
import { Input } from 'antd'
import React, { useState, useEffect } from 'react'
import {LanguageSelect, CategorySelect, CEFRSelect, SearchBar } from '../Util/Select'

export default function Filter(props : {onChange : any, value: string}) {


    const [language, setLanguage] = useState<string>()
    const [caption, setCap] = useState<string>()
    const [category, setCat] = useState<string>()   
    const [cefr, setCefr] = useState<string>()
    const [search, setSearch] = useState<string>()
    const [age, setAge] = useState<string>() 

    useEffect(() => {
        let qString = ''
        if (language !== undefined && language !== 'all') {
            qString += `lang-${language}_`
        }
        if (caption !== undefined && caption !== 'all') {
            qString += `cap-${caption}_`
        }
        if (category !== undefined && category !== '0') {
            qString += `cat-${category}_`
        }
        if (cefr !== undefined && cefr !== 'N/A') {
            qString += `cefr-${cefr}_`
        }
        if (search !== undefined && search != '') {
            qString += `s-${search}_`
        }
        if (age !== undefined) {
            qString += `age-${age}_`
        }
        qString = qString.slice(0, qString.length - 1)
        props.onChange(qString)
    }, [language, caption, category, cefr, search, age])

    return (
        <div style={barStyle}>
            <LanguageSelect key={'lang-' + language} value={language} onChange={setLanguage} style={{marginRight: '5px'}} placeholder="Audio Language"/>
            <LanguageSelect key={'cap-' + caption} value={caption} onChange={setCap} style={{marginRight: '5px'}} placeholder="Caption Language"/>
            <CategorySelect value={category} onChange={setCat} style={{marginRight: '5px'}} placeholder="Category"/>
            <CEFRSelect value={cefr} onChange={setCefr} style={{marginRight: '5px'}}  placeholder="Difficulty" />
            <SearchBar value={search} onChange={setSearch} placeholder="Search" />
        </div>
    )
}

const barStyle = {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto'
} as React.CSSProperties
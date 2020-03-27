import React, { useEffect, useState } from 'react'
import {BiSheet} from './BiSheet'
import Preview from './Preview'

export default function Home() {

    const [sheets, setSheets] = useState<Object[]>()

    useEffect(() => {
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/l/bi/all', reqHeaders).then(res => res.json()).then(sheets => {
            setSheets(sheets)
        })
    }, [])

    return (
        <div>
            <div>
                <h1>BiLango Sheets</h1>
                <p style={{marginTop: -10}}>Short Bilingual Texts</p>
            </div>
            <hr></hr>
            <div style={flexContainer}>
                {(sheets !== undefined) ? sheets.map((s : any) => {
                    return <Preview sheet={s} />
                }) : undefined}
            </div>
        </div>
    )
}

const flexContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    //justifyContent: 'space-between',
    alignItems: 'center',
} as React.CSSProperties
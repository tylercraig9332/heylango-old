import React, { useEffect, useState } from 'react'
import {BiSheet} from './BiSheet'
import Preview from './Preview'
import {Link} from 'react-router-dom'
import {Button} from 'antd'
import Badge from '../../User/Badge/Badge'

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
                <h1>BiLango Sheets <Badge type="comingSoon" /></h1>
                <p style={{marginTop: -10}}>Short Bilingual Texts</p>
                {/*<Link to="/learn/bi/new"><Button>Create New Sheet</Button></Link>*/}
            </div>
            <hr></hr>
            <div style={flexContainer}>
                {(sheets !== undefined) ? sheets.map((s : any) => {
                    return <Preview sheet={s} key={s._id}/>
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
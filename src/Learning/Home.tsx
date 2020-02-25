import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1>Learning Dashboard</h1>
            <hr></hr>
            <Link to='/learn/bi/new'>New BiLango</Link>
            <br></br>
            <Link to='/learn/bi/'>View BiLangos</Link>
            <br></br>
            <Link to='/learn/vid/'>Example VidLango</Link>
        </div>
    )
}
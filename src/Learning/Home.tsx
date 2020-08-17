import React from 'react'
import { Link } from 'react-router-dom'
import AppPreview from './AppPreview'
import { Icon } from 'antd'

export default function Home() {
    return (
        <div>
            <h1>Applications and Learning Dashboard</h1>
            <hr></hr>
            <h3>Learning</h3>
            <div style={appContainerStyle}>
                <AppPreview title="Lango" description="Native Learning Sheets" icon="read" path="/learn/m"/>
                <AppPreview title="BiLango" description="Bilingual Learning Sheets" icon="read" path="/learn/bi"/>
                <AppPreview title="VidLango" description="Interactive Learning Videos" icon="youtube" path="/learn/vid"/>
            </div>
            <hr></hr>
            <h3>Review</h3>
            <div style={appContainerStyle}>
                <AppPreview title="VocLango" description="Vocabulary Sheets" icon="file-done" path="learn/voc"/>
                <AppPreview title="QLango" description="Custom Quizzes" icon="profile" path="/learn/q"/>
            </div>
            <hr></hr>
            <Link to='/learn/bi/new'>New BiLango</Link>
            <br></br>
            <Link to='/learn/bi/'>View BiLangos</Link>
            <br></br>
            <Link to='/learn/vid/'>Example VidLango</Link>
        </div>
    )
}

const appContainerStyle = {
    display: 'flex'
} as React.CSSProperties
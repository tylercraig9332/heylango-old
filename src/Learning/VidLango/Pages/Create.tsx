import React from 'react'
import SheetView from '../SheetView'

export default function Create() {
    return (
        <div style={containerStyle}>
            <h1>Create New VidLango</h1>
            <SheetView />
        </div>
    )
}

const containerStyle = {
    width: '95%',
    maxWidth: '800px',
    marginRight: 'auto',
    marginLeft: 'auto'
} as React.CSSProperties
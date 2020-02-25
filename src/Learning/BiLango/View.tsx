import React from 'react'
import SheetView from './SheetView'

export default function View() {
    return (
        <SheetView id={window.location.pathname.split('/')[3]} readOnly/>
    )
}
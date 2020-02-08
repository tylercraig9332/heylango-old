import React, { useState } from 'react'
import SheetView from './SheetView'
import { Button } from 'antd'

export default function Create() {

    const [biSheet, setBiSheet] = useState<Object | undefined>()
    const [success, setSuccess] = useState<boolean>(false)

    function save() {
        // TODO: send sheet to server and handle response / success
        console.log(biSheet)
        setSuccess(true)
    }

    function extract(e : any) {
        setBiSheet(e)
    }

    return (
        <div>
            <h1>Create New BiLango Sheet</h1>
            <SheetView send={extract} />
            <Button type="primary" onClick={save} block>Save</Button>
        </div>
    )
}
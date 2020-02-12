import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SheetView from './SheetView'
import { Button, Result } from 'antd'

export default function Create() {

    const [biSheet, setBiSheet] = useState<Object | undefined>()
    const [success, setSuccess] = useState<boolean>(false)

    function save() {
        // send sheet to server and handle response / success
        console.log(biSheet)
        const reqHeaders = {
            body: JSON.stringify(biSheet),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/l/bi/', reqHeaders).then(res => {
            // todo: get it from res and set it so result button can use it.
            setSuccess(res.status === 200)
        })
    }

    /** This function will be called by subcomponents when it updates itself so this component will be updated.
     * @var {Object} e - BiSheet data.
     */
    function extract(e : Object) {
        setBiSheet(e)
    }

if (success) return (<Result status="success" title={"BiLango Sheet Successfully Created!"} 
                                extra={<Button type="primary"><Link to="todo">View</Link></Button>}/>)
    return (
        <div>
            <h1>Create New BiLango Sheet</h1>
            <SheetView send={extract} />
            <Button type="primary" onClick={save} block>Save</Button>
        </div>
    )
}
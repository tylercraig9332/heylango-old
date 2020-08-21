import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SheetView from './SheetView'
import { Button, Result } from 'antd'

export default function Create() {

    const [langoSheet, setlangoSheet] = useState<Object | undefined>()
    const [success, setSuccess] = useState<boolean>(false)
    const [successLink, setSuccessLink] = useState<string>('')
    

    function save() {
        // send sheet to server and handle response / success
        //console.log(langoSheet)
        const reqHeaders = {
            body: JSON.stringify(langoSheet),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/l/m/', reqHeaders).then(res => {
            // todo: get it from res and set it so result button can use it.
            //setSuccessLink(`/learn/m/${res.id}`)
            setSuccess(res.status === 200)
            return res.json()
        }).then(lango => {console.log(lango);setSuccessLink(`/learn/m/${lango._id}`)})
    }

    /** This function will be called by subcomponents when it updates itself so this component will be updated.
     * @var {Object} e - langoSheet data.
     */
    function extract(e : Object) {
        // saves the local object to prepare it for the save
        // I also might want to make a handler to save this object to the local session
        setlangoSheet(e)
        //console.log(e)
    }

if (success) return (<Result status="success" title={"Lango Sheet Successfully Created!"} 
                                extra={<Button type="primary"><Link to={successLink}>View</Link></Button>}/>)
    return (
        <div style={containerStyle}>
            <h1>Create New Lango Sheet</h1>
            <SheetView send={extract} />
            <hr></hr>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 15}}>
                <Button type="primary" size="large" onClick={save} block>Create New Lango</Button>
            </div>
        </div>
    )
}


const containerStyle = {
    width: '95%',
    maxWidth: '800px',
    marginRight: 'auto',
    marginLeft: 'auto'
} as React.CSSProperties
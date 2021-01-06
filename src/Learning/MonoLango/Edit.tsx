import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ILango from './Lango'
import SheetView from './SheetView'
import Loading from '../../Util/Loading'

import { Button, Result, message } from 'antd'

export default function Edit() {

    const [langoSheet, setLango] = useState<ILango>()
    const [id, setId] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)
    const [successLink, setSuccessLink] = useState<string>('')

    useEffect(() => {
        const urls = window.location.pathname.split('/')
        let l_id = urls[4] // The id from the url -> heylango.com/learn/lango/edit/${lango_id}
        const reqHeader = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        if (l_id === undefined) {
            message.error('Something is wrong: The Lango that you may be trying to view may not exist.')
            return
        }
        setId(l_id)
        fetch('/api/l/m/' + l_id, reqHeader).then((res : Response) => (res.status === 200) ? res.json() : '')
        .then((langoSheet : ILango) => {
            setLango(langoSheet)
            window.sessionStorage.setItem('LangoLanguage', langoSheet.language)
        })
        .catch(err => console.log(err))
    }, [])

    /** This function will be called by subcomponents when it updates itself so this component will be updated.
     * @var {ILango} e - langoSheet data.
     */
    function extract(e : ILango) {
        // saves the local object to prepare it for the save
        // I also might want to make a handler to save this object to the local session
        setLango(e)
    }

    function save() {
        if (langoSheet === undefined) return
        const reqHeaders = {
            body: JSON.stringify(langoSheet),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT"
        }
        fetch('/api/l/m/' + id, reqHeaders).then(res => {
            // todo: get it from res and set it so result button can use it
            setSuccess(res.status === 200)
            setSuccessLink(`/learn/lango/${id}`)
        })
    }

    if (success) return (<Result status="success" title={"Lango Sheet Successfully Updated!"} 
                                extra={<Button type="primary"><Link to={successLink}>View</Link></Button>}/>)
    if (langoSheet === undefined) return <Loading message="Loading Lango..."/> 
    return (
        <div style={containerStyle}>
            <h1>Edit Lango Sheet</h1>
            <SheetView send={extract} receive={langoSheet} />
            <hr></hr>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 15}}>
                <Button type="primary" size="large" onClick={save} block>Save Lango</Button>
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
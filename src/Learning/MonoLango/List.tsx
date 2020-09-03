import React, { useState, useEffect } from 'react'
import Lango from './Lango'
import { message } from 'antd'
import Loading from '../../Util/Loading'
import LangoPreview from './LangoPreview'
import Contribute from './Contribute'

export default function List(props : {by? : string}) {
    
    const [langos, setLangos] = useState<Lango[]>()

    useEffect(() => {
        let by = (props.by === undefined) ? '/all' : props.by
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/l/m/list' + by, reqHeaders).then((res : Response) => {
            if (res.status === 400) message.error(res.statusText)
            return res.json()
        }).then(l => {
            setLangos(l)
        })
    }, [props.by])
    
    
    if (langos === undefined) return <Loading message="Loading Langos"/>
    if (langos.length === 0) return <Contribute />
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {langos.map((l : Lango) => {
                return (
                    <LangoPreview lango={l} key={l._id}/>
                )
            })}
        </div>
    )
}
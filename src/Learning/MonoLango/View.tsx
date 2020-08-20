import React, { useState, useEffect } from 'react'
import Lango from './Lango'
import Loading from '../../Util/Loading'
import Editor from '../../Draft/DraftEditor'
import { EditOrAdmin, Info } from '../../Toolbar/Icons'
import CommentEngine from '../../Comment/Engine'
import { message } from 'antd'

export default function View() {

    const [lango, setLango] = useState<Lango | undefined>()
    
    useEffect(() => {
        const urls = window.location.pathname.split('/')
        let l_id = urls[3] // The id from the url
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
        fetch('/l/m/' + l_id, reqHeader).then((res : Response) => (res.status === 200) ? res.json() : '')
        .then((langoSheet : Lango | undefined) => {
            setLango(langoSheet)
        })
        .catch(err => console.log(err))
    }, [])

    function edit() {
        // TODO: redirect to an edit page that will load this lango to be edited
    }
    
    if (lango === undefined) return <Loading message="Loading Lango"/>
    return (
        <div style={container}>
            <div style={langoHeader}>
                {/* TODO: Add preview image support and place it here */}
                <div>
                    <span style={titleStyle}>{lango.title}</span> <Info title="Description" description={lango.description}/>
                </div>
                
                <EditOrAdmin handleEdit={edit} editView={false} parent={lango._id} parentType={'Lango'}/>
            </div>
            <div className="langoBody" style={langoBody}>
                <Editor 
                    value={lango.content} 
                    readOnly
                    wordLearner
                    style={editorStyle}
                    wrap 
                />
            </div>
            <br></br>
            <div>
                <CommentEngine parent_id={lango._id}/>
            </div>
        </div>
    )
}

const container = {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '95%',
    maxWidth: '800px'
} as React.CSSProperties

const langoHeader = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
} as React.CSSProperties

const editorStyle = {
    width: '100%',
    fontSize: 20
} as React.CSSProperties

const titleStyle = {
    fontSize: '2em',
    fontWeight: 'bolder'
} as React.CSSProperties

const langoBody = {
    overflow: 'auto',
    maxHeight: '500px'
} as React.CSSProperties
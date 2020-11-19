import React, { useState, useEffect } from 'react'
import Lango from './Lango'
import Loading from '../../Util/Loading'
import Editor from '../../Draft/WordLearner/WordLearner'
import { EditOrAdmin, Info, Like } from '../../Toolbar/Icons'
import CommentEngine from '../../Comment/Engine'
import { message } from 'antd'
import CompanionVideoPlayer from '../VidLango/CompanionPlayer'
import Author from '../../User/Author'
import PreviewImage from '../../Util/ResourcePreviewImage'

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
        .then((langoSheet : Lango) => {
            setLango(langoSheet)
            window.sessionStorage.setItem('LangoLanguage', langoSheet.language)
        })
        .catch(err => console.log(err))
    }, [])

    function edit() {
        // TODO: redirect to an edit page that will load this lango to be edited
        if (lango === undefined) return
        window.location.href = `/learn/lango/edit/${lango._id}`
    }

    if (lango === undefined) return <Loading message="Loading Lango"/>
    
    const langoVideo = ( lango.video_id !== undefined && lango.video_id.length > 0) ? (
        <div className="VidLango" style={videoContainer}>
            <CompanionVideoPlayer video_id={lango?.video_id} visible/>
        </div> ) : null
    
    return (
        <div style={container}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={titleStyle}>{lango.title}</span> <Info title="Description" description={lango.description}/>
            </div>
            <div style={langoHeader}>
                <div>
                    <Author user_id={lango.author}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', width: 50}}>
                    <Like parent_id={lango._id} />
                    <EditOrAdmin handleEdit={edit} editView={false} parent={lango._id} parentAuthor={lango.author} parentType={'Lango'}/>
                </div>
            </div>
            {langoVideo}
            <div className="langoBody" style={langoBody}>
                <Editor 
                    value={lango.content} 
                    readOnly
                    style={editorStyle}
                    wordsPerPage={25}
                    lineHeight={'60px'}
                    fontSize={'25px'}
                />
            </div>
            <br></br>
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
    maxWidth: '1000px'
} as React.CSSProperties

const langoHeader = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10 
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
    //maxHeight: '500px'
} as React.CSSProperties

const videoContainer = {
    //minHeight: '394px',
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '700px'
}
import React, { useEffect, useState } from 'react'
import IVidLango from '../VidLango'
import Preview from '../Preview'
import { Button, message, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import Filter from '../../Filter'
import Loading from '../../../Util/Loading'
import Contribute from '../Contribute'

export default function Home() {

    const [langos, setLangos] = useState<Array<IVidLango>>([])
    const [qString, setQString] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        fetch(`/l/vid/list/${page}/${qString}`).then(res => {
            if (res.status !== 200) {
                console.error(res.statusText)
                message.error(res.statusText)
                setLoaded(true)
                return
            }
            return res.json()
        }).then(data => {
            setLoaded(true)
            if (data === undefined) return
            setLangos(data)
        }).catch(err => message.error(err))
    }, [qString, page])

    return (
        <div style={wrap}>
            <div style={flexHeader}>
                <h1>Browse VidLangos</h1>
                <Link to="/learn/vid/create"><Button type="primary" size="large">Create New VidLango</Button></Link>
            </div>
            <hr style={{maxWidth: '1200px'}}></hr>
            <Filter value={qString} onChange={(q : string) => {setQString(q); setPage(1)}} />
            <div style={flexBody}>
            {
                (langos.length > 0) ?
                langos.map((lango) => {
                    return <Preview key={lango._id} vidLango={lango} />
                }) : (loaded) ?  <Contribute /> : <Loading message="Loading Langos" />
            }
            </div>
            <div style={{marginLeft: '90px'}}>
                <Pagination total={(page * 8) + langos.length} current={page} onChange={(page, pageSize) => setPage(page)} defaultPageSize={8}/>
            </div>
        </div>
    )
}

const wrap = {
    maxWidth: '1400px',
    marginRight: 'auto',
    marginLeft: 'auto'
}

const flexHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    marginRight: 'auto',
    marginLeft: 'auto'
} as React.CSSProperties

const flexBody = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center'
} as React.CSSProperties
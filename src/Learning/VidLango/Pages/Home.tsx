import React, { useEffect, useState } from 'react'
import IVidLango from '../VidLango'
import Preview from '../Preview'
import { Button, message, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import Filter from '../../Filter'

export default function Home() {

    const [langos, setLangos] = useState<Array<IVidLango>>([])
    const [qString, setQString] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        fetch(`/l/vid/list/${page}/${qString}`).then(res => {
            if (res.status !== 200) {
                console.error(res.statusText)
                message.error(res.statusText)
                return
            }
            return res.json()
        }).then(data => {
            if (data === undefined) return
            setLangos(data)
        }).catch(err => message.error(err))
    }, [qString, page])

// https://www.youtube.com/watch?v=x7R8joj0PHE
    return (
        <div>
            <div style={flexHeader}>
                <h1>Browse VidLangos</h1>
                <Link to="/learn/vid/create"><Button type="primary" size="large">Create New VidLango</Button></Link>
            </div>
            <hr style={{maxWidth: '1200px'}}></hr>
            <Filter value={qString} onChange={setQString} />
            <div style={flexBody}>
            {
                langos.map((lango) => {
                    return <Preview key={lango._id} vidLango={lango} />
                })
            }
            </div>
            <Pagination total={(page * 7) + 7} current={page} onChange={(page, pageSize) => setPage(page)} defaultPageSize={7}/>
        </div>
    )
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
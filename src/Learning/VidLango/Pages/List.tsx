import React, { useState, useEffect } from 'react'
import Preview from '../Preview'
import Filter from '../../Filter'
import Loading from '../../../Util/Loading'
import Contribute from '../Contribute'
import { Pagination, message } from 'antd'
import IVidLango from '../VidLango'

export default function List(props : {by?: string, vidLangos?: IVidLango[]}) {

    const [langos, setLangos] = useState<IVidLango[]>([])
    const [qString, setQString] = useState<string>('')
    const [loaded, setLoaded] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        if (props.by === 'props' && props.vidLangos !== undefined) {
            // Means the data was passed through a prop
            setLangos(props.vidLangos)
            return
        }
        setLoaded(false)
        setLangos([])
        // Default will be all
        let by = (props.by !== undefined) ? props.by : 'all' 
        fetch(`/l/vid/list/${by}/${page}/${qString}`).then(res => {
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
        <div>
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

const flexBody = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
} as React.CSSProperties
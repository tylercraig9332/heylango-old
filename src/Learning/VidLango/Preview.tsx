import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IVidLango from './VidLango'
import { Card, Tag } from 'antd'
import { parseCategoryId, parseLanguageCode, parseLanguageFlag } from '../../Util/functions'
import { inherits } from 'util'

type PreviewProps = {
    vidLango : IVidLango
}

export default function Preview(props : PreviewProps) {

    const [hover, setHover] = useState<boolean>(false)
    const [thumb, setThumb] = useState<string>('') // tODO: replace with default url to use

    useEffect(() => {
        if (props.vidLango.meta?.thumbnails === undefined) return
        const thumbs = JSON.parse(props.vidLango.meta?.thumbnails)
        setThumb(thumbs.medium.url)
    }, [])

    if (props.vidLango === undefined || props.vidLango.meta === undefined) return null

    let captionMap;
    if (props.vidLango.captions.length > 0)  {
        captionMap = props.vidLango.captions.map((cObj) => {
            return <span key={cObj.lCode} style={{margin: '0px 5px 0xp 5px'}}><Tag color="blue">{parseLanguageCode(cObj.lCode)}</Tag></span>
        })
    } else {
        captionMap = <span key="nocap" style={{margin: '0px 5px 0xp 5px'}}><Tag color="red">No Captions :(</Tag></span>
    }
    

    return (
        <Card style={(hover) ? cardHover : notHover} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} hoverable>
            <Link style={{color: 'inherit'}} to={`/learn/vid/${props.vidLango._id}`}>
            <h2 style={{marginTop: '-15px'}}>{props.vidLango.meta.title}</h2>
            <div style={{marginRight: 'auto', marginLeft: 'auto', width: '320px'}}><img src={thumb} /></div>
            <div>
                <Line><strong>Audio </strong>{parseLanguageCode(props.vidLango.language)} {parseLanguageFlag(props.vidLango.language)}</Line>
                <Line><strong> Captions </strong> {captionMap}</Line>
                <Line><strong> Category </strong> {parseCategoryId(props.vidLango.meta.categoryId)}</Line>
            </div>
        </Link>
        </Card>
    )
}

function Line(props : {children : any}) {
    return <div style={{margin: 0}}>{props.children}</div>
}

const cardWrapper = {
    display: 'flex',
    flexDirection: 'row',
    margin: '20px',
    minHeight: '300px',
    width: '600px',
    paddingTop: 0
} as React.CSSProperties

const notHover = {
    border: '1px solid #d9d9d9',
    borderRadius: '8px',
    ...cardWrapper
} as React.CSSProperties

const cardHover = {
    border: '1px solid #1890ff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px fade(#1890ff, 20%)',
    ...cardWrapper
} as React.CSSProperties

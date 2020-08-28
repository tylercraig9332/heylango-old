import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Lango from './Lango'
import { Card, Col, Row } from 'antd'

import PreviewImage from '../../Util/ResourcePreviewImage'
import Loading from '../../Util/Loading'
import { parseLanguageCode } from '../../Util/functions'
import { Like, Save, EditOrUser } from '../../Toolbar/Icons'


export default function LangoPreview(props : {lango : Lango}) {

    const [loaded, setLoaded] = useState<boolean>(false)

    const toolbar = [
        <Like parent_id={props.lango._id} />,
        <Save parent_id={props.lango._id} parentType='lango' />,
    ]

    React.useEffect(() => {
        //console.log(props.lango)
        if (props.lango != undefined) {
            setLoaded(true)
        }
    })

    if (!loaded) return <div style={wrapStyle}><Loading message="Loading Lango" /></div>
    return (
        <div style={wrapStyle} key={props.lango._id}>
                <Card 
                    actions={toolbar}
                    hoverable
                >
                    <Link to={`/learn/m/${props.lango._id}`} style={{color: 'inherit'}}>
                    <Row type="flex">
                        <Col span={3}>
                            <PreviewImage src={props.lango.imageSrc} />
                        </Col>
                        <Col>
                            <Row type="flex" justify="start" align='middle'>
                                <h1>{props.lango.title}</h1>
                            </Row>
                            <Row>
                                {parseLanguageCode(props.lango.language)} {props.lango.difficulty}
                            </Row>
                        </Col>
                    </Row>
                    </Link>
                    <Row>
                    <Col span={3}>
                            
                    </Col>
                    <Col>
                        
                    </Col>
                    </Row>
                </Card>
        </div>
    )
}

const wrapStyle = {
    margin: '20px',
    width: '95%',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxHeight: '300px'
}
import React from 'react'
import Lango from './Lango'
import { Card, Col, Row } from 'antd'
import PreviewImage from '../../Util/ResourcePreviewImage'
import { Link } from 'react-router-dom'
import { Like, Save, EditOrUser } from '../../Toolbar/Icons'


export default function LangoPreview(props : {lango : Lango}) {

    const toolbar = [
        <Like parent_id={props.lango._id} />,
        <Save parent_id={props.lango._id} parentType='lango' />
    ]

    return (
        <div style={wrapStyle}>
            <Link to={`/learn/m/${props.lango._id}`}>
                <Card 
                    actions={toolbar}
                    hoverable
                >
                    <Row type="flex">
                        <Col span={3}>
                            <PreviewImage src={props.lango.imgSrc} />
                        </Col>
                        <Col span={10}>
                            <Row type="flex" justify="start" align='middle'>
                                <h1>{props.lango.title}</h1>
                            </Row>
                            <Row>
                                <p>{props.lango.description}</p>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Link>
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
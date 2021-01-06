import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Tag } from 'antd'
import { Link } from 'react-router-dom'

export default function Launch() {

    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        let l = sessionStorage.getItem('logged')
        let lBool = false
        if (l && l == 'true') lBool = true 
        setLoggedIn(lBool)
    }, [])

    const portalButtons = (
        <div className="portalButtons">
            <Button size="large" type="primary" block style={buttonStyle}><Link to="/signup">Sign Up!</Link></Button>
            <Button size="large" block style={buttonStyle}><Link to="/portal">Log In</Link></Button>
        </div>
    )

    return (
        <div>
            <div style={page1Style}>
                <Row style={rowStyle}>
                    <Col span={6} offset={6} style={{width: '600px', marginBottom: '15%', ...colStyle}}>
                        <h1><img src="/api/static/HeyLangoT1.png" style={{maxWidth:'90%', width: 400, height: 'auto'}}/></h1>
                        <h1>It's Time to Get Fluent</h1>
                        {loggedIn ? null : portalButtons}
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={6} offset={6} style={{width: '900px', ...colStyle}}>
                        <h1>Discover yourself in a new world of language</h1>
                        <img src="/api/static/demo3.png" style={{maxWidth: '90%', width: 600, height: 'auto'}} />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={6} offset={6} style={{width: '900px', ...colStyle}}>
                        <h1 style={{marginTop: 20}}>Real content, not from a scripted course</h1>
                        <img src="/api/static/demo.png" style={{maxWidth: '90%', width: 600, height: 'auto'}}/>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={6} offset={6} style={{width: '900px', ...colStyle}}>
                        <h1>Review what matters</h1>
                        <img src="/api/static/demo2.png" height={'auto'} style={{maxWidth: '90%', width: 800, height: 'auto'}}/>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={6} offset={6} style={{width: '600px', ...colStyle}}>
                        <h1>Free tools for effective language learners</h1>
                        <h1></h1>
                        {loggedIn ? null : (
                            <div className="portalButtons">
                            <Button size="large" type="primary" block style={buttonStyle}><Link to="/signup">Sign up for free!</Link></Button>
                            </div>
                        )}
                    </Col>
                </Row>
                <span style={{padding: 40}}></span>
            </div>
        </div>
    )
}

const page1Style = {
    backgroundImage: 'url(/api/static/louis-pellissier-unsplash.jpg)',
    top: 0,
    left: 0,
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundSize: 'cover',
    overflow: 'auto'
} as React.CSSProperties

const rowStyle = {
    left: 0, display: 'flex', alignItems: 'center', zIndex: 1
} as React.CSSProperties

const colStyle = {
    maxWidth: '90%', marginRight: 'auto', marginLeft: 'auto', padding: 30,
    border: '1px', borderRadius: '4px', backgroundColor: 'white',
    marginTop: 100, zIndex: 1, textAlign: 'center'
} as React.CSSProperties

const buttonStyle = {
    margin: 3
}
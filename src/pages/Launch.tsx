import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'antd'
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
        <div style={pageStyle}>
            <Row style={rowStyle}>
                <Col span={6} offset={6} style={colStyle}>
                    <h1 style={{color: 'dimgray'}}>Welcome to HeyLango!</h1>
                    <p>Time to Get Fluent</p>
                    {loggedIn ? null : portalButtons}
                </Col>
            </Row>
        </div>
    )
}

const pageStyle = {
    backgroundImage: 'url(static/louis-pellissier-unsplash.jpg)',
    top: 0,
    left: 0,
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundSize: 'cover'
} as React.CSSProperties

const rowStyle = {
    left: 0, display: 'flex', alignItems: 'center', zIndex: 1
} as React.CSSProperties

const colStyle = {
    minWidth: 300, marginRight: 'auto', marginLeft: 'auto', padding: 30,
    border: '1px', borderRadius: '4px', backgroundColor: 'white',
    marginTop: 100, zIndex: 1, textAlign: 'center'
} as React.CSSProperties

const buttonStyle = {
    margin: 3
}
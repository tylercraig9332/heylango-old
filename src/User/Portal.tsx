import React, { useState, useEffect } from 'react';

import { Button, Col, Input, message, Row } from 'antd';
import 'antd/dist/antd.css';

import { Link } from 'react-router-dom'

import formToJSON from './formToJSON';
//import Success from './Alerts/Success';

export default function Portal(props: any) {
 
    const [success, setSuccess] = useState<Boolean>(false);

    useEffect(() => {

    }, [success])


    function handleSubmit(event : any) {
        event.preventDefault()
        const form = formToJSON(event.target)
        const reqHeaders = {
          body: JSON.stringify(form),
          headers: {
              "Content-Type": "application/json"
          },
          method: "POST"
      }
      fetch('/api/u/login/', reqHeaders)
      .then(async (res)  => {
          //window.sessionStorage.setItem('username', res.)
           setSuccess(res.status === 200) 
           if (res.status === 200) {
              await res.json().then((user) => {
                window.sessionStorage.setItem('logged', 'true')
                window.sessionStorage.setItem('username', user.username)
                window.sessionStorage.setItem('userId', user.id)
                window.sessionStorage.setItem('userRole', user.meta.role)
              })
              window.location.href = '/learn/vid'
           }
           else {
            message.error(res.statusText)
           }
           
        })
      .catch(error=>console.error(error))
    }

    const signup = (props.signup === undefined) ? (<span style={formStyle}><Link to='/signup'>Don't have an account? Sign Up</Link></span>) : undefined

    return (
        <div style={pageStyle}>
            <Row style={rowStyle}>
              <Col span={6} offset={6} style={colStyle}>
                <h1 style={{color: 'dimgrey'}}>Sign In</h1>
                <div>{success ? /*<Success />*/undefined : undefined}</div>
                <form onSubmit={handleSubmit}>
                  <Input name="username" placeholder="username" size="large"/>
                  <Input.Password name="password" placeholder="password" style={formStyle} size="large" />
                  <Button type="primary" size="large" style={formStyle} block htmlType="submit">Go</Button>
                  {signup}
                </form>
              </Col>
            </Row>
        </div>
    )
}

const pageStyle = {
    backgroundImage: 'url(/api/static/louis-pellissier-unsplash.jpg)',
    top: 0,
    left: 0,
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundSize: 'cover'
} as React.CSSProperties

const formStyle = {
  marginTop: 10,
  zIndex: 1
} as React.CSSProperties

const colStyle = {
  minWidth: 300, marginRight: 'auto', marginLeft: 'auto', padding: 30,
  border: '1px', borderRadius: '4px', backgroundColor: 'white',
  marginTop: 100, zIndex: 1
} as React.CSSProperties

const rowStyle = {
  left: 0, display: 'flex', alignItems: 'center', zIndex: 1
} as React.CSSProperties
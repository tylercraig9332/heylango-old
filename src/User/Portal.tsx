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
      fetch('/u/login/', reqHeaders)
      .then( res => {
           setSuccess(res.status === 200) 
           if (res.status === 200) {
               window.location.href = '/community/'
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
            <Row>
              <Col span={6} offset={6}>
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
    marginTop: '2rem'
}

const formStyle = {
  marginTop: 10
}
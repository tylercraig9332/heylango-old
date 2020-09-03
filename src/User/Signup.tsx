import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom'

import { Button, Col, Input, Row, Alert, Result, message } from 'antd';
import 'antd/dist/antd.css';

import formToJSON from './formToJSON'

/* Begin Alerts */

function Email() {
    return (
        <Alert message="Email is not valid" type="error" style={{marginTop: 10}} showIcon/>
    )
}

function Length() {
    return (
        <Alert 
            message="Password is not at least 7 characters" 
            type="warning"  
            style={{marginTop: 10}}
            showIcon
        />
    )
}

function Match() {
    return (
        <Alert message="Passwords do not match" type="error" style={{marginTop: 10}} showIcon/>
    )
}

function Complete() {
    return (
        <Alert message="Please fill out all fields" type="warning" style={{marginTop: 10}} showIcon/>
    )
}

function Success() {
    return (
        <Alert message="Success!" type="success" style={{marginTop: 10, marginBottom: 10}} showIcon/>
    )
}


export default function SignUp(props: any) {

    const [submit, setSubmit] = useState<boolean>(false)

    const [incomplete, setinComplete] = useState<boolean>(false)

    const [match, setMatch] = useState<boolean>(false)

    const [length, setLength] = useState<boolean>(false)

    const [email, setEmail] = useState<boolean>(false)

    const [success, setSuccess] = useState<boolean>(false)

    const [error, setError] = useState<boolean>(false)

    function handleSubmit(event : any) : void {
        event.preventDefault()
        let form: any = formToJSON(event.target)
        const incomp = !(form.username.length > 0 && form.password.length > 0 && form.match.length > 0 && form.email.length > 0)
        setinComplete(incomp)
        const match = (form.password !== form.match) 
        setMatch(match)
        const length = (form.password.length < 7) 
        setLength(length)

        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const email = !emailPattern.test(form.email)
        setEmail(email)
        // All checks pass
        if (!incomp && !match && !length && !email) {
            const reqHeaders = {
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            }

            fetch('/u/signup', reqHeaders)
            .then(res => {
                setSuccess(res.status === 200)
                if (res.status === 400) {
                    console.log(res)
                    message.error(res.statusText)
                }
            })
            .catch(error=>console.error(error))
        }
        
    }

    useEffect(() => {
        //
    }, [success])

    
    if (success) return (
        <Result
            status="success"
            title="Success!"
            subTitle="Thanks for signing up :)"
            extra={
                <Button type="primary"><Link to='/portal'>Log in</Link></Button>
            }
        />
    )
    return (
        <div style={pageStyle}>
            <Row style={rowStyle}>
              <Col span={6} offset={6} style={colStyle}>
                <h1 style={{color: 'dimgrey'}}>Sign Up</h1>
                <div>{success ? <Success /> : undefined}</div>
                <form onSubmit={handleSubmit}>
                  <Input name="username" placeholder="new username" size="large"/>
                  <Input name="email" placeholder="email" style={formStyle} size="large"/>
                  <Input.Password name="password" placeholder="new password" style={formStyle} size="large" />
                  <Input.Password name="match" placeholder="re-enter password" style={formStyle} size="large" />
                  <Button type="primary" size="large" style={formStyle} block htmlType="submit" onClick={() => setSubmit(true)}>Go</Button>
                </form>
                <br></br>
                <div>{match ? <Match /> : undefined } </div>
                <div>{incomplete ? <Complete/> : undefined }</div>  
                <div>{length ? <Length /> : undefined}</div>
                <div>{email ? <Email /> : undefined}</div>
              </Col>
            </Row>
        </div>
    )
}



// Component Style

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

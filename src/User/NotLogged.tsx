import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Result } from 'antd'

export default function NotLogged(props : {message?: string}) {

    const extraComp = (
        <Link to={'/portal'}>
                <Button type="primary" key="portal">
                    Log in
                </Button>
        </Link>
    )

    return (
        <Result title={`Please Log in ${props.message}`} extra={extraComp} />
    )
}
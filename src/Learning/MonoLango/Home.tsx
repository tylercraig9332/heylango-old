import React from 'react'
import List from './List'
import {Link} from 'react-router-dom'
import {Button} from 'antd'

export default function Home() {
    return (
        <div>
            <Link to="/learn/m/create"><Button>Create</Button></Link>
            <List by="all" />
        </div>
    )
}
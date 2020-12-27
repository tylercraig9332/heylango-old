import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { message, Tabs, Alert, Button } from 'antd'
import Loading from '../../Util/Loading'
import ExpressionList from '../../Study/Expression/List'

const { TabPane } = Tabs

export default function Saved() {

    const [loaded, setLoaded] = useState<boolean>(false)
    const [saved, setSaved] = useState<any>()

    useEffect(() => {
        fetch('/i/s/user/me').then(res => {
            setLoaded(true)
            if (res.status !== 200) {
                message.error('Something went wrong')
                return
            }
            return res.json()
        }).then(data => {
            console.log(data)
        })
    }, [])

    if (!loaded) return <Loading message="Loading Saved!" />
    return (
        <div>
            <h1 style={{color: 'spacegray'}}>Saved</h1>
            <Tabs defaultActiveKey={'vidlango'}>
                <TabPane tab="VidLangos" key="vidlangos">
                    <div>

                    </div>
                </TabPane>
                <TabPane tab="Langos" key="langos">

                </TabPane>
                <TabPane tab="Posts" key="posts">

                </TabPane>
                <TabPane tab="Words / Expressions" key="expressions">
                <Alert
                    message={<div>Saved words and expressions can also be found in <Link to="/study/"><Button type="primary" size="small">Review Library</Button></Link></div>}
                    type="info"
                    description=""
                    showIcon
                    style={{width: 520, marginBottom: '20px'}}
                    closable
                />
                    <ExpressionList />
                </TabPane>
            </Tabs>
        </div>
    )
}
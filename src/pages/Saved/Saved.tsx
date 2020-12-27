import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { message, Tabs, Alert, Button } from 'antd'
import Loading from '../../Util/Loading'
import ExpressionList from '../../Study/Expression/List'
import IVidLango from '../../Learning/VidLango/VidLango'
import ILango from '../../Learning/MonoLango/Lango'
import IPost from '../../Post/Post'
import VidLangoList from '../../Learning/VidLango/Pages/List'
import ListLangos from '../../Learning/MonoLango/List'

const { TabPane } = Tabs

export default function Saved() {
    return (
        <div>
            <h1 style={{color: 'spacegray'}}>Saved</h1>
            <Tabs defaultActiveKey={'vidlango'}>
                <TabPane tab="VidLangos" key="vidlangos">
                    <div>
                        <VidLangoList by="saved" />
                    </div>
                </TabPane>
                <TabPane tab="Langos" key="langos">
                    {/*<LangoList by="saved" />*/null}
                </TabPane>
                <TabPane tab="Posts" key="posts">
                    {/*<PostList by="saved" />*/null}
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
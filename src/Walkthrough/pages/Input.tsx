import React from 'react'
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function Input() {
    return (
        <Collapse className="my-8" accordion style={{ minWidth: '375px', width: 'auto', maxWidth: '600px'}}>
        <Panel header="Langos" key="1">

        </Panel>
        <Panel header="BiLangos" key="2">

        </Panel>
        <Panel header="VidLangos" key="3">

        </Panel>    
        </Collapse>
    )
}
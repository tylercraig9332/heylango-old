import React from 'react'
import {PageHeader} from 'antd'

export default function PageHead(props : {title : string, subTitle: string}) {
    return (
        <div>
            <PageHeader onBack={() => window.history.back()} title={props.title} subTitle={props.subTitle} style={{backgroundColor: 'inherit'}}/>
            <hr></hr>
        </div>
    )
} 
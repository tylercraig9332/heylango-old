import React, { useState, useEffect } from 'react'
import Expression from './Expression'
import { message, Table } from 'antd'
import {parseLanguageCode} from '../../Util/functions'

export default function List() {

    const [expressions, setExpressions] = useState<Expression[]>([])

    useEffect(() => {
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/s/ex/', reqHeaders).then(res => {
            if (res.status !== 200) message.error(res.statusText) 
            return res.json()
        }).then(exp => {
            const tableData = exp.map((exp : Expression , i : number) => {
                    return {
                        key: exp._id,
                        expression: exp.value,
                        translation: exp.translation,
                        language: parseLanguageCode(exp.language)
                    }
                })
            setExpressions(tableData)
        })
    }, [])

    const tableHeaders = [
        {
            title: 'Word / Expression',
            dataIndex: 'expression',
            key: 'expression'
        },
        {
            title: 'Meaning / Translation',
            dataIndex: 'translation',
            key: 'translation'
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language'
        }
        
    ]

    

    return (
        <div>
            <h2>Saved Words and Expressions</h2>
            <Table dataSource={expressions} columns={tableHeaders} bordered/>
        </div>
    )
}
import React, { useState, useEffect } from 'react'
import Expression from './Expression'
import { message, Table, Button, Modal, Icon, Input, Popconfirm } from 'antd'
import {parseLanguageCode} from '../../Util/functions'

import ButtonGroup from 'antd/lib/button/button-group'

export default function List() {

    const [expressions, setExpressions] = useState<Expression[]>([])
    const [editModal, setEditModal] = useState<boolean>(false)

    const [editExpression, setEditExpression] = useState<any>()
    const [editValue, setEditValue] = useState<string>('')
    const [editTranslation, setEditTranslation] = useState<string>('')
    const [editLanguage, setEditLanguage] = useState<string>('')
    const [edit_id, setEdit_id] = useState<string>('')

    useEffect(() => {
        console.log('from onChange', editExpression)
    }, [editExpression])

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
    }, [setEditModal])

    const actionComponent = (expression : any) => {
        return (
            <Button onClick={() => {
                console.log(expression)
                setEditModal(true)
                setEditValue(expression.expression)
                setEditLanguage(expression.language)
                setEditTranslation(expression.translation)
                setEdit_id(expression.key)     
            }}><Icon type="edit" /></Button>

    )}

    const tableHeaders = [
        {
            dataIndex: '',
            key: 'edit',
            width: '20px',
            render: (t : any) =>  <div>{actionComponent(t)}</div>
        },
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

    function saveWord() {
        // TODO: save edits made
        const reqHeader = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                value: editValue,
                translation: editTranslation
            })
        }
        fetch('/s/ex/' + edit_id, reqHeader).then(r => {
            if (r.status === 200) message.success('Saved!')
            else if (r.status === 400) message.error('An error has occurred')
            setEditModal(false)
            setEditValue('')
            setEditLanguage('')
            setEditTranslation('')
            setEdit_id('')
        })
        .catch((err) => {
            console.error(err)
        })
    }

    function deleteWord() {
        const reqHeader = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: edit_id
            })
        }
        fetch('/s/ex/' + edit_id, reqHeader).then(r => {
            if (r.status === 200) message.success('Deleted')
            else if (r.status === 400) message.error('An error has occurred')
            setEditModal(false)
            setEditValue('')
            setEditLanguage('')
            setEditTranslation('')
            setEdit_id('')
        })
    }

    

    return (
        <div>
            <h2>Saved Words and Expressions</h2>
            <Table dataSource={expressions} columns={tableHeaders} bordered/>
            <Modal title="Edit Word / Expression" visible={editModal} onOk={() => saveWord()} onCancel={() => setEditModal(false)} okText={'Save'}>
                <div style={{color: 'spacegray'}}>Word or Phrase</div>
                <Input key={'value'} value={editValue} onChange={(e : any) => {setEditValue(e.currentTarget.value)}} />
                <div style={{color: 'spacegray', marginTop: '10px'}}>Translation</div>
                <Input key={'translation'} value={editTranslation} onChange={(e : any) => setEditTranslation(e.currentTarget.value)} />
                <div style={{color: 'spacegray', marginTop: '10px'}}>Action</div>
                <Popconfirm
                    title="Are you sure you want to delete this word / phrase?"
                    onConfirm={deleteWord}
                    okText='Delete'
                >
                    <Button type="danger" >Delete Word / Phrase</Button>
                </Popconfirm>
                
            </Modal>
        </div>
    )
}
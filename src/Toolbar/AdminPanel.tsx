import React , { useState } from 'react'
import { Modal, Form, Button, Checkbox, Col, Row, Input, message, Radio } from 'antd'
const {TextArea} = Input

export default function AdminPanel(props : {show: boolean, setShow: any, parent: string, parentType: string}) {
 

    const [reportType, setReportType] = useState<string>('')
    const [otherValue, setOther] = useState<string>('')


    const otherInputComponent = (reportType === 'other') ? (
        <Row><TextArea value={otherValue} onChange={(e : any) => {setOther(e.currentTarget.value)}} placeholder="Please explain..."/></Row>
    ) : null

    function handleReport(e : any) {
        e.preventDefault()
        // TODO: Extract form data and create a back-end error report request 
        console.log("Report for " + props.parent)
        let reportData = {
            type: reportType, // TODO: fix this by either making radio buttons or handling a string array
            parent: props.parent,
            parentType: props.parentType,
            details: otherValue
        }
        console.log(reportData)
        const reqHeaders = {
            body: JSON.stringify(reportData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/admin/report', reqHeaders).then(res => {
            if (res.status === 200) message.success(`Successfully reported ${props.parentType}! Thank you`)
            else message.error('Something went wrong')
        })
        props.setShow(false)
    }

    return (
        <Modal
                title={"Admin"}
                visible={props.show}
                onCancel={() => props.setShow(false)}
                footer={<div><Button type="danger" onClick={() => props.setShow(false)}>Cancel</Button></div>}
            >
                <h3>Make a report</h3>
                <Form onSubmit={handleReport}>
                    <Col>
                    <Radio.Group name="radiogroup" onChange={(v) => setReportType(v.target.value)} value={reportType}>
                        <Radio key="spam" value={'spam'} style={radioStyle}>Spam</Radio>
                        <Radio key="offensive" value={'offensive'} style={radioStyle}>Offensive Content</Radio>
                        <Radio key="error" value={'error'} style={radioStyle}>Error(s)</Radio>
                        <Radio key="other"  value={'other'} style={radioStyle}>Other</Radio>
                    </Radio.Group>
                        {otherInputComponent}
                    </Col>
                    <br></br>
                    <Button type="primary" block htmlType="submit">Report {props.parentType}</Button>
                </Form>
        </Modal>
    )
}

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '20px'
} as React.CSSProperties
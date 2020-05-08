import React , { useState } from 'react'
import { Modal, Form, Button, Checkbox, Col, Row, Input, message } from 'antd'
const {TextArea} = Input

export default function AdminPanel(props : {show: boolean, setShow: any, parent?: string, parentType: string}) {
 
    const [otherShow, setOtherShow] = useState<boolean>(false)
    const [otherValue, setOther] = useState<string>('')


    const otherInputComponent = (otherShow) ? (
        <Row><TextArea value={otherValue} onChange={(e : any) => {setOther(e.currentTarget.value)}} placeholder="Please explain..."/></Row>
    ) : null

    function handleReport(e : any) {
        e.preventDefault()
        // TODO: Extract form data and create a back-end error report request 
        console.log("Report for " + props.parent)
        message.success(`Successfully reported ${props.parentType}! Thank you`)
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
                        <Row><Checkbox key="spam">Spam</Checkbox></Row>
                        <Row><Checkbox key="offensive">Offensive Content</Checkbox></Row>
                        <Row><Checkbox key="error">Error(s)</Checkbox></Row>
                        <Row><Checkbox key="other" onClick={() => setOtherShow(!otherShow)}>Other</Checkbox></Row>
                        {otherInputComponent}
                    </Col>
                    <br></br>
                    <Button type="primary" block htmlType="submit">Report {props.parentType}</Button>
                </Form>
        </Modal>
    )
}
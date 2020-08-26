import React from 'react'
import { Input, Button, Form, Comment, notification } from 'antd'
import Avatar from '../User/Avatar'
const { Item } = Form
const {TextArea} = Input

export default function ReplyEditor(props : {onChange : any | undefined, value: string | undefined, onSubmit?: any, visible?: boolean}) {

    let visible = props.visible
    if (visible === undefined) {
        visible = true
    }

    function triggerDemo() {
        //notification.info({message: 'Beta Feature', description: 'The comment section has still yet to be fully implemented, please understand that this is a workable demo.'})
    }


    if (!props.visible) return null

    const commentStruct = (
        <Form>
            <Item>
                <TextArea rows={4} onChange={(e : any) => props.onChange(e)} value={props.value} placeholder={"Reply"}/>
            </Item>
            <Item style={{marginTop: -20}}>
                <Button type="primary" onClick={() => {props.onSubmit(); triggerDemo()}} >Reply</Button>
            </Item>
        </Form>
    )

    return (
        <Comment content={commentStruct} avatar={<Avatar />}/>
    )
}

const headerStyle = {
    marginLeft: 15,
    marginBottom: -50
}
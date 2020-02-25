import React from 'react'
import { Input, Button, Form } from 'antd'
const { Item } = Form
const {TextArea} = Input

export default function CommentEditor(props : {onChange : any, value: string, onSubmit: any, visible?: boolean}) {

    let {onChange} = props.onChange
    if (onChange === undefined) {
        onChange = () => {}
    }

    if (!props.visible) return undefined
    return (
        <div>
            <Form>
            <Item>
                <TextArea rows={4} onChange={onChange} value={props.value} />
            </Item>
            <Item>
                <Button type="primary" onSubmit={props.onSubmit}>Comment</Button>
            </Item>
            </Form>
        </div>
    )
}
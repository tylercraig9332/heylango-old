import React from 'react'
import { Modal, message, Checkbox } from 'antd'


export default function AddModal(props : {visible?: boolean, onCancel?: any, onOk?: any}) {
    return (
        <Modal title="Create New Word / Expression" 
            visible={props.visible}
            onOk={props.onOk}
            onCancel={props.onCancel}
        >
            
        </Modal>
    )
}
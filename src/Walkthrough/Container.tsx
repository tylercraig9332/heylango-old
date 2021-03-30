import { Button } from 'antd'
import React from 'react'

export default function Container( props : {children : any, onPrev : any, onNext: any, first: boolean}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{height: '300px', display: 'flex', justifyContent: 'center'}}>
                {props.children}
            </div>
            {props.first && 
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', height: '75px'}}>
                    <Button onClick={props.onNext} type="primary">{`Yes please!`}</Button>
                    <Button>{`I'm good! Skip`}</Button>
                </div>
            }
            {!props.first && 
                <div style={{display: 'flex', justifyContent: 'space-evenly', width: '800px', minWidth: '375px'}}>
                    <Button onClick={props.onPrev}>{`Previous`}</Button>
                    <Button onClick={props.onNext} type="primary">{`Next`}</Button>
                </div>
            }
        </div>
    )
}
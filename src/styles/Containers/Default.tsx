import React from 'react'

export default function DefaultContainer(props : any) {
    return (
        <div className="pageContainer">
            {props.children}
        </div>
    )
}
import React from 'react'
import Editor from '../../Draft/DraftEditor'

export default function SheetView(props :  {}) {
    return (
        <div>
            <Editor wordLearner readOnly/>
        </div>
    )
}
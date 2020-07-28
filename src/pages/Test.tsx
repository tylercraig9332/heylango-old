import React from 'react'
import Editor from '../Draft/DraftEditor'

export default function Test() {
    // Language Les is whst you makeit

    const [text, setText] = React.useState<string>()

    return (
        <div>
            <h1>This is a test</h1>
            <Editor value={text} onChange={setText} wordLearner/>
        </div>
    )
}
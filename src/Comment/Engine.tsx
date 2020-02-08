import React, { useState, useEffect } from 'react'
import { List } from 'antd'
import Comment from './Component'
import IComment from './Comment'

/** This component manages comments based on a parent element such as a post
    and handles the rendering of all comments 
*/
export default function Engine(props : {parent_id? : string}) {

    const [comments, setComments] = useState<IComment[]>()

    useEffect(() => {
        // TODO: Load all comments based on a parent id.
        let id = (props.parent_id === undefined) ? 'engine' : props.parent_id
        const hardCode : IComment[] = [
            {
                author: 'craigta1',
                content: 'hello world',
                parent: id,
                id: '1'          
            },
            {
                author: 'craigta1',
                content: 'How are you today...',
                parent: '1',
                id: '2'        
            },
            {
                author: 'john',
                content: 'haha',
                parent: id,
                id: '4'
            },
            {
                author: 'craigta1',
                content: 'I am good!!!',
                parent: '2',
                id: '3'            
            },
        ]
        setComments(hardCode)
    }, [])

    if (comments === undefined || comments.length < 1) return <div>No Comments</div>
    let cs = comments.map(( c : IComment)=> {
        return <Comment comment={c} />
    })
    return <div>{cs}</div>
}
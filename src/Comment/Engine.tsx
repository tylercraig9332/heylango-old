import React, { useState, useEffect } from 'react'
import { List } from 'antd'
import Comment from './Component'
import ReplyEditor from './ReplyEditor'
import IComment from './Comment'

/** This component manages comments based on a parent element such as a post
    and handles the rendering of all comments 
*/
export default function Engine(props : {parent_id? : string}) {

    const [comments, setComments] = useState<IComment[]>([])
    const [reply, setReply] = useState<string>('')

    useEffect(() => {
        // TODO: Load all comments based on a parent id.
        /*let id = (props.parent_id === undefined) ? 'engine' : props.parent_id
        const hardCode : (IComment[] | any[]) = [
            {
                author: 'craigta1',
                content: 'hello world',
                parent: id,
                id: '1',
                createdAt: new Date().toDateString()          
            },
            {
                author: 'craigta1',
                content: 'How are you today...',
                parent: '1',
                id: '2',
                createdAt: new Date().toDateString()           
            },
            {
                author: 'john',
                content: 'haha',
                parent: id,
                id: '4',
                createdAt: new Date().toDateString()  
            },
            {
                author: 'craigta1',
                content: 'I am good!!!',
                parent: '2',
                id: '3',
                createdAt: new Date().toDateString()         
            },
        ]
        setComments(hardCode)*/
    }, [])

    function handleReply(parent? : string, content?: string, author?: string) {
        console.log(reply)
        let c = [...comments]
        const now = new Date().toDateString()
        let p = props.parent_id
        let a = 'Anon'
        let con = reply
        if (parent !== undefined && author != undefined && content != undefined) {
            // TODO: I need to better write this. However if one of these is defined then the rest should be as well
            // THis is bad code regardless :( but it'll do for now.
            console.log("triggered")
            p = parent
            a = author
            con = content
        }
        else {
            p = '-1'
        }
        c.push({
            author: a,
            content: con,
            parent: p,
            createdAt: now,
            id: '-1'
        })
        setReply('')
        setComments(c)
    }
    let cs = [<div key="header">No Comments Yet!</div>]
    if (comments !== undefined && comments.length >= 1) {
        cs = comments.map(( c : IComment, i : number)=> {
            return <Comment key={c.id + `-${i}`} comment={c} handleReply={handleReply}/>
        })
        cs.unshift(<div key="header">Comments</div>)
    }
    return (
        <div>
                {cs}
                <hr></hr>
                <ReplyEditor value={reply} onChange={(e : any) => setReply(e.currentTarget.value)} visible onSubmit={handleReply} key="reply"/>
        </div>
    )
}
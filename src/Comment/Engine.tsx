import React, { useState, useEffect } from 'react'
import { List, message } from 'antd'
import Comment from './Component'
import ReplyEditor from './ReplyEditor'
import IComment from './Comment'

/** This component manages comments based on a parent element such as a post
    and handles the rendering of all comments 
*/
export default function Engine(props : {parent_id : string}) {

    const [comments, setComments] = useState<IComment[]>([])
    const [reply, setReply] = useState<string>('')

    useEffect(() => {
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/com/post/' + props.parent_id, reqHeaders).then((res : Response) => {
            if (res.status === 200) {
                //console.log('loaded comments')
                return res.json()
            }
            else {
                console.log('failed to load comments', res) 
                return []
            }
        }).then(comments => {
            console.log(comments)
            setComments(comments)
        })
    }, [])

    function handleEdit(comment_id: string, content : string) {
        console.log(comment_id, content)
        // TODO: update the index of the comment with this id with the value
        let c = [...comments]
        c.forEach(comment => {
            if (comment._id === comment_id) {
                comment.content = content
            }
        });
        setComments(c)

        //TODO: run patch to update the comment
        const reqHeaders = {
            body: JSON.stringify({content: content}),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH"
        }

        fetch('/com/' + comment_id, reqHeaders).then( res => console.log(res.statusText))
    }

    function handleReply(parent? : string, content?: string) {
        let c = [...comments]
        //const now = new Date() // todo: identify proper date format
        let p = props.parent_id
        let a = window.sessionStorage.getItem('userId')
        let con = reply
        console.log(p)
        if (parent !== undefined) {
            p = parent
        }

        if (content !== undefined) {
            con = content
        }

        if (a === '' || a === null) {
            message.info('You must be logged in to make a comment')
            return 
        }
        const newComment : any = {
            author: a,
            content: con,
            parent: p
        }
        // Update local state 
        

        // Send to the back end
        const reqHeaders = {
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        console.log(newComment)
        fetch('/com/', reqHeaders).then((res : Response) => {
            if (res.status === 200) return res.json()
            else  {
                console.log('comment failed to send', res)
                throw new Error(res.statusText)
            }
        }).then((comment : any) => {
            c.push({...comment, createdAt: new Date()})
            setReply('')
            setComments(c) 
        })
        .catch(err => console.log(err))
    }
    let cs = [<div key="header">No Comments Yet!</div>]
    if (comments !== undefined && comments.length >= 1) {
        cs = comments.map(( c : IComment, i : number)=> {
            return <Comment key={c._id + `-${i}`} comment={c} handleReply={handleReply} handleEdit={handleEdit}/>
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
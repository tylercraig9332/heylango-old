import React, { useState, useEffect, useRef } from 'react'
import { Icon, Tooltip, Modal, Input, message, Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'

const iconStyle = {fontSize: 20}

const likedStyle = {fontSize: 20, color: '#1890ff'}

export function Like(props : {postID? : string, onClick? : any}) {

    const [liked, like] = useState<boolean>(false)

    // Load in inital like state from server
    useEffect(() => {
        const reqHeaders = {
            //body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch(`/i/${props.postID}`, reqHeaders).then(r => r.json()).then(l => {
            like(l)
        })  
    }, [])

    function handleLike() {
        // send or remove like to server
        const reqHeaders = {
            body: JSON.stringify({parent: props.postID}),
            headers: {
                "Content-Type": "application/json"
            },
            method: (!liked) ? "POST" : "DELETE"
        }
        fetch('/i/', reqHeaders).catch(err => console.error(err))
        like(!liked)
    }

    return (
        <Tooltip title={(liked) ? "Liked!" : "Like"}>
            <Icon type="heart" theme={(liked) ? "filled" : "outlined"} onClick={handleLike} style={(liked) ? likedStyle : iconStyle}/>
        </Tooltip>
    )
}

export function Comment(props: {reply?: boolean, onClick?: any}) {
    return (
        <Tooltip title={(props.reply) ? "Reply" : "Comment"}>
            <Icon type="message" style={iconStyle} onClick={props.onClick}/>
        </Tooltip>
    )
}

export function Favorite() {
    return (
        <Tooltip title="Favorite">
            <Icon type="star" style={iconStyle}/>
        </Tooltip>
    )
}

export function Share(props: {postID?: string}) {
    const inputRef = useRef<any>()
    function info() {

        const copyIcon = (
            <Tooltip title="Copy Link"><Icon type="copy" onClick={() => {
                inputRef.current.focus()
                inputRef.current.select()
                document.execCommand('copy')
                message.success('Copied to clipboard!')
                Modal.destroyAll()
            }} /></Tooltip>
        )

        Modal.info({
          title: 'Share Post',
          content: (
            <div>
                <br></br>
                <Input ref={inputRef} size="large" value={`${window.location.host}/community/p/${props.postID}`}addonAfter={copyIcon} readOnly/>
            </div>
          ),
          onOk() {},
          okText: 'Close'
        });
      }
    return (
        <Tooltip title="Share">
            <Icon type="share-alt" style={iconStyle} onClick={info}/>
        </Tooltip>
    )
}

export function User(props: {author: string}) {
    return (
        <Tooltip title="View Author">
            <Link to={`/profile/${props.author}`} style={{ color: 'inherit' }}>
                <Icon type="user" style={iconStyle}/>
            </Link>
        </Tooltip>
    )
}

export function PostDropdown(props : {postID: string | undefined, author: string}) {

    // TODO: View author if post doesn't belong to user; else have an option to edit
    /*const menu = (
        <Menu>
            <Menu.Item key="author">
                <Link to={'/profile'}>View Author</Link>
            </Menu.Item>
            <Menu.Item key="author">
                <a onClick={(e) => {e.preventDefault(); props.setEdit()}}>Edit</a>
            </Menu.Item>
        </Menu>
    )
        */
    return (
        null
        /*<Dropdown overlay={menu}>
        </Dropdown>*/
    )
}

export function EditOrUser(props: {handleEdit: any, postID?: string, editView?: boolean}) {

    const [belongs, setBelongs] = useState<boolean>(false);
    const [author, setAuthor] = useState<string>('')

    useEffect(() => {
        if (props.postID === undefined) return
        // Figure out if author is viewing this event.
        const reqHeaders = {
            //body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch(`/p/belongs/${props.postID}`, reqHeaders).then(r => r.json()).then(res => {
            setBelongs(res.belongs)
            setAuthor(res.author)
        })  
    }, [])

    return belongs ? (
        <Tooltip title={props.editView ? "Close Edit" : "Edit"}>
            {(!props.editView) ? 
                <Icon type="edit" onClick={() => props.handleEdit()} style={iconStyle}/>  : 
                <Icon type="check-circle" style={{color: 'green', ...iconStyle}} onClick={() => props.handleEdit()} /> 
            }
        </Tooltip>
    ) : (
        <User author={author} />
    )
}

export function Admin(props: any) {
    return (
        <Tooltip title={"Admin / Report"}>
            <Icon type="safety" style={iconStyle}/>
        </Tooltip>
    )
}

export function IconRow(props : {children : React.ReactElement[]}) {

    const rowStyle = {
        marginLeft: 20
    }

    
    const map = props.children.map((child : React.ReactChild, i : number) => {
        return (
            <span style={rowStyle} key={`icon-${i}`}>
                {child}
            </span>
        )
    })

    return (
        <div>
            {map}
        </div>
    )
}
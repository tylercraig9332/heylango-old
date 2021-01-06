import React, { useState, useEffect, useRef } from 'react'
import AdminPanel from './AdminPanel'
import { Icon, Tooltip, Modal, Input, message, Menu, Dropdown, Popover } from 'antd'
import { Link } from 'react-router-dom'

const iconStyle = {fontSize: 20}

const likedStyle = {fontSize: 20, color: '#1890ff'}

export function Like(props : {parent_id? : string, onClick? : any, likes?: number}) {

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
        fetch(`/api/i/${props.parent_id}`, reqHeaders).then(r => r.json()).then(l => {
            like(l)
        })  
    }, [])

    function handleLike() {
        // send or remove like to server
        if (window.sessionStorage.getItem('logged') != 'true') {
            message.info('You are not logged in')
            return
        }
        const reqHeaders = {
            body: JSON.stringify({parent: props.parent_id}),
            headers: {
                "Content-Type": "application/json"
            },
            method: (!liked) ? "POST" : "DELETE"
        }
        fetch('/api/i/', reqHeaders).catch(err => console.error(err))
        like(!liked)
    }

    return (
        <Tooltip title={(liked) ? "Liked!" : "Like"}>
            <Icon type="heart" theme={(liked) ? "filled" : "outlined"} onClick={handleLike} style={(liked) ? likedStyle : iconStyle}/> {(props.likes !== undefined && props.likes > 0) ? props.likes : null }
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

export function Save(props : {parent_id : string | undefined, parentType: string}) { // Note: parent_id should never be undefined TODO: need to fix so Post.d.ts doesn't have undefined type

    const [saved, setSaved] = useState<boolean>(false)

    // Load in inital save state from server
    useEffect(() => {
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch(`/api/i/s/${props.parent_id}`, reqHeaders).then(r => r.json()).then((s : boolean) => {
            setSaved(s)
        })  
    }, [])

    function handleSave() {
        // send or remove like to server
        const reqHeaders = {
            body: JSON.stringify({parent: props.parent_id, parentType: props.parentType}),
            headers: {
                "Content-Type": "application/json"
            },
            method: (!saved) ? "POST" : "DELETE"
        }
        fetch('/api/i/s/', reqHeaders).catch(err => console.error(err))
        setSaved(!saved)
    }

    return (
        <Tooltip title={(saved) ? 'Unsave' : 'Save'}>
            <Icon key={props.parent_id} type="save" style={iconStyle} theme={(saved) ? 'filled' : 'outlined'} onClick={handleSave}/>
        </Tooltip>
    )
}

export function Share(props: {parent_id?: string, parentType?: string}) {
    let link = window.location.host
    switch (props.parentType) {
        case 'Post':
            link = `${window.location.host}/community/p/${props.parent_id}`
            break;
        case 'Lango':
            link = `${window.location.host}/learn/lango/${props.parent_id}`
            break;
        case 'VidLango':
            link =`${window.location.host}/learn/vid/${props.parent_id}`
            break;
    }
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
          title: `Share ${props.parentType}`,
          content: (
            <div>
                <br></br>
                <Input ref={inputRef} size="large" value={link} addonAfter={copyIcon} readOnly/>
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
        // TODO: adapt to parent_id and parentType
        fetch(`/api/p/belongs/${props.postID}`, reqHeaders).then(r => r.json()).then(res => {
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

export function EditOrAdmin(props : {handleEdit : any, editView?: boolean, parent?: string, parentAuthor?: string, parentType?: string}) {
    const [belongs, setBelongs] = useState<boolean>(false)

    useEffect(() => {
        const loggedUserId = window.sessionStorage.getItem('userId')
        let b = false
        if (loggedUserId != null && loggedUserId === props.parentAuthor) {
            b = true
        }
        setBelongs(b)
    })
    return belongs ? (
        <Tooltip title={props.editView ? "Close Edit" : "Edit"}>
            {(!props.editView) ? 
                <Icon type="edit" onClick={() => props.handleEdit()} style={iconStyle}/>  : 
                <Icon type="check-circle" style={{color: 'green', ...iconStyle}} onClick={() => props.handleEdit()} /> 
            }
        </Tooltip>
    ) : (
        <Admin parent={props.parent} parentType={props.parentType} />
    )
}

export function Admin(props: {parent : any, parentType : any}) {

    const [open, setModal] = useState<boolean>(false)

    return (
        <Tooltip title={"Admin / Report"}>
            <AdminPanel show={open} setShow={setModal} parent={props.parent} parentType={props.parentType}/>
            <Icon type="safety" style={iconStyle} onClick={() => setModal(!open)}/>
        </Tooltip>
    )
}

export function Info(props : { title: string, description : string | React.ReactNode}) {
    return (
        <Popover title={props.title} content={<p>{props.description}</p>}>
            <Icon type="info-circle" style={iconStyle} />
        </Popover>
    )
}

export function IconModal(props : {type: string, title: string, content: string | React.ReactNode, width?: string|number}) {
    const [show, setShow] = useState<boolean>(false)

    return (
        <Tooltip title={props.title}>
                <Icon type={props.type} style={iconStyle} onClick={() => setShow(!show)}/>
                <Modal title={props.title} visible={show} onOk={() => setShow(false)} onCancel={() => setShow(false)} 
                    width={(props.width === undefined) ? 416 : props.width}
                >
                    {props.content}
                </Modal>
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
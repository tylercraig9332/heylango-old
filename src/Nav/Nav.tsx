import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Tag } from 'antd'

const { Item, SubMenu, Divider } = Menu

export default function Nav(props : any) {

    const [currentKey, setCurrent] = useState<string>(props.useLocation().pathname)
    const [logged, setLogged] = useState<boolean>(false)

    useEffect(() => {
        // TODO: Identify where we are and respond to a handler for the url
        //loadLocation()
        // Load user info
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/u/loggedIn', reqHeaders)
        .then(res => {
            let l = (res.status === 200)
            if (!l) {
                // If the backend server goes down, I wanna ensure that the session is cleared.
                window.sessionStorage.setItem('userId', '')
                window.sessionStorage.setItem('logged', 'false')
                window.sessionStorage.setItem('username', '')
            }
            setLogged(l)
        })
    }, [props.useLocation().pathname])

    const handleMenuChange = (e : any) => {
        //redirect(e.key)
        setCurrent(e.key)
    }

    function redirect(path : string) {
        // react router handles redirect, I will leave 
        //window.location.href = path
    }


    const unLoggedTabs = [
            <Item style={{float: 'right', marginRight: '20px'}} key="/portal"><Link to="/portal">Login</Link></Item>,
            <Item style={{float: 'right'}} key='/signup'><Link to='/signup'>Signup</Link></Item>
    ]

    const loggedTabs = (
            <SubMenu 
                title={<span className="submenu-title-wrapper">
                            Account
                        </span>}
                style={{float: 'right'}}
            >
                <Item key="/profile">
                    <Link to="/profile">Profile <Icon type="user" style={{ fontSize: '16px', position: 'relative'}}/></Link>
                </Item>
                <Item key="/settings">
                    <Link to="/settings">Settings <Icon type="setting" style={{ fontSize: '16px', position: 'relative'}}/></Link>
                </Item>
                <Divider/>
                <Item key="/info">
                    <Link to="/info">FAQ / Site Info <Icon type="info-circle" style={{ fontSize: '16px', position: 'relative'}}/></Link>
                </Item>
                <Item key="/logout">
                    <Link to="/logout">Log Out <Icon type="logout" style={{ fontSize: '16px', position: 'relative'}}/></Link> 
                </Item>
            </SubMenu>
        
    )

    const learnTab = (
        <SubMenu title={<Link to='/learn/' style={{color: 'inherit'}}>Learning Library</Link>}>
            <Item key="/learn/lango"><Link to="/learn/lango/home">Native Content | Langos</Link></Item>
            <Item key="/learn/bi"><Link to="/learn/bi">Bilingual Content | BiLangos</Link></Item>
        </SubMenu>
    )

    const supportTab = (logged) ? (
        <Item key="/support" style={{float: 'right'}}>
            <Link to="/support"> <Tag color="gold" style={{fontSize: 15, padding: 3, paddingRight: 10, paddingLeft: 10}}>Support</Tag></Link>
        </Item>
    ) : null

    const reviewTab = (
        <SubMenu title={<Link style={{color: 'inherit'}} to="/study/">Review Library</Link>}>
            <Item key="/study/saved"><Link to="/study/saved">Saved Words and Phrases</Link></Item>
            <Item key="/study/decks"><Link to="/study/decks">Flashcard Decks</Link></Item>
        </SubMenu>
    )

    return (
        <div style={{zIndex: 5, position: 'relative'}}>
        <Menu onClick={handleMenuChange} selectedKeys={[currentKey]} mode="horizontal" style={{borderTop: '2px solid #1890FF', zIndex: 5}}>
            <Item key="/"><Link to='/'><img src="/static/HeyLangoT1.png" width="90" height={'auto'}/> <Tag color="blue">Beta</Tag></Link></Item>
            <Item key='/community/'><Link to='/community/'>Community</Link></Item>
            {learnTab}
            {reviewTab}
            {
                (logged) ? (loggedTabs) : unLoggedTabs
            }
            {supportTab}
        </Menu>
        </div>
    )
}


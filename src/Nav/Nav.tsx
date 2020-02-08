import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

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
            setLogged(res.status === 200)
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
                <Item key="/logout">
                    <Link to="/logout">Log Out <Icon type="logout" style={{ fontSize: '16px', position: 'relative'}}/></Link> 
                </Item>
            </SubMenu>
        
    )

    return (
        <div style={{zIndex: 5, position: 'relative'}}>
        <Menu onClick={handleMenuChange} selectedKeys={[currentKey]} mode="horizontal" style={{borderTop: '2px solid #1890FF', zIndex: 5}}>
            <Item key="/"><Link to='/'><strong>HeyLango!</strong></Link></Item>
            <Item key='/community/'><Link to='/community/'>Community</Link></Item>
            <Item key='/learn/'><Link to='/learn/'>Apps</Link></Item>
            {
                (logged) ? loggedTabs : unLoggedTabs
            }
        </Menu>
        </div>
    )
}


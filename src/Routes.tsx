import React from 'react'
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom'

import Nav from './comps/Nav'
import PageHead from './comps/PageHead'

import Launch from './pages/Launch'
import Portal from './User/Portal'
import Signup from './User/Signup'
import Logout from './User/Logout'
import Profile from './User/Profile'
import cHome from './Community/Home'
import create from './Post/Create'
import lHome from './Learning/Home'

import 'antd/dist/antd.css';
import './styles/global.css'

export default function Routes() {

    return (
        <BrowserRouter>
            <div>
                <Nav useLocation={useLocation}/>
                <div className="pageContainer">
                    <Switch>
                        <Route exact path='/' component={Launch} />
                        <Route exact path='/community/' component={cHome} />
                        <Route path='/community/p/' component={create} />
                        <Route exact path='/dashboard/' component={lHome} />
                        <Route path='/portal' component={Portal} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/logout' component={Logout} />
                        <Route path='/profile' component={Profile} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}
import React from 'react'
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom'

import Nav from './Nav/Nav'
import PageHead from './Nav/PageHead'

import Launch from './pages/Launch'
import Portal from './User/Portal'
import Signup from './User/Signup'
import Logout from './User/Logout'
import Profile from './User/Profile'
import cHome from './Community/Home'
import cView from './Community/View'
import pCreate from './Post/Create'
import pView from './Post/View'
import lHome from './Learning/Home'
import biView from './Learning/BiLango/View'
import biCreate from './Learning/BiLango/Create'
import biHome from './Learning/BiLango/Home'
import vidView from './Learning/VidLango/View'
import mHome from './Learning/MonoLango/Home'
import mCreate from './Learning/MonoLango/Create'
import mView from './Learning/MonoLango/View'
import dHome from './Learning/Decks/Home'

import Test from './pages/Test'

import 'antd/dist/antd.css';
import './styles/global.css'

export default function Routes() {
    // TODO: Would love to export certain routes in subtree components
    return (
        <BrowserRouter>
            <div>
                <Nav useLocation={useLocation}/>
                <div className="pageContainer">
                    <Switch>
                        <Route exact path='/' component={Launch} />
                        <Route exact path='/community/' component={cHome} />
                        <Route path='/community/p/new/' component={pCreate} />
                        <Route path='/community/p/' component={pView} />
                        <Route path='/community/' component={cView} />
                        <Route path='/portal' component={Portal} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/logout' component={Logout} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/test' component={Test} />
                        <Route exact path='/learn/' component={lHome} />
                        <Route exact path='/learn/bi/new' component={biCreate} />
                        <Route exact path='/learn/bi/' component={biHome} />
                        <Route path='/learn/bi/' component={biView} />
                        <Route path='/learn/vid/' component={vidView} />
                        <Route exact path='/learn/m/home/' component={mHome} />
                        <Route path='/learn/m/create' component={mCreate} />
                        <Route path='/learn/m/' component={mView} />
                        <Route exact path='/learn/decks/' component={dHome} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}
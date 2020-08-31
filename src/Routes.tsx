import React from 'react'
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom'

import Nav from './Nav/Nav'
import PageHead from './Nav/PageHead'

import Launch from './pages/Launch'
import Portal from './User/Portal'
import Signup from './User/Signup'
import Logout from './User/Logout'
import Profile from './User/Profile'
import Settings from './User/Settings'
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

import sHome from './Study/Home'
import dHome from './Study/Decks/Home'
import dView from './Study/Decks/View'
import dPresent from './Study/Decks/Review'
import eHome from './Study/Expression/Home'

import iHome from './pages/Info/Home'
import iLango from './pages/Info/Lango'
import iInteraction from './pages/Info/Interaction'

import Test from './pages/Test'
import Support from './pages/Support'

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
                        <Route exact path='/settings' component={Settings} />
                        <Route exact path='/support' component={Support} />
                        <Route exact path='/learn/' component={lHome} />
                        <Route exact path='/learn/bi/new' component={biCreate} />
                        <Route exact path='/learn/bi/' component={biHome} />
                        <Route path='/learn/bi/' component={biView} />
                        <Route path='/learn/vid/' component={vidView} />
                        <Route exact path='/learn/lango/home/' component={mHome} />
                        <Route path='/learn/lango/create' component={mCreate} />
                        <Route path='/learn/lango/' component={mView} />/
                        <Route exact path='/study/' component={sHome} />
                        <Route exact path='/study/decks/' component={dHome} />
                        <Route path='/study/decks/review' component={dPresent} />
                        <Route path='/study/decks/' component={dView} />
                        <Route exact path='/study/saved/' component={sHome} />
                        <Route exact path='/study/decks/' component={eHome} />
                        <Route exact path='/info' component={iHome} />
                        <Route exact path='/info/lango' component={iLango} />
                        <Route exact path='/info/ip' component={iInteraction} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}
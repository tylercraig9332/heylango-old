import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
// BiLango
import BiHome from './BiLango/Home'
import BiCreate from './BiLango/Create'
import BiView from './BiLango/View'

import VidView from './VidLango/Pages/View'


export default function SubRouter(path: string) {
    
    
    const RouteArray = [
        <Route key="home" path={`${path}/`} component={Home}/>,
        <Route key="BiCreate" exact path={`${path}/bi/new`} component={BiCreate} />,
        <Route key="BiHome" exact path={`${path}/bi`} component={BiHome} />,
        <Route key="BiView" path={`${path}/bi/`} component={BiView} />,

        <Route key="VidView" path={`${path}/vid/`} component={VidView} />
    ]
    
    return RouteArray
}
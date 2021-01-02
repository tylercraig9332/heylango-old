import React from 'react'
import LaunchContainer from './Containers/Launch'
import DefaultContainer from './Containers/Default'

/**
 * Removed the page wrap style if path is the home page, else it will wrap in pageContainer style
 * @param props useLocation allows to identify if landing page or not
 */
export default function AppWrap(props : {useLocation: any, children: any}) {
    if (props.useLocation === undefined) return null
    if (props.useLocation().pathname === '/') {
        return (
            <LaunchContainer>
                {props.children}
            </LaunchContainer>
        )
    }
    else {
        return (
            <DefaultContainer>
                {props.children}
            </DefaultContainer>
        )
    }
}
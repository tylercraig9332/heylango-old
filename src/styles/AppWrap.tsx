import React from 'react'

/**
 * Removed the page wrap style if path is the home page, else it will wrap in pageContainer style
 * @param props useLocation allows to identify if landing page or not
 */
export default function AppWrap(props : {useLocation: any, children: any}) {
    if (props.useLocation === undefined) return null
    if (props.useLocation().pathname === '/') {
        return (
            <div className="launch">
                {props.children}
            </div>
        )
    }
    else {
        return <div className="pageContainer">
            {props.children}
        </div>
    }
}
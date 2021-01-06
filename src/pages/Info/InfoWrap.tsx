import React from 'react'
import { Link } from 'react-router-dom'
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Row, Col, Button } from 'antd';

/**
 *  Wrap content in this to display the books background used in info pages
 * @param props children required
 */
export default function InfoWrap(props: {children: any, backgroundUrl: string, width?: string | number, disableReturn?: boolean}) {
    const { currentTheme } = useThemeSwitcher();

    const pageStyle = {
        backgroundImage: `url(${props.backgroundUrl})`, // /api/static/louis-pellissier-unsplash.jpg || /api/static/info/patrick-tomasso-lango.jpg
        top: 0,
        left: 0,
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: 0,
        backgroundSize: 'cover',
        overflow: 'auto',
        color: (currentTheme === 'light') ? 'inherit' : '#fff'
    } as React.CSSProperties
    
    const rowStyle = {
        left: 0, display: 'flex', alignItems: 'center', zIndex: 1, marginBottom: '100px'
    } as React.CSSProperties
    
    const colStyle = {
        width: (props.width) ? props.width: 800, maxWidth: '90%', marginRight: 'auto', marginLeft: 'auto', padding: 30,
        border: '1px', borderRadius: '4px', backgroundColor: (currentTheme === 'light') ? 'white' : '#2E3338',
        marginTop: 100, zIndex: 1, textAlign: 'left'
    } as React.CSSProperties

    return (
        <div style={pageStyle}>
            <Row style={rowStyle}>
                <Col span={6} offset={6} style={colStyle}>
                    {props.disableReturn ? null : <div style={{marginBottom: '15px'}}><Link to="/info"><Button type="primary" shape="round" icon="caret-left"> Return to FAQ</Button></Link></div>}
                    {props.children}
                    {props.disableReturn ? null : <div style={{marginTop: '5px'}}><Link to="/info"><Button type="primary" shape="round" icon="caret-left"> Return to FAQ</Button></Link></div>}
                </Col>
            </Row>
    </div>
    )
}



import React from 'react'
import { Row, Col } from 'antd';

/**
 *  Wrap content in this to display the books background used in info pages
 * @param props children required
 */
export default function InfoWrap(props: any) {
    return (
        <div style={pageStyle}>
            <Row style={rowStyle}>
                <Col span={6} offset={6} style={colStyle}>
                    {props.children}
                </Col>
            </Row>
    </div>
    )
}

const pageStyle = {
    backgroundImage: 'url(/static/info/patrick-tomasso-lango.jpg)', // louis-pellissier-unsplash.jpg
    top: 0,
    left: 0,
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundSize: 'cover',
    overflow: 'auto'
} as React.CSSProperties

const rowStyle = {
    left: 0, display: 'flex', alignItems: 'center', zIndex: 1, marginBottom: '100px'
} as React.CSSProperties

const colStyle = {
    width: 800, maxWidth: '90%', marginRight: 'auto', marginLeft: 'auto', padding: 30,
    border: '1px', borderRadius: '4px', backgroundColor: 'white',
    marginTop: 100, zIndex: 1, textAlign: 'left'
} as React.CSSProperties



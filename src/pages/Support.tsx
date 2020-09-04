import React from 'react'
import {Row, Col, Typography } from 'antd'
import Badge from '../User/Badge/Badge'

const { Title } = Typography

export default function Support() {
    return (
        <div style={pageStyle}>
            <Row style={rowStyle}>
                <Col span={6} offset={6} style={colStyle}>
                    <Title>Enjoy the site?</Title>
                    <p>Please help keep it free</p>
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_donations" />
                        <input type="hidden" name="business" value="heylangobusiness@gmail.com" />
                        <input type="hidden" name="currency_code" value="USD" />
                        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                        <img alt="" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                    </form>
                </Col>
            </Row>
    </div>
    )
}

const pageStyle = {
    backgroundImage: 'url(/static/louis-pellissier-unsplash.jpg)',
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
    left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, marginBottom: '100px'
} as React.CSSProperties

const colStyle = {
    width: 400, maxWidth: '90%', marginRight: 'auto', marginLeft: 'auto', padding: 30,
    border: '1px', borderRadius: '4px', backgroundColor: 'white',
    marginTop: 100, zIndex: 1, textAlign: 'center'
} as React.CSSProperties
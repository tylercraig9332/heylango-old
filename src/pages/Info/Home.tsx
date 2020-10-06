import React from 'react'
import { Typography, Divider, Row, Col } from 'antd';
import { Link } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography;

export default function Home() {
    return (
        <div style={pageStyle}>
            <Row style={rowStyle}>
                <Col span={6} offset={6} style={colStyle}>
                    <Title>FAQ Home</Title>
                    <Paragraph>
                        <ul>
                            <li><Link to="/info/lango#what">What are Langos?</Link> / <Link to="/info/lango#how">How do I use Langos?</Link> / <Link to="/info/lango#read">What is extensive and intensive reading?</Link></li>
                            <li><Link to="/info/srs">What is SRS?</Link></li>
                            <li><Link to="/info/cefr#what">What does A1, A2, B1, B2, C1, C2 mean? </Link> / <Link to="/info/cefr#how"> How do I know which CEFR level I am?</Link></li>
                        </ul>
                    </Paragraph>
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
    left: 0, display: 'flex', alignItems: 'center', zIndex: 1, marginBottom: '100px'
} as React.CSSProperties

const colStyle = {
    width: 800, maxWidth: '90%', marginRight: 'auto', marginLeft: 'auto', padding: 30,
    border: '1px', borderRadius: '4px', backgroundColor: 'white',
    marginTop: 100, zIndex: 1, textAlign: 'left'
} as React.CSSProperties



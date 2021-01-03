import React from 'react'
import { Typography, Divider, Row, Col } from 'antd';
import { Link } from 'react-router-dom'
import InfoWrap from './InfoWrap';

const { Title, Paragraph, Text } = Typography;

export default function Home() {
    return (
        <InfoWrap backgroundUrl="/static/info/patrick-tomasso-lango.jpg" disableReturn>
            <Title>Frequently Asked Questions</Title>
            <Paragraph>
                <ul>
                    <li><Link to="/info/lango#what">What are Langos?</Link> / <Link to="/info/lango#how">How do I use Langos?</Link> / <Link to="/info/lango#read">What is extensive and intensive reading?</Link></li>
                    <li><Link to="/info/content#what">What's the difference between a VidLango, BiLango and a Lango?</Link> / <Link to="/info/content#how">How should I go about making Langos?</Link></li>
                    <li><Link to="/info/srs">What is SRS?</Link></li>
                    <li><Link to="/info/cefr#what">What does A1, A2, B1, B2, C1, C2 mean? </Link> / <Link to="/info/cefr#how"> How do I know which CEFR level I am?</Link></li>
                </ul>
            </Paragraph>
        </InfoWrap>
    )
}

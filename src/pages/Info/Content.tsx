import React from 'react'
import { Typography, Divider, Row, Col } from 'antd';
import InfoWrap from './InfoWrap';

const { Title, Paragraph, Text } = Typography;

export default function Content() {
    return (
        <InfoWrap backgroundUrl="/api/static/info/patrick-tomasso-lango.jpg">
            <Title className="what">What's the difference between a VidLango, BiLango and a Lango?</Title>
            <Paragraph>
                All types of "langos" are forms of consumable language content. Each have their own unique tools that help enable that focus. All types of "langos" have the WordViewer tool that allows for one to save words for later review. 
            </Paragraph>
            <Paragraph>
                VidLangos are designed with the primary focus of consuming videos and captions in tandem. VidLangos are all about learning from videos. VidLangos are good for consuming real native content that often are occompanied by captions.
            </Paragraph>
            <Paragraph>
                BiLangos are designed for simple texts that have one's target language and a primary language, side by side. These are great for beginners! Beginners need more context when consuming language and dual text, that BiLangos have, are really great for providing that context. 
            </Paragraph>
            <Paragraph>
                General Langos, also refered to as "MonoLangos" have a similar focus of BiLangos, but without the need for dual text to rely on. These are better for more intermediate learners that don't need to rely on their primary language, outside of the WordViewer translation tool. 
            </Paragraph>
            <Divider />
            <Title className="how">How should I go about making Langos?</Title>
            <Paragraph>
                You can make them for and how ever you want! Just keep in mind the sites rules and ensure that you are allowed to post the content. Any illegal or inappropriate content will be deleted. Repeatedly offending this rule will result in a ban.  
            </Paragraph>
        </InfoWrap>
    )
}

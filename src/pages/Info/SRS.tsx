import React from 'react'
import InfoWrap from './InfoWrap'
import {Typography, Divider} from 'antd'

const { Title, Paragraph, Text } = Typography;

export default function SRS() {
    return (
        <InfoWrap>
            <Title>What is SRS?</Title>
            <Paragraph>
            SRS stands for Spaced Repetion Software/System. 
            Spaced Repition is a review tool that allows the learner to prioritze words less known by displaying words in a proper order of strength.
            Words that are less known are shown more frequently and primarily; while words more well know are shown more secondarily.
            </Paragraph>
            <Paragraph>
                Strength of each word is determined and adjusted as one rates the word while reviewing. 
            </Paragraph>
        </InfoWrap>
    )
}
import React from 'react'
import InfoWrap from './InfoWrap'

import { Typography, Divider } from 'antd'

const { Paragraph, Title } = Typography

export default function CEFR() {
    return (
        <InfoWrap>
            <Title>What does A1/A2/B1/B2/C1/C2 mean?</Title>
            <Paragraph>
                These are reference levels that are commonly used to determine ones ability and achievement in language learning.
                These reference levels are identified as the Common European Language of Reference of Languages (CEFR). The six
                levels are commonly accepted as the European standary for language proficiency among learners. 
            </Paragraph>
            <Paragraph>
                For a clear understanding of each level, please reference <a href="https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages#Common_reference_levels">Wikipedia: Common Reference Levels</a>
            </Paragraph>
            <Divider/>
            <Title>How do I know which CEFR level I am?</Title>
            <Paragraph>
                The only true way to know is by taking a certification test. However, many tend to <a href="https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages#Common_reference_levels">estimate</a> their own ability.
            </Paragraph>
        </InfoWrap>
    )
}
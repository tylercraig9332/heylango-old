import React from 'react'
import { Select } from 'antd'
import language from './language.json'

const { Option } = Select

type LSelectProps = {
    value? : string,
    onChange : any,
    type? : string
}

export default function LanguageSelect(props : LSelectProps) {
    return (
        <Select
            mode="default"
            onChange={props.onChange}
            style={{width: '100%'}}
        >
            {
                language.info.map(language => {
                    return (
                        <Option value={language.code} key={language.code}>
                            {language.title} 
                            <span role="img" aria-label="China"> {language.flag}</span>
                        </Option>
                    )
                })
            }
        </Select>
    )
}
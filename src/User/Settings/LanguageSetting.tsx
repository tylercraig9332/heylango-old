import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { LanguageSelect, MultiLanguageSelect } from '../../Util/Select'

export default function LanguageSetting(props : {primary: string, target: string[]}) {

    const [primary, setPrimary] = useState<string>('en')
    const [targetLanguages, setTarget] = useState<Array<string>>([])

    useEffect(() => {
        if (props.primary !== undefined) setPrimary(props.primary)
        if (props.target !== undefined) setTarget(props.target)
    }, [])

    function update() {
        const UserSettings = {
            primaryLanguage: primary,
            targetLanguages: targetLanguages
        }
        const reqHeaders = {
            body: JSON.stringify(UserSettings),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
        fetch('/api/u/setting', reqHeaders).then(res => {
            if (res.status !== 200) {
                message.error(res.statusText)
            } else {
                message.success("Language Settings Saved!")
            }
        })
    }

    function languageChange(e : any) {
        let userLang = e
        if (e === 'all') {
            message.info('Language set to browser default')
            const lang_loc = navigator.language
            userLang = lang_loc.split('-')[0]

        }
        setPrimary(userLang)
    }

    return (
        <div style={{maxWidth: "500px"}}>
            <h2>Language Preferences</h2>
            <div style={{marginLeft: '20px'}}>
                <p style={{margin: 0}}>Primary language (Translations will be tranlsated to this language)</p>
                <LanguageSelect onChange={languageChange} value={primary} removeAny/>
                <p style={{margin: 0}}>Languages that I am learning or want to learn</p>
                <MultiLanguageSelect onChange={(v : any) => setTarget(v)} value={targetLanguages} />
                <div style={{marginTop: 5}}>
                    <Button type="primary" onClick={update}>Save Selection(s)</Button>
                </div>
            </div>
        </div>
    )
}
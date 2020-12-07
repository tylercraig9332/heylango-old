import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { LanguageSelect, MultiLanguageSelect } from '../Util/Select'

export default function LanguageSetting() {

    const [primary, setPrimary] = useState<string>('en')
    const [targetLanguages, setTarget] = useState<Array<string>>([])

    useEffect(() => {
        // TODO: Load in language settings from /u/setting
        fetch('/u/setting').then(res => {
            if (res.status !== 200) {
                console.error(res)
                message.error('Faild to load language preferences')
                return
            }
            return res.json()
        }).then(data => {
            setTarget(data.targetLanguages)
            setPrimary(data.primaryLanguage)
        })
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
        fetch('/u/setting', reqHeaders).then(res => {
            if (res.status !== 200) {
                message.error(res.statusText)
            } else {
                message.success("Language Settings Saved!")
            }
        })
    }

    return (
        <div style={{maxWidth: "500px"}}>
            <h2>Language Preferences</h2>
            <p style={{margin: 0}}>Primary language (Translations will be tranlsated to this language)</p>
            <LanguageSelect onChange={(v : any) => setPrimary(v)} value={primary} />
            <p style={{margin: 0}}>Languages that I am learning or want to learn</p>
            <MultiLanguageSelect onChange={(v : any) => setTarget(v)} value={targetLanguages} />
            <div style={{marginTop: 5}}>
                <Button type="primary" onClick={update}>Save Selection(s)</Button>
            </div>
        </div>
    )
}
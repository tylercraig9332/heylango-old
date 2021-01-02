import React, { useEffect, useState } from 'react'
import Loading from '../Util/Loading'
import BadgeSettings from './Badge/Settings'
import DarkModeSettings from './Settings/DarkModeSetting'
import LanguageSettings from './Settings/LanguageSetting'

export default function Settings() {

    const [settings, setSettings] = useState<any>()

    useEffect(() => {
        fetch('/u/setting').then(res => {
            if (res.status !== 200) {
                console.error(res)
                return
            }
            return res.json()
        }).then(data => {
            // This data type is UserSettings
            console.log(data)
            setSettings(data)
        })
    }, [])

    if (settings === undefined) return <Loading message="Loading Settings" />
    return (
        <div style={{width: 1000, marginRight: 'auto', marginLeft: 'auto', maxWidth: '95%'}}>
            <h1>User Settings</h1>
            <hr></hr>
            <LanguageSettings primary={settings.primaryLanguage} target={settings.targetLanguages} />
            <br></br>
            <BadgeSettings />
            <br></br>
            <DarkModeSettings theme={(settings.theme === undefined) ? 'light' : settings.theme} />
        </div>
    )
}
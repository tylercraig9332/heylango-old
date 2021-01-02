import { Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import { useThemeSwitcher } from "react-css-theme-switcher";
import Badge from '../Badge/Badge';

export default function DarkMode(props : {theme : string}) {

    const [darkMode, setDarkMode] = useState<boolean>(false)
    const { switcher, currentTheme, status, themes } = useThemeSwitcher();
    const toggleTheme = (isChecked : boolean) => {
        setDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
    };

    useEffect(() => {
        console.log(props.theme)
        setDarkMode(props.theme === 'dark')
    }, [])

    useEffect(() => {
        const UserSettings = {
            theme: (darkMode) ? 'dark' : 'light'
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
                console.error(res.statusText)
            }
        })
    }, [darkMode])

    return (
        <div>
            <h2>Dark Mode <Badge type="custom" custom="Beta"/></h2>
            <div style={{marginLeft: '20px'}}>
                <Switch defaultChecked={props.theme === 'dark'} checked={darkMode} onChange={toggleTheme} /> {darkMode ? "Disable" : "Enable"} Dark Mode
                <p style={{marginTop: 5}}>Some site styles may not function properly on Dark Mode</p>
            </div>
        </div>
    )
}
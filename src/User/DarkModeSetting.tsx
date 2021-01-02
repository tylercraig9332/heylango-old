import { Switch } from 'antd';
import React, { useState } from 'react'
import { useThemeSwitcher } from "react-css-theme-switcher";
import Badge from './Badge/Badge';

export default function DarkMode() {

    const [darkMode, setDarkMode] = useState<boolean>(false)
    const { switcher, currentTheme, status, themes } = useThemeSwitcher();
    const toggleTheme = (isChecked : boolean) => {
        setDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
    };

    return (
        <div>
            <h2>Dark Mode <Badge type="custom" custom="Beta"/></h2>
            <div style={{marginLeft: '20px'}}>
                <Switch checked={darkMode} onChange={toggleTheme} />{darkMode ? " Disable" : " Enable"} Dark Mode
                <p style={{marginTop: 5}}>Some site styles may not function properly on Dark Mode</p>
            </div>
        </div>
    )
}
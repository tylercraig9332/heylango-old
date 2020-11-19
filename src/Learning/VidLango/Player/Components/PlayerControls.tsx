import React, { useState } from 'react'
import { Tooltip, Icon, Slider, Progress } from 'antd'
import { timeFormat } from '../../../../Util/functions'

type ControlProps = {
    paused : boolean,
    currentTime: number, // In Seconds
    duration: number, // in seconds
    volume: number, // 0 out of 100
    onChange: any // commands will send up a string command -> 'pauseplay', 'seek10', 'aseek10' 
}

export default function PlayerControls(props : ControlProps) {

    const [showVolume, setShow] = useState<boolean>(false)

    /*
    * Identifies where the user has clicked on the progress and changes the player accordingly.
    */
    function changeProgress(e : any) {
        const offsets = e.target.getBoundingClientRect()
        const rightBound = offsets.right - offsets.left
        const clickLocation = e.pageX - offsets.left
        let duration = (clickLocation / rightBound) // This will result in the percent to seek to
        // rightBound is the end of the blue/white depending on what color the user clicked
        let white = true
        if (rightBound < toolbarStyle.width) {
           white = false
        }
        duration *= (white) ? props.duration : props.currentTime 
        props.onChange('setCurrentTime-' + Math.floor(duration))
    }

    return (
        <div style={toolbarStyle}>
            <div style={{padding: 0}} onClick={changeProgress} ><Progress percent={props.currentTime / props.duration * 100} showInfo={false}/></div>
            <div style={controlsStyle}>
                <Icon type={(props.paused) ? "play-circle" : 'pause-circle'} onClick={() => props.onChange('playpause')} style={ (!props.paused) ? playStyle : {color : '#1890ff', ...playStyle}}/>
                <div style={{display: 'inital', paddingRight: 10}}>
                    <p style={{margin: 0, padding: 0, fontSize: 16}}>{timeFormat(Math.floor(props.currentTime))} / {timeFormat(Math.floor(props.duration))}</p>
                    <div style={{display: 'flex', fontSize: 28, marginTop: -5}}>
                        <Tooltip title='Skip back 10 seconds' placement="bottom"><Icon type="backward" onClick={() => props.onChange('aseek10')}/></Tooltip> 
                        <div style={{padding: 5}}></div>
                        <Tooltip title='Skip forward 10 seconds' placement="bottom"><Icon type="forward" onClick={() => props.onChange('seek10')}/></Tooltip>
                    </div>
                </div>
                <span onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} style={{display: 'flex', alignItems: 'center'}}>
                    <Tooltip title="Volume">
                        <Icon type="sound" onClick={() => setShow(!showVolume)} style={{ fontSize: 20 }}/>
                    </Tooltip>
                    <div style={(showVolume) ? {width: 150} : {}}>
                        {(showVolume) ? <Slider min={0} max={100} value={props.volume} onChange={(e) => props.onChange(`setVolume-${e}`)} /> : null} 
                    </div>
                </span>
            </div>
        </div>
    )
}

const toolbarStyle = {
    width: 800
}

const controlsStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    //border: '1px solid'
} as React.CSSProperties

const playStyle = {
    cursor: 'pointer',
    fontSize: 48,
    marginRight: 5
}
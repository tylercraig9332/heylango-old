import React, { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import { Icon } from 'antd'


export default function InteractivePlayer(props : {video_id : string}) {

    const [time, setTime] = useState<string>('00:00:00,000')
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [muted, setMuted] = useState<boolean>(false)
    const [volume, setVolume] = useState<number>(100)
    const [autoplay, setAutoPlay] = useState<0 | 1 | undefined>(0) // 0 for false and 1 for true : temp state used for testing
    const [controls, setControls] = useState<0 | 1 | undefined>(0)
    const [paused, setPaused] = useState<boolean>(true)

    const player = useRef(null)

    // GLOBAL UPDATE of STATE -> I normally don't do this but I think that it is the best way to keep player always synced
    if (!paused) {
        window.setInterval(updateState, 1000)
    }
    
    useEffect(() => {
        updateState()
    })

    /** 
     * Connects with the YouTube player and updates the local state
     * */ 
    async function updateState() {
        const p : any = player.current
        const yt = p.internalPlayer
        const state = await yt.getPlayerState()
        if (state === 3) return // Don't update when buffering
        const curr = await yt.getCurrentTime()
        const mute = await yt.isMuted()
        const vol = await yt.getVolume()
        const dura = await yt.getDuration()
        let pause = true
        switch (state) {
            case 1: // Playing
            case 3: // Buffering
                pause = false
                break;
            case -1: // Unstarted
            case 0: // ended
            case 2: // paused
            default:
                pause = true
        }
        setPaused(pause)
        setCurrentTime(curr)
        setMuted(mute)
        setVolume(vol)
        setDuration(dura)
    }

    function action(a : string) {
        if (player === null) return
        const p : any = player.current
        const yt = p.internalPlayer
        switch (a) {
            case 'playpause':
                (paused) ? yt.playVideo() : yt.pauseVideo()
                setPaused(!paused)
                break;
            case 'mute':
                (muted) ? yt.unmute() : yt.mute()
                setMuted(!muted)
                break;
            case 'seek10':
                yt.seekTo(currentTime + 10, true)
                break;
            case 'aseek10':
                yt.seekTo(currentTime - 10, true)
                break;
        }
    }

    const videoOptions = {
        //height: '529',
        //width: '941',
        playerVars: {
            autoplay: autoplay,
            controls: controls
        }
    }


    const toolbarJSX = (
        <div style={toolbarStyle}>
            <Icon type={(paused) ? "play-circle" : 'pause-circle'} onClick={() => action('playpause')} style={ (!paused) ? {fontSize: 48, marginRight: 5} : {fontSize: 48, marginRight: 5, color : '#1890ff'}}/>
            <div style={{display: 'inital', width: 150}}>
                <p style={{margin: 0, padding: 0, fontSize: 16}}>{Math.round(currentTime)} / {Math.round(duration)}</p>
                <div style={{fontSize: 20}}><Icon type="backward" onClick={() => action('aseek10')}/> <Icon type="forward" onClick={() => action('seek10')}/></div>
            </div>
        </div>
    )
    
    return (
        <div>
            <YouTube ref={player} videoId={props.video_id} opts={videoOptions} />
            {toolbarJSX}
        </div>
    )
}

const toolbarStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    border: '1px solid',
    cursor: 'pointer'
} as React.CSSProperties
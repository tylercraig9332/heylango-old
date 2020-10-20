import React, { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import PlayerControls from './PlayerControls'


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
    } else {
        window.clearInterval()
    }
    

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
            default: // defualt case means that there is a custom command 
                let args = a.split('-') // format is ${command}-${arg} -> eg. setVolume-24 
                switch (args[0]) {
                    case 'setVolume':
                        yt.setVolume(args[1])
                        break;
                    default:
                        console.log('unsupported command', args)
                }
                break;
        }
        updateState()
    }

    const videoOptions = {
        //height: '529',
        //width: '941',
        playerVars: {
            autoplay: autoplay,
            controls: controls
        }
    }
    
    return (
        <div>
            <YouTube ref={player} videoId={props.video_id} opts={videoOptions} />
            <PlayerControls paused={paused} currentTime={currentTime} duration={duration} volume={volume} onChange={action} />
        </div>
    )
}


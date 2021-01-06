import React, { useEffect, useState } from 'react'
import WordLearner from '../../../../Draft/WordLearner/WordLearner'
import { Button, Checkbox, Modal, Tooltip, message } from 'antd'
import AddCaption from './AddCaption'
import { parseLanguageCode, parseLanguageFlag, getOtherLanguages, parseSimplifiedCode } from '../../../../Util/functions'

type itext = {value : string, language : string}

export default function SubtitleViewer(props : {captions : Array<any>, onCaptionChange: any, currentTime: number, audioLanguage: string}) {
    
    const [texts, setTexts] = useState<Array<itext>>([{value: 'Waiting on next caption', language: 'all'}])
    const [settingShow, setSettingShow] = useState<boolean>(false)
    const [removedTexts, setRemoved] = useState<Array<string>>([])


    function captionTimeToSeconds(stringTime : string) : number {
        const times = stringTime.split(':')
        const m_s = times[2].split(',')
        // milliseconds
        const ms = parseInt(m_s[1])
        // seconds
        const s = parseInt(m_s[0])
        // minutes
        const m = parseInt(times[1])
        // hours
        const h = parseInt(times[0])
        // Totoal seconds of the time string
        const seconds = (h * 60 * 60) + (m * 60) + s + (ms / 1000)
        return seconds

    }

    useEffect(() => {
        //TODO: initalize removetexts with the languages that the user has not selected as learning and that is not the audio language
        // so for example: if the user is learning every language except chinese and esperanto, and the video was esperanto, then the language disabled would be [chinese]
        // but if the video was in english then the languages disabled would be [chinese and esperanto]
        fetch('/api/u/setting').then(res => {
            if (res.status !== 200) {
                console.error(res)
                message.error('Faild to load language preferences')
                return
            }
            return res.json()
        }).then(data => {
            const target = data.targetLanguages
            // Disable languages that are not our target, audio from the video, or primary languages from being enabled
            let disabled = getOtherLanguages([props.audioLanguage, data.primaryLanguage, ...target])
            setRemoved(disabled)
        })
    }, [])

    useEffect(() => {
        if (props.captions === undefined || props.captions.length < 1) return
        // props.captions is in seconds
        let i = 0
        props.captions.forEach((captionSet) => {
            if (!removedTexts.includes(parseSimplifiedCode(captionSet.lCode))) {
                captionSet.captions.forEach((caption : any) => {
                    if (props.currentTime > captionTimeToSeconds(caption.start) && props.currentTime < captionTimeToSeconds(caption.end)) {
                        let t = texts
                        t[i] = {value: caption.content, language: captionSet.lCode}
                        i++
                        setTexts(t)
                    }
                })
            }
        })
    }, [props.currentTime, props.captions])
    
    function disable(code : string) { // CheckboxChangeEvent from antd
        let rt = [...removedTexts]
        if (removedTexts.includes(code)) {
            const i = removedTexts.indexOf(code)
            rt.splice(i, 1)
        } else {
            rt.push(code)
        }
        setTexts([{value: 'Waiting on next caption', language: 'all'}])
        setRemoved(rt)
    }

    if (props.captions === undefined || props.captions.length === 0) {
        return (<div><p>There are currently no provided captions</p>
                    <div>
                        <AddCaption captions={props.captions} onChange={(captions : Array<any>, command : string) => props.onCaptionChange(captions)}/>
                    </div>
                </div>)
    }
    return (
        <div>
            {
                (texts.length === 0) ? (<div style={{width: '250px'}}>Waiting for next caption</div> ) : (
                texts.map((text, i) => {
                    if (text === undefined) return null
                    return (
                        <div key={text.value + i} style={{marginBottom: '20px'}}><WordLearner value={text.value} lineHeight={'40px'} fontSize={'24px'} language={text.language} simplified readOnly/></div>
                    )
                }))
            }
            <div style={bottomBarStyle}>
                <Modal title="Caption Settings" visible={settingShow} onOk={() => setSettingShow(false)} onCancel={() => setSettingShow(false)}>
                    <div style={{textDecoration: 'underline', marginBottom: -10, ...captionListing}}><p>Caption Name</p><p>Show</p></div>
                    {
                        props.captions.map((captionSet, i) => {
                            return (
                                <div key={i} style={captionListing}><span style={{maxWidth: 225}}>{parseLanguageCode(captionSet.lCode)} - {parseLanguageFlag(captionSet.lCode)} - {captionSet.name}</span>
                                    <Checkbox value={captionSet.lCode} checked={!removedTexts.includes(parseSimplifiedCode(captionSet.lCode))} onChange={(e : any) => {disable(e.target.value)}}/>
                                </div>
                            )
                        })
                    }
                    <br></br>
                    <AddCaption captions={props.captions} onChange={(captions : Array<any>, command : string) => props.onCaptionChange(captions)}/>
                </Modal>
                <Tooltip title="Caption Settings">
                    <Button shape="round" icon="setting" onClick={() => setSettingShow(true)}/>
                </Tooltip>
            </div>
        </div>
    )
}

const bottomBarStyle = {
    display: 'flex',
    
}

const captionListing = {display: 'flex', justifyContent: 'space-between', width: 400, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'} as React.CSSProperties
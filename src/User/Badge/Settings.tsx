import React, { useState, useEffect } from 'react'
import Badge from './Badge'
import IBadge from './IBadge'
import Author from '../Author'
import { Input, Button, Checkbox, Avatar, message } from 'antd'
import Loading from '../../Util/Loading'

export default function Settings() {

    const [language, setLanguage] = useState<string>('English')
    const [diamond, setDiamond] = useState<string>('Diamond Supporter')
    const [gold, setGold] = useState<string>('Gold Supporter')

    const [cEnable, setCEnable] = useState<boolean>(false)
    const [nEnable, setNEnable] = useState<boolean>(false)
    const [lEnable, setLEnable] = useState<boolean>(false)
    const [gEnable, setGEnable] = useState<boolean>(false)
    const [dEnable, setDEnable] = useState<boolean>(false)

    const [refresh, setRefresh] = useState<number>(0)
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        let user = window.sessionStorage.getItem('userId')
        if (user === null) {
            message.info('You need to be logged in to view profile settings')
            return
        }
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch(`/b/all/${user}`, reqHeaders).then(res => {
            return res.json()
        }).then(b => {
            b.forEach((badge : IBadge) => {
                switch (badge.type) {
                    case 'contributor':
                        setCEnable(badge.enabled)
                        return
                    case 'new':
                        setNEnable(badge.enabled)
                        return
                    case 'supporterGold':
                        setGold(badge.custom)
                        setGEnable(badge.enabled)
                        return
                    case 'supporterDiamond':
                        setDiamond(badge.custom)
                        setDEnable(badge.enabled)
                        return
                    case 'custom':
                        setLanguage(badge.custom)
                        setLEnable(badge.enabled)
                        return
                    default:
                        return
                }
            })
            setLoaded(true)
        }) 
    }, [])

    function updateRequest(body : Object) {
        const reqHeaders = {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH"
        }
        fetch('/b/', reqHeaders).then(res => {
            setRefresh(refresh + 1)
        })
    }

    function onUpdate(type : string) {
        if (!loaded) return
        let c = ''
        let e = false
        switch(type) {
            case 'custom':
                c = language
                e = !lEnable
                setLEnable(e)
                break;
            case 'supporterGold':
                c = gold
                e = !gEnable
                setGEnable(e)
                break;
            case 'supporterDiamond':
                c = diamond
                e = !dEnable
                setDEnable(e)
                break;
            case 'contributor':
                c = ''
                e = !cEnable
                setCEnable(e)
                break;
            case 'new':
                c = ''
                e = !nEnable
                setNEnable(e)
                break;
            default:
                return     
        }
        const body = {
            by: {
                type: type
            },
            update: {
                custom: c,
                enabled: e
            }
        }
        //console.log(`Updating type: ${type}, enabled: ${e}, custom: ${c}`)
        updateRequest(body)
    }


    function customUpdate() {
        const body = {
            by: {
                type: 'custom'
            },
            update: {
                custom: language,
                enabled: lEnable
            }
        }
        updateRequest(body)
    }

    function goldUpdate() {
        const body = {
            by: {
                type: 'supporterGold'
            },
            update: {
                custom: gold,
                enabled: gEnable
            }
        }
        updateRequest(body)
    }

    function diamondUpdate() {
        const body = {
            by: {
                type: 'supporterDiamond'
            },
            update: {
                custom: diamond,
                enabled: dEnable
            }
        }
        updateRequest(body)
    }

    if (!loaded) return <Loading message="Loading Flair Settings..." />
    return (
        <div style={{width: 500, maxWidth: '95%'}}>
            <h2>Profile Flair</h2>
            <div style={{marginLeft: '20px'}}>
                <div style={{color: 'spacegray', marginBottom: 5, marginTop: 5}}>
                    <Checkbox checked={lEnable} style={{marginRight: 5}} onChange={() => onUpdate('custom')}></Checkbox>
                    <Badge type="custom" custom={language} />
                </div>
                <div style={inputWrap}>
                    <Input value={language} onChange={(e : any) => setLanguage(e.currentTarget.value)} />
                    <Button style={{marginLeft: 5}} type="primary" onClick={customUpdate}>Update</Button>
                </div>
                {/*<div style={{color: 'spacegray', marginBottom: 5, marginTop: 5}}>
                    <Checkbox checked={gEnable} style={{marginRight: 5}} onChange={() => onUpdate('supporterGold')}></Checkbox>
                    <Badge type="supporterGold" custom={gold} />
                </div>
                <div style={inputWrap}>
                    <Input value={gold} onChange={(e : any) => setGold(e.currentTarget.value)} />
                    <Button style={{marginLeft: 5}} type="primary" onClick={goldUpdate}>Update</Button>
                </div>
                <div style={{color: 'spacegray', marginBottom: 5, marginTop: 5}}>
                    <Checkbox  checked={dEnable} style={{marginRight: 5}}  onChange={() => onUpdate('supporterDiamond')}></Checkbox>
                    <Badge type="supporterDiamond" custom={diamond} />
                </div>
                <div style={inputWrap}>
                    <Input value={diamond} onChange={(e : any) => setDiamond(e.currentTarget.value)} />
                    <Button style={{marginLeft: 5}} type="primary" onClick={diamondUpdate}>Update</Button>
                </div>
                <div style={{color: 'spacegray', marginBottom: 5, marginTop: 5}}>
                    <Checkbox  checked={nEnable} style={{marginRight: 5}}  onChange={() => onUpdate('new')}></Checkbox>
                    <Badge type="new" />
                </div>
                */}
                <div style={{color: 'spacegray', marginBottom: 5, marginTop: 5}}>
                    <Checkbox checked={cEnable} style={{marginRight: 5}}  onChange={() => onUpdate('contributor')}></Checkbox>
                    <Badge type="contributor" />
                </div>
                <div style={{marginTop: 15}}>
                    <p>Preview</p>
                    <Author key={refresh}/>
                </div>
            </div>
        </div>
    )
}

const inputWrap = {
    display: 'flex',
    marginBottom: 10,
    marginLeft: 20
} as React.CSSProperties
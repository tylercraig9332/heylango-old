import React, { useState, useEffect } from 'react'
import Badge from './Badge'
import IBadge from './IBadge'
import Author from '../Author'
import { Input, Button, Checkbox, Avatar } from 'antd'

export default function Settings() {

    const [language, setLanguage] = useState<string>('English N | Spanish B2')
    const [diamond, setDiamond] = useState<string>('Diamond Supporter')
    const [gold, setGold] = useState<string>('Gold Supporter')

    const [cEnable, setCEnable] = useState<boolean>(false)
    const [nEnable, setNEnable] = useState<boolean>(false)
    const [lEnable, setLEnable] = useState<boolean>(false)
    const [gEnable, setGEnable] = useState<boolean>(false)
    const [dEnable, setDEnable] = useState<boolean>(false)

    const [test, setTest] = useState<number>(0)

    useEffect(() => {
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch(`/b/${window.sessionStorage.getItem('userId')}`, reqHeaders).then(res => {
            return res.json()
        }).then(b => {
            b.forEach((badge : IBadge) => {
                console.log(badge.type)
                switch (badge.type) {
                    case 'contributor':
                        setCEnable(true)
                        return
                    case 'new':
                        setNEnable(true)
                        return
                    case 'supporterGold':
                        setGEnable(true)
                        return
                    case 'supportDiamond':
                        setDEnable(true)
                        return
                    case 'custom':
                        setLEnable(true)
                        return
                    default:
                        return
                }
            })
            console.log(b)
        }) 
    }, [])

    useEffect(() => {
        
    }, [cEnable, nEnable, lEnable, gEnable, dEnable])

    function updateRequest(body : Object) {
        console.log(body)
        const reqHeaders = {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH"
        }
        fetch('/b/', reqHeaders).then(res => {
            setTest(test + 1)
            console.log(res.status)
        })
    }

    function onUpdate(type : string) {
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
        console.log(`Updating type: ${type}, enabled: ${e}, custom: ${c}`)
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

    return (
        <div style={{width: 500, maxWidth: '95%'}}>
            <h2>Set Language Flair</h2>
            <div style={{marginBottom: 15}}>
                <Author key={test}/>
            </div>
            <div style={{color: 'spacegray', marginBottom: 5, marginTop: 5}}>
                <Checkbox checked={lEnable} style={{marginRight: 5}} onChange={() => onUpdate('custom')}></Checkbox>
                <Badge type="custom" custom={language} />
            </div>
            <div style={inputWrap}>
                <Input value={language} onChange={(e : any) => setLanguage(e.currentTarget.value)} />
                <Button style={{marginLeft: 5}} type="primary" onClick={customUpdate}>Update</Button>
            </div>
            <div style={{color: 'spacegray', marginBottom: 5, marginTop: 5}}>
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
                <Checkbox checked={cEnable} style={{marginRight: 5}}  onChange={() => onUpdate('contributor')}></Checkbox>
                <Badge type="contributor" />
            </div>
            <div style={{color: 'spacegray', marginBottom: 5, marginTop: 5}}>
                <Checkbox  checked={nEnable} style={{marginRight: 5}}  onChange={() => onUpdate('new')}></Checkbox>
                <Badge type="new" />
            </div>
        </div>
    )
}

const inputWrap = {
    display: 'flex',
    marginBottom: 10,
    marginLeft: 20
} as React.CSSProperties
import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import './Landing/landing.css'
import LanguageBelt from './Landing/LanguageBelt';

import {Button} from 'antd'


export default function Landing() {
    return (
        <div className="land">
            <div className="logo">
                    
                </div>
                <div className="heroImgContainer">
                    <div className="logoContainer">
                        <img className="logoImg" src="/static/HeyLangoT1.png"/>
                    </div>
                    <img className="heroImg" src="/static/land/priscilla-du-preez.jpg"  loading="eager"/>
                    <h3 className="mobileHeader">HeyLango is currently only avaliable for desktop</h3>
                </div>
                <div className="headText">
                    <h1 className="subHeading">Effecitve tools for effective language learners</h1>
                    <h1 className="heading" id="siteColor"><strong>Immersion brought to you</strong></h1>
                    <h2 className="subHeading bottomSpace">It's time to get fluent!</h2>
                    <Link to="/signup"><Button type="primary" size="large"><span className="callToAction">Sign up for free!</span></Button></Link>
                </div>
                <LanguageBelt />
                <div className="bodyText">
                    <h1 className="leftHeading animate__animated animate__fadeInUp" id="siteColor">Connect with the language learning community</h1>
                    <h1 className="leftHeading animate__animated animate__fadeInUp" id="siteColor">Learn from consuming real language</h1>
                    <h1 className="leftHeading animate__animated animate__fadeInUp" id="siteColor">Review using SRS tools for maximal language growth</h1>
                </div>
        </div>
    )
}
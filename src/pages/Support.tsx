import React from 'react'
import {Row, Col, Typography } from 'antd'
import Badge from '../User/Badge/Badge'
import InfoWrap from './Info/InfoWrap'

const { Title } = Typography

export default function Support() {
    return (
        <InfoWrap backgroundUrl={'/api/static/louis-pellissier-unsplash.jpg'} width={'400px'} disableReturn>
            <div style={{marginLeft: 'auto', marginRight: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Title>Enjoy the site?</Title>
                <p>Please help keep it free</p>
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_donations" />
                    <input type="hidden" name="business" value="heylangobusiness@gmail.com" />
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                </form>
            </div>
        </InfoWrap>
    )
}

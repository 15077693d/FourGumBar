import React from 'react';
import {useState} from 'react'
import { overlay, column_space_between,blue_btn, yellow_btn, space_between, bold, blue, small_margin_bottom, medium_margin_bottom } from '../../styles/common.module.css'
import { form_container } from '../../styles/components/createCampaignForm.module.css'
import EthBar from '../../components/ethBar'
import CampaignDetail from '../../components/campaignDetail'
import {campaign_container} from '../../styles/pages/index.module.css'
import PayBtn from '../../components/payBtn'
import {Router} from '../../routes'
import {getContributions} from '../../ethereum/campaign'
const Campagin = ({setSelectedCampaign,campaign,renewCampaign})=>{
    const [recentETH, setRecentETH] = useState(campaign.recentETH)
    let [active, setActive] = useState(false)
    function handleClick() {
        getContributions(campaign.address)
        setActive(!active)
    }
    function handleBack(){
        window.history.replaceState(null, null, `/`);
        if(setSelectedCampaign){
            setSelectedCampaign(false)
        }else{
            Router.pushRoute('home')
        }
    }
    let { category, title, target, minETH, address } = campaign
    return <div className={campaign_container}>
        {active ? <div onClick={handleClick} className={overlay}></div> : null}
    <div className={`${form_container} ${column_space_between}`}>
        <div>
            <div className={`${space_between} ${medium_margin_bottom}`}>
                <span className={`${bold} ${blue}`}>{category}</span>
                <button className={yellow_btn}>支岀預算</button>
                <button onClick={handleBack} className={blue_btn}>返回</button>
            </div>
            <div className={`${bold} ${small_margin_bottom}`}>{title}</div>
            <EthBar recentETH={recentETH} target={target} className={medium_margin_bottom} />
            <CampaignDetail campaign={campaign} />
        </div>
        <PayBtn recentETH={recentETH} setRecentETH={setRecentETH} renewCampaign={renewCampaign} campaignAddress={address} minETH={Number(minETH)} active={active} setActive={setActive} />
    </div>
    </div>
};

export default Campagin;
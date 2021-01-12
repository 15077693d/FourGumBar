import React from 'react';
import { space_between, medium_margin_bottom, bold } from '../../styles/common.module.css'
import { cards } from '../../styles/pages/index.module.css'
import { white_btn } from '../../styles/common.module.css'
import Card from '../../components/card'

export default  ({campaigns,setSelectedCampaign}) => {
    return (
        <div>
             <div className={`${space_between} ${medium_margin_bottom}`}>
                <button className={white_btn}>
                    熱門項目
            </button>
                <button className={white_btn}>
                    全部
            </button>
            </div>
            <div className={cards}>
                {campaigns.map(campaign => <Card key={campaign.address} campaign={campaign} setSelectedCampaign={setSelectedCampaign}/>)}
            </div>
            <div className={space_between} style={{ marginTop: 10 }}>
                <span className={bold}>你的項目</span>
                <button style={{ fontSize: 30 }} className={`${white_btn} ${bold}`}>
                    1 + 0
                </button>
            </div>
        </div>
    );
};
import React from 'react';
import instance from "../ethereum/factory";
import Layout from "../components/layout"
import { white_btn } from '../styles/common.module.css'
import { cards } from '../styles/pages/index.module.css'
import { space_between, medium_margin_bottom, bold } from '../styles/common.module.css'
import Card from '../components/card'
import { Campaign } from '../ethereum/campaign';
export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    // const addresses = await instance.methods.getDeployedCampaigns().call()
    // const campaigns = []
    // for (let i = 0; i < addresses.length; i++) {
    //     campaigns.push(await new Campaign(addresses[i]).getCampaigns())
    // }
    // return { props: { campaigns: campaigns } }
    return { props: { campaigns: []} }
}
const index = ({ campaigns }) => {
    return (
        <Layout>
            <div className={`${space_between} ${medium_margin_bottom}`}>
                <button className={white_btn}>
                    熱門項目
            </button>
                <button className={white_btn}>
                    全部
            </button>
            </div>
            <div className={cards}>
                {campaigns.map(campaign => <Card key={campaign.title} {...campaign} />)}
            </div>
            <div className={space_between}>
                <span className={bold}>你的項目</span>
                <button style={{ fontSize: 30 }} className={`${white_btn} ${bold}`}>
                    1 + 0
                </button>
            </div>
        </Layout>
    );
};

export default index;
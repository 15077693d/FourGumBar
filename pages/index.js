import React from 'react';
import {useState} from 'react'
import Layout from "../components/layout"
import { getCampaigns } from '../ethereum/campaign';
import useCampaigns from '../hooks/useCampaign'
import CampaignsNode from '../components/index/campaigns'
import CampaignNode from '../components/index/campaign'
export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const campaigns = await getCampaigns()
    return { props: { initCampaigns: campaigns } }
}
const index = ({ initCampaigns }) => {
    const { campaigns, renewCampaigns,renewCampaign } = useCampaigns(initCampaigns)
    const [selectedCampaign, setSelectedCampaign] = useState(false)
    return (
        <Layout renewCampaigns={renewCampaigns} >
        {selectedCampaign?<CampaignNode renewCampaign={renewCampaign} setSelectedCampaign={setSelectedCampaign} campaign={selectedCampaign}/>:null}
        {
            <CampaignsNode setSelectedCampaign={setSelectedCampaign} campaigns={campaigns}/>
        }
        </Layout>
    );
};

export default index;
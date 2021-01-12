import { useState } from 'react'
import { getCampaigns,getCampaign } from '../ethereum/campaign';
const useCampaigns = (_campaigns) => {
    const [campaigns, setCampaigns] = useState(_campaigns)
    async function renewCampaigns() {
        const campaigns = await getCampaigns()
        setCampaigns(campaigns)
    }
    async function renewCampaign(address){
        let newCampaigns = campaigns
        const i = newCampaigns.findIndex(item => item.address === address)
        newCampaigns[i] = await getCampaign(address)
        setCampaigns(newCampaigns)
    }
    return {
        campaigns,renewCampaigns,renewCampaign
    }

};

export default useCampaigns;
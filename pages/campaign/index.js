import React from 'react';
import Layout from '../../components/layout'
import { getCampaign } from '../../ethereum/campaign'
import CampaignNode from '../../components/index/campaign'
const index = (campaign) => {
    return (
        <Layout>
           <CampaignNode  campaign={campaign}/>
        </Layout>
    );
};

index.getInitialProps = async ({ query }) => {
    return await getCampaign(query.address)
}
export default index;
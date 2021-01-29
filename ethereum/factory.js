import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
const factory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x7352D15e91D188B91B82C48D18F2cCEb60f15358"
);


export default factory;
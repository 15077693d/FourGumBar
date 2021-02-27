import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
const factory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x1C2d31A8dbf980B50f954F4811f14B646e96FF54"
);


export default factory;
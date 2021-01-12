import web3 from './web3';
import CampaignFactory from './build/:CampaignFactory.json';
const factory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xaD3DCf52d2A49aCd0181a2E025d52d01d9589109"
);


export default factory;
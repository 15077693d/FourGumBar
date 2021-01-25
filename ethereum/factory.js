import web3 from './web3';
import CampaignFactory from './build/:CampaignFactory.json';
const factory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x3baEE9C5CbE534F3A6b8dFB3ce37BF217869884D"
);


export default factory;
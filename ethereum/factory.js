import web3 from './web3';
import CampaignFactory from './build/:CampaignFactory.json';
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xFA19B76e78F52FD4A2301627fF48B5d77520616A"
);

export default instance;
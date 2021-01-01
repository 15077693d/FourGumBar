import web3 from './web3';
import CampaignJson from './build/:Campaign.json';
import instance from "../ethereum/factory"
async function createCampaign(
    minETH, category, description, title, targetETH
) {
    const accounts = await web3.eth.getAccounts()
    const minWei = web3.utils.toWei(minETH, "ether")
    const targetWei = web3.utils.toWei(targetETH, "ether")
    return new Promise((resolve, reject) => {
        instance.methods.createCampaign(minWei, category, description, title, targetWei).send({
            from: accounts[0]
        }).on('transactionHash', function (hash) {
            console.log('transactionHash',hash);
        }).on('receipt', function(receipt){
            console.log("receipt",receipt)
            resolve(receipt)
        }).on('error', function(error){
            console.log("error",error)
            reject(error)
        });
    })

}

class Campaign {
    constructor(address) {
        this.address = address
        this.instance = new web3.eth.Contract(
            JSON.parse(CampaignJson.interface),
            address
        );
    }

    async getCampaigns() {
        const category = await this.instance.methods.category().call()
        const description = await this.instance.methods.description().call()
        const title = await this.instance.methods.title().call()
        let targetWei = await this.instance.methods.target().call()
        let minWei = await this.instance.methods.minimumContribution().call()
        let target = Number(web3.utils.fromWei(targetWei))
        let minETH = Number(web3.utils.fromWei(minWei))
        const recentETH = Number(web3.utils.fromWei(await web3.eth.getBalance(this.address)))
        return {
            category,
            description,
            title,
            target,
            minETH,
            recentETH
        }
    }
}
export { Campaign, createCampaign };
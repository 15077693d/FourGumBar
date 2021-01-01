const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { request } = require('https');
const { error } = require('console');
const web3 = new Web3(ganache.provider());
const campaignFactoryPath = path.resolve(__dirname, "..", "ethereum", "build", ":CampaignFactory.json");
const campaignPath = path.resolve(__dirname, "..", "ethereum", "build", ":Campaign.json");
const compliedCampaignFactory = fs.readJSONSync(campaignFactoryPath)
const compliedCampaign = fs.readJSONSync(campaignPath)
let campaignFactory;

let campaign;
let campaignManager;
let approvers = [];
// 0.01eth = 42hkd
const minWei = web3.utils.toWei('0.01', 'ether')
const title = "testTitle"
const description = "testDescription"
const category = "testCategory"
const targetWei = web3.utils.toWei('100', 'ether')
beforeEach(
    async () => {
        accounts = await web3.eth.getAccounts();
        campaignFactory = await new web3.eth.Contract(JSON.parse(compliedCampaignFactory['interface']))
            .deploy({ data: compliedCampaignFactory['bytecode'] })
            .send({ from: accounts[0], gas: 6721975, gasPrice: '30000000' })
    }
);
describe('Campaign Factory Contract', () => {
    it('deploy a Campaign Factory', () => {
        assert.ok(campaignFactory.options.address)
    })

    it('getDeployedCampaigns get 0 address', () => {
        const deployedCampaigns = campaignFactory.methods.getDeployedCampaigns().call()
        assert(deployedCampaigns, [])
    })

    it('getDeployedCampaigns get 1 address after createCampaign', async () => {
        await campaignFactory.methods.createCampaign(minWei, category, description, title,targetWei).send({
            from: accounts[0], gas: 6721975, gasPrice: '30000000'
        });
        const deployedCampaigns = await campaignFactory.methods.getDeployedCampaigns().call()
        campaign = await new web3.eth.Contract(JSON.parse(compliedCampaign['interface']), deployedCampaigns[0])
        campaignManager = await campaign.methods.manager().call()
        assert(campaignManager, accounts[0])
    })

    it('getDeployedCampaigns get 2 address after create two Campaign', async () => {
        await campaignFactory.methods.createCampaign(minWei, category, description, title,targetWei).send({
            from: accounts[0], gas: 6721975, gasPrice: '30000000'
        });
        await campaignFactory.methods.createCampaign(minWei, category, description, title,targetWei).send({
            from: accounts[1], gas: 6721975, gasPrice: '30000000'
        });
        const deployedCampaigns = await campaignFactory.methods.getDeployedCampaigns().call()
        // check there have two campaigns
        assert(deployedCampaigns.length, 2)
        let campaign1 = await new web3.eth.Contract(JSON.parse(compliedCampaign['interface']), deployedCampaigns[0])
        let manager1 = await campaign1.methods.manager().call()
        // check manager equal to sender
        assert(manager1, accounts[0])
        let campaign2 = await new web3.eth.Contract(JSON.parse(compliedCampaign['interface']), deployedCampaigns[1])
        let manager2 = await campaign2.methods.manager().call()
        assert(manager2, accounts[1])
    })

    it('I cant contribute less than 0.01 eth', async () => {
        const contractInitialBalnce = await web3.eth.getBalance(campaign.options.address);
        const userInitialBalance = await web3.eth.getBalance(accounts[2]);
        try {
            await campaign.methods.contribute().send(
                {
                    from: accounts[2],
                    value: web3.utils.toWei('0.001', 'ether')
                }
            )
            assert(false)
        } catch (error) {
            // contract have 0.001 ether
            // user didn't reduce 0.001 ether
            const contractFinalBalnce = await web3.eth.getBalance(campaign.options.address);
            const userFinalBalance = await web3.eth.getBalance(accounts[2]);
            assert(String(contractFinalBalnce - contractInitialBalnce) === "0")
            assert.ok(error)
        }
    })

    it('I can contribute more than minimum', async () => {
        const contribution = web3.utils.toWei('0.02', 'ether')
        const contractInitialBalance = await web3.eth.getBalance(campaign.options.address);
        const userInitialBalance = await web3.eth.getBalance(accounts[3]);
        await campaign.methods.contribute().send(
            {
                from: accounts[3],
                value: contribution
            }
        )
        approvers.push(accounts[3])
        // contract have 0.02 ether
        // user reduce 0.02 ether
        const contractFinalBalance = await web3.eth.getBalance(campaign.options.address);
        const userFinalBalance = await web3.eth.getBalance(accounts[3]);
        assert(String(contractFinalBalance - contractInitialBalance) === contribution)
        assert(Number(web3.utils.toWei('0.0199', 'ether')) < Number(userInitialBalance) - Number(userFinalBalance))
    })

    it('Non-Manager cant createRequest', async () => {
        // createRequest by account 4(non manager)
        try {
            await campaign.methods.createRequest("test1", "Test","Test", web3.utils.toWei('0.01', 'ether'), campaignManager).send(
                {
                    from: accounts[4],
                    gas: "1000000"
                }
            )
            assert(false)
        } catch (error) {
            assert.ok(error)
        }
    })

    it('Manager can createRequest', async () => {
        // createRequest by campaignManager
        await campaign.methods.createRequest("test2", "Test","Test", web3.utils.toWei('0.011', 'ether'), campaignManager).send(
            {
                from: campaignManager,
                gas: "1000000"
            }
        )
        let requestCount = await campaign.methods.requestCount().call()
        assert(requestCount === "1")
    })

    it('Manager cannot createRequest amount more than balance', async () => {
        // createRequest 1 ether
        try {
            await campaign.methods.createRequest("test3", "Test", web3.utils.toWei('1', 'ether'), campaignManager).send(
                {
                    from: campaignManager,
                    gas: "1000000"
                }
            )
            const contractBalance = await web3.eth.getBalance(campaign.options.address);
            let requestCount = await campaign.methods.requestCount().call()
            assert(false)
        } catch (error) {
            assert.ok(error)
        }
    })

    it('non approvers cant use approveRequest', async () => {
        try {
            await campaign.methods.approveRequest("test2").send({
                from: campaignManager
            })
            assert(false)
        } catch (error) {
            assert.ok(error)
        }
    })

    it('manager cant finalizeRequest less than 50%', async () => {
        try {
            await campaign.methods.finalizeRequest("test2").call({
                from: campaignManager
            })
            assert(false)
        } catch (error) {
            assert.ok(error)
        }
    })

    it('approvers can use approveRequest', async () => {
        await campaign.methods.approveRequest("test2").send({
            from: approvers[0]
        })
        let value = await campaign.methods.approvers(approvers[0]).call()
        assert(value)
        let approverCount = await campaign.methods.getRequestApproverCount("test2").call()
        assert(approverCount === "1")
    }
    )

    it('non-manager cant finalizeRequest', async () => {
        try {
            await campaign.methods.finalizeRequest("test2").send({
                from: accounts[5]
            })
            assert(false)
        } catch (error) {
            assert.ok(error)
        }
    })

    it('manager can finalizeRequest with more than half approval', async () => {
        await campaign.methods.finalizeRequest("test2").send({
            from: campaignManager
        })
        const contribution = web3.utils.toWei('0.02', 'ether')
        const contractFinalBalance = await web3.eth.getBalance(campaign.options.address);
        const status = await campaign.methods.getRequestStatus("test2").call()
        assert(contractFinalBalance, "0")
        assert(status === true)
    })

})

import web3 from './web3'
import CampaignJson from './build/Campaign.json'
import factory from '../ethereum/factory'

let theCampaign = (address) =>
  new web3.eth.Contract(JSON.parse(CampaignJson.interface), address)
async function getAccountBalance() {
  const accounts = await web3.eth.getAccounts()
  const weiBalance = await web3.eth.getBalance(accounts[0])
  const ethBalance = await web3.utils.fromWei(weiBalance, 'ether')
  return ethBalance
}
let approveRequest = async (address, id) => {
  const accounts = await web3.eth.getAccounts()
  await theCampaign(address)
    .methods.approveRequest(id)
    .send(({
      from: accounts[0],
    }))
}

async function getCampaignBudgets(address) {
  const accounts = await web3.eth.getAccounts()
  const num_of_budget = await theCampaign(address)
    .methods.getRequestCount()
    .call({
      from: accounts[0],
    })
  let promises = []
  for (let i = 0; i < num_of_budget; i++) {
    promises.push(
      theCampaign(address).methods.getRequestSummary(i).call({
        from: accounts[0],
      }),
    )
  }
  let summarys = await Promise.all(promises)
  const summarysObject = []
  summarys.forEach((summary) => {
    summarysObject.push({
      item: summary[0],
      description: summary[1],
      eth:  web3.utils.fromWei(summary[2], 'ether'),
      address: summary[3],
      complete: summary[4],
      amount: summary[5],
      total: summary[6],
      index:Number(summary[7]),
      campaignAddress:summary[8]
    })
  })
  
  return summarysObject
}

async function addCampaignBudget(address,newBudget,manager,setHash){
    const {name, description,value,recipient }  =  newBudget
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    
    return new Promise((resolve, reject) => {
        if (manager!=account){
            reject("You are not the manager...")
        }
        theCampaign(address)
        .methods.createRequest( String(name),
             String(description),
             web3.utils.toWei(value, 'ether'),
             recipient)
        .send(
          {
            from: account,
          },
          async function (error, transactionHash) {
            await waitUntilDone(transactionHash, resolve)
          },
        )
        .on('transactionHash', function (hash) {
          console.log('transactionHash', hash)
          setHash(hash)
        })
        .on('receipt', function (receipt) {
          console.log('receipt', receipt)
          resolve(receipt)
        })
        .on('error', function (error) {
          reject(error)
        })
    })
}

async function getCampaign(address) {
  let [
    category,
    description,
    title,
    recentETH,
    minETH,
    approverCount,
    requestCount,
    manager,
    target,
  ] = Object.values(await theCampaign(address).methods.getSummary().call())
  recentETH = web3.utils.fromWei(recentETH, 'ether')
  minETH = web3.utils.fromWei(minETH, 'ether')
  target = web3.utils.fromWei(target, 'ether')
  return {
    category,
    description,
    title,
    recentETH,
    minETH,
    approverCount,
    requestCount,
    manager,
    target,
    address,
  }
}

async function getContributions(address) {
  const accounts = await web3.eth.getAccounts()
  const userAddresses = await theCampaign(address)
    .methods.getApproverAddresses()
    .call({
      from: accounts[0],
    })
  const weiContributions = await Promise.all(
    userAddresses.map((userAddress) =>
      theCampaign(address)
        .methods.approverContributions(userAddress)
        .call({ from: accounts[0] }),
    ),
  )
  let contributions = []
  for (let i = 0; i < userAddresses.length; i++) {
    contributions.push({
      地址: userAddresses[i],
      金額ETH: web3.utils.fromWei(weiContributions[i], 'ether'),
    })
  }
  return contributions
}

async function getCampaigns(category) {
  const addresses = await getCampaignAddresses()
  let campaigns = await Promise.all(
    addresses.map((address) =>
      theCampaign(address).methods.getSummary().call(),
    ),
  )
  campaigns = await Promise.all(
    campaigns
      .map((campaign, i) => {
        let _campaign = Object.values(campaign)
        _campaign[3] = web3.utils.fromWei(_campaign[3], 'ether')
        _campaign[4] = web3.utils.fromWei(_campaign[4], 'ether')
        _campaign[8] = web3.utils.fromWei(_campaign[8], 'ether')
        _campaign.push(addresses[i])
        const [
          category,
          description,
          title,
          recentETH,
          minETH,
          approverCount,
          requestCount,
          manager,
          target,
          address,
        ] = _campaign
        return {
          category,
          description,
          title,
          recentETH,
          minETH,
          approverCount,
          requestCount,
          manager,
          target,
          address,
        }
      })
      .reverse(),
  )
  if (category) {
    return campaigns.filter((campaign) => campaign.category === category)
  } else {
    return campaigns
  }
}

async function getCampaignAddresses() {
  const addresses = await factory.methods.getDeployedCampaigns().call()
  return addresses
}

async function waitUntilDone(transactionHash, resolve) {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  while (true) {
    const receipt = await web3.eth.getTransactionReceipt(transactionHash)
    await sleep(2000)
    if (receipt) {
      resolve(receipt)
      break
    }
  }
}

async function createCampaign(
  minETH,
  category,
  description,
  title,
  targetETH,
  setHash,
) {
  const accounts = await web3.eth.getAccounts()
  const minWei = web3.utils.toWei(minETH, 'ether')
  const targetWei = web3.utils.toWei(targetETH, 'ether')
  return new Promise((resolve, reject) => {
    factory.methods
      .createCampaign(minWei, category, description, title, targetWei)
      .send(
        {
          from: accounts[0],
        },
        async function (error, transactionHash) {
          await waitUntilDone(transactionHash, resolve)
        },
      )
      .on('transactionHash', function (hash) {
        console.log('transactionHash', hash)
        setHash(hash)
      })
      .on('receipt', function (receipt) {
        console.log('receipt', receipt)
        resolve(receipt)
      })
      .on('error', function (error) {
        reject(error)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log(confirmationNumber)
        console.log(receipt)
      })
  })
}

async function contribute(eth, campaignAddress, setHash) {
  const wei = web3.utils.toWei(String(eth), 'ether')
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  return new Promise((resolve, reject) => {
    theCampaign(campaignAddress)
      .methods.contribute()
      .send(
        {
          value: wei,
          from: account,
        },
        async function (error, transactionHash) {
          await waitUntilDone(transactionHash, resolve)
        },
      )
      .on('transactionHash', function (hash) {
        console.log('transactionHash', hash)
        setHash(hash)
      })
      .on('receipt', function (receipt) {
        console.log('receipt', receipt)
        resolve(receipt)
      })
      .on('error', function (error) {
        reject(error)
      })
  })
}

export {
  addCampaignBudget,
  getCampaignBudgets,
  createCampaign,
  getCampaignAddresses,
  getCampaigns,
  getAccountBalance,
  getCampaign,
  contribute,
  getContributions,
  approveRequest
}

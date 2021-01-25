import Web3 from 'web3';
let web3;
const options = {
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    // We are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider,null,options);
} else {
    // We are on the Server OR the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/3ef1a6aa11744279a39fab8bdc7692bb"
    );
    web3 = new Web3(provider,null,options);
}

export default web3;
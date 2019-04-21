const ETH_LOCAL = "http://localhost:8545";
const Web3 = require('web3');
var web3 = new Web3(ETH_LOCAL);

//console.log(web3);

web3.eth.getAccounts()
.then(console.log)
.catch(function(e) {
    console.log(e);
});

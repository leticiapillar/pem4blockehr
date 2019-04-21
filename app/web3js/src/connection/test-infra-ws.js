//https://web3js.readthedocs.io/en/1.0/include_package-core.html?highlight=WebsocketProvider
// ocorre um erro no console: connection not open on send() Error: connection not open (...)
// var Web3 = require('web3');
// var web3 = new Web3('http://localhost:8545');
// // or var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// // change provider
// web3.setProvider('ws://localhost:8546');
// // or web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8546'));


//https://github.com/ethereum/go-ethereum/issues/16608
//Neste link a usuaria ( vzts ) recomenda não usar --wsorigins * no geth
// e passar no cabecalho o headers Origin

const ETH_WS = "ws://localhost:8546";
const Web3 = require('web3');
const wsProvider = new Web3.providers.WebsocketProvider(ETH_WS, {
  headers: {
    Origin: "http://localhost"
  }
});
web3 = new Web3(wsProvider);

//console.log(web3);

async function listAccounts() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    process.exit();
}

listAccounts().catch(console.error);

// console fica preso com a conexao websocket
// web3.eth.getAccounts()
// .then(console.log)
// .catch(function(e) {
//     console.log(e);
// });

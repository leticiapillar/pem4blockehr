function getConecctionWS() {
  const ETH_WS = "ws://localhost:8546";
  const Web3 = require('web3');
  const wsProvider = new Web3.providers.WebsocketProvider(ETH_WS, {
    headers: {
      Origin: "http://localhost"
    }
  }); 
  return new Web3(wsProvider);
}

//console.log(web3);

async function listAccounts() {
    var web3 = getConecctionWS();
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

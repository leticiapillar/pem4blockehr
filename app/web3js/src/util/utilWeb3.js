const ETH_HTTP = "http://localhost:8545";
const ETH_WS = "ws://localhost:8546";
const Web3 = require('web3');

getWeb3HTTP = function () {
    return new Web3(ETH_HTTP);;
}

getWeb3Websocket = function () {
    const wsProvider = new Web3.providers.WebsocketProvider(ETH_WS, {
        headers: {
            Origin: "http://localhost"
        }
    });
    return new Web3(wsProvider);
}

getContractInstance = function (web3) {
    const ABI_CONTRACT = [{ "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "patients", "outputs": [{ "name": "owner", "type": "address" }, { "name": "countExams", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "patientsTransfers", "outputs": [{ "name": "ipfsHash", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "professionals", "outputs": [{ "name": "owner", "type": "address" }, { "name": "countPatients", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "countPatients", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "professionalsTransfers", "outputs": [{ "name": "ipfsHash", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "countProfessionals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_patient", "type": "address" }, { "indexed": true, "name": "_count", "type": "uint256" }], "name": "AddPacientEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_patient", "type": "address" }, { "indexed": true, "name": "_addedExam", "type": "bool" }], "name": "AddExamToPatientEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_professional", "type": "address" }, { "indexed": true, "name": "_count", "type": "uint256" }], "name": "AddProfessionalEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_professional", "type": "address" }, { "indexed": true, "name": "_patient", "type": "address" }, { "indexed": true, "name": "_addedExam", "type": "bool" }], "name": "ProfessionalAddExamToPatientEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_patient", "type": "address" }, { "indexed": true, "name": "_professional", "type": "address" }, { "indexed": true, "name": "_addedExam", "type": "bool" }], "name": "PatientTransferExamToProfessionalEvent", "type": "event" }, { "constant": false, "inputs": [], "name": "addPacient", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_ipfsHash", "type": "string" }], "name": "addExamToPacient", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_professional", "type": "address" }, { "name": "_ipfsHash", "type": "string" }], "name": "patientTransferExamToProfessional", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "addProfessional", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_patient", "type": "address" }, { "name": "_ipfsHash", "type": "string" }], "name": "professionalAddExamToPatient", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
    let addressContract = '0xFEa51d1b3BA00b1D69544c356a3Df55f4B79fcB5';
    const instance = new web3.eth.Contract(ABI_CONTRACT, addressContract);
    return instance

    // transactionHash: 0xeeec7ae5b36efe2f0e3081a2d8ee95c4b1b8005ed6c62a13ce40c3b2778c4ba0
    // addressContract: 0xFEa51d1b3BA00b1D69544c356a3Df55f4B79fcB5
}

getAccounts = async function (_web3) {
    const accounts = await _web3.eth.getAccounts();
    return accounts;
}

getUnlockAccount = async function (_web3, _account) {
    await _web3.eth.personal.unlockAccount(_account, "", 999);
    return _account;
}

var exports = module.exports = {
    getWeb3HTTP,
    getWeb3Websocket,
    getContractInstance,
    getAccounts,
    getUnlockAccount
};
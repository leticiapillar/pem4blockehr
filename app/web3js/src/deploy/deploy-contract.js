var utilWeb3 = require('../util/utilWeb3.js');
var web3 = utilWeb3.getWeb3Websocket();

async function deployContract() {

    const ABI_CONTRACT = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"patients","outputs":[{"name":"owner","type":"address"},{"name":"countExams","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"patientsTransfers","outputs":[{"name":"ipfsHash","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"professionals","outputs":[{"name":"owner","type":"address"},{"name":"countPatients","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countPatients","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"professionalsTransfers","outputs":[{"name":"ipfsHash","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countProfessionals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_patient","type":"address"},{"indexed":true,"name":"_count","type":"uint256"}],"name":"AddPacientEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_patient","type":"address"},{"indexed":true,"name":"_addedExam","type":"bool"}],"name":"AddExamToPatientEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_professional","type":"address"},{"indexed":true,"name":"_count","type":"uint256"}],"name":"AddProfessionalEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_professional","type":"address"},{"indexed":true,"name":"_patient","type":"address"},{"indexed":true,"name":"_addedExam","type":"bool"}],"name":"ProfessionalAddExamToPatientEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_patient","type":"address"},{"indexed":true,"name":"_professional","type":"address"},{"indexed":true,"name":"_addedExam","type":"bool"}],"name":"PatientTransferExamToProfessionalEvent","type":"event"},{"constant":false,"inputs":[],"name":"addPacient","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ipfsHash","type":"string"}],"name":"addExamToPacient","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_professional","type":"address"},{"name":"_ipfsHash","type":"string"}],"name":"patientTransferExamToProfessional","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"addProfessional","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_patient","type":"address"},{"name":"_ipfsHash","type":"string"}],"name":"professionalAddExamToPatient","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    const BYTECODE_CONTRACT = '0x608060405234801561001057600080fd5b5061106c806100206000396000f3006080604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630869cfbc146100b4578063554658fe1461013e578063a64770611461021a578063ac6c8048146102a4578063b45c1512146102d3578063b8545981146102fe578063bef36357146103da578063c48b8dd814610405578063e69f142c146104a6578063f6a264bd146104d5578063ffb56bd214610576575b600080fd5b3480156100c057600080fd5b506100f5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105f7565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b34801561014a57600080fd5b5061019f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061063b565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101df5780820151818401526020810190506101c4565b50505050905090810190601f16801561020c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561022657600080fd5b5061025b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106fe565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b3480156102b057600080fd5b506102b9610742565b604051808215151515815260200191505060405180910390f35b3480156102df57600080fd5b506102e8610862565b6040518082815260200191505060405180910390f35b34801561030a57600080fd5b5061035f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610868565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561039f578082015181840152602081019050610384565b50505050905090810190601f1680156103cc5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156103e657600080fd5b506103ef61092b565b6040518082815260200191505060405180910390f35b34801561041157600080fd5b5061048c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610931565b604051808215151515815260200191505060405180910390f35b3480156104b257600080fd5b506104bb610bd2565b604051808215151515815260200191505060405180910390f35b3480156104e157600080fd5b5061055c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610cf3565b604051808215151515815260200191505060405180910390f35b34801561058257600080fd5b506105dd600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610ea9565b604051808215151515815260200191505060405180910390f35b60016020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b600260205281600052604060002060205280600052604060002060009150915050806000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106f45780601f106106c9576101008083540402835291602001916106f4565b820191906000526020600020905b8154815290600101906020018083116106d757829003601f168201915b5050505050905081565b60046020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b60008060008081548092919060010191905055905060408051908101604052803373ffffffffffffffffffffffffffffffffffffffff1681526020016000815250600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155905050803373ffffffffffffffffffffffffffffffffffffffff167f79d2e01fca78d6dcf4f244e869af1b311503664565b526360afa1c9fba51d59760405160405180910390a3600191505090565b60005481565b600560205281600052604060002060205280600052604060002060009150915050806000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109215780601f106108f657610100808354040283529160200191610921565b820191906000526020600020905b81548152906001019060200180831161090457829003601f168201915b5050505050905081565b60035481565b600080600060206040519081016040528085815250600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000190805190602001906109de929190610f9b565b50905050600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020915060408051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001600081525082600201600084600101600081548092919060010191905055815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155905050600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050602060405190810160405280858152508160020160008360010160008154809291906001019190505581526020019081526020016000206000820151816000019080519060200190610b5e929190610f9b565b50905050600081600101541115158573ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fc9ac74c9e86e0bc4ae4836b265b26e7789a65bb3ca15c4581cdfe544daded27a60405160405180910390a460019250505092915050565b6000806003600081548092919060010191905055905060408051908101604052803373ffffffffffffffffffffffffffffffffffffffff1681526020016000815250600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155905050803373ffffffffffffffffffffffffffffffffffffffff167f0ec7ae069bc9a053a0f7d4776a1923115cb4f80f812a9f1a1a1f65e1749e0f1e60405160405180910390a3600191505090565b60008060206040519081016040528084815250600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610d9e929190610f9b565b50905050600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050602060405190810160405280848152508160020160008360010160008154809291906001019190505581526020019081526020016000206000820151816000019080519060200190610e36929190610f9b565b50905050600081600101541115158473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f75f93dc8d368ac50da0557107da64f5d4efaf6e29fbad721eeb18c891279315560405160405180910390a4600191505092915050565b600080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050602060405190810160405280848152508160020160008360010160008154809291906001019190505581526020019081526020016000206000820151816000019080519060200190610f40929190610f9b565b50905050600081600101541115153373ffffffffffffffffffffffffffffffffffffffff167f19d1918c5ac166bbf5a932d238c6d64e531f59e787231cbe318d5d3a2540c3e760405160405180910390a36001915050919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610fdc57805160ff191683800117855561100a565b8280016001018555821561100a579182015b82811115611009578251825591602001919060010190610fee565b5b509050611017919061101b565b5090565b61103d91905b80821115611039576000816000905550600101611021565b5090565b905600a165627a7a723058205da0884a4f42725822e389741a1b83334001f5c02a83c952889ed39d30c5d66a0029';

    var myContract = new web3.eth.Contract(ABI_CONTRACT);
    var estimateGas = await myContract.deploy({ data: BYTECODE_CONTRACT }).estimateGas();
    //console.log('estimateGas: ' + estimateGas);

    var accounts = await utilWeb3.getAccounts(web3);
    var accountContract = await utilWeb3.getUnlockAccount(web3, accounts[0]);

    var myContractInstance = myContract.deploy({
        data: BYTECODE_CONTRACT
    }).send({
        from: accountContract,
        gas: web3.utils.toHex(estimateGas) //,
        //gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei'))
    });

    myContractInstance.on('transactionHash', function (transactionHash) {
        console.log('transactionHash: ' + transactionHash);
    }).then(function (newContractInstance) {
        console.log('addressContract: ' + newContractInstance.options.address);
        process.exit();
    }).catch(function (error) {
        console.log('error deploy: ' + error);
    });

}

deployContract().catch(console.error);

// estimateGas: 1172165
// true
// transactionHash: 0xeeec7ae5b36efe2f0e3081a2d8ee95c4b1b8005ed6c62a13ce40c3b2778c4ba0
// addressContract: 0xFEa51d1b3BA00b1D69544c356a3Df55f4B79fcB5


var utilWeb3 = require('../util/utilWeb3.js');
var web3 = utilWeb3.getWeb3Websocket();

async function main() {

    var myContractInstance  = utilWeb3.getContractInstance(web3);
    var ipfsHash = 'QmUrLNeoSSGWLA28EojnfN4iKsojJ6zMfd97SfhSbHVZJy';
    var gasEstimate = web3.utils.toHex(1500000);

    var accounts = await utilWeb3.getAccounts(web3);
    var accountPatient = await utilWeb3.getUnlockAccount(web3, accounts[1]);
    var accountProfessional = await utilWeb3.getUnlockAccount(web3, accounts[2]);

    var unlockAccountPatient = await web3.eth.personal.unlockAccount(accountPatient, "", 900);
    //console.log('unlockAccountPatient: '+unlockAccountPatient);
    var unlockAccountProfessional = await web3.eth.personal.unlockAccount(accountProfessional, "", 900);
    //console.log('unlockAccountProfessional: '+unlockAccountProfessional);

    var addPacientResult = await myContractInstance.methods.addPacient().send({ from: accountPatient, gas: gasEstimate });
    console.log('addPacientResult transactionHash: ' + addPacientResult.transactionHash);

    //addProfessional by transaction
    var addProfessionalResult = await myContractInstance.methods.addProfessional().send({ from: accountProfessional, gas: gasEstimate });
    console.log('addProfessionalResult transactionHash: ' + addProfessionalResult.transactionHash);


    //addExamToPacient by transaction
    var addExamToPacientResult = await myContractInstance.methods.addExamToPacient(ipfsHash).send({ from: accountPatient, gas: gasEstimate });
    console.log('addExamToPacientResult transactionHash: ' + addExamToPacientResult.transactionHash);

    //professionalAddExamToPatient by Transaction
    var professionalAddExamToPatientResult = await myContractInstance.methods.professionalAddExamToPatient(accountPatient, ipfsHash).send({ from: accountProfessional, gas: gasEstimate });
    console.log('professionalAddExamToPatientResult transactionHash: ' + professionalAddExamToPatientResult.transactionHash);

    //patientTransferExamToProfessional by transaction
    var patientTransferExamToProfessionalResult = await myContractInstance.methods.patientTransferExamToProfessional(accountProfessional, ipfsHash).send({ from: accountPatient, gas: gasEstimate });
    console.log('patientTransferExamToProfessionalResult transactionHash: ' + patientTransferExamToProfessionalResult.transactionHash);

    //call countPatientsCall
    var countPatientsCall = await myContractInstance.methods.countPatients().call();
    console.log('countPatientsCall: ' + countPatientsCall);

    //call countProfessionals
    var countProfessionalsCall = await myContractInstance.methods.countProfessionals().call();
    console.log('countProfessionalsCall: ' + countProfessionalsCall);

    process.exit();
}

main().catch(console.error);

// addPacientResult transactionHash: 0x83f6b2d832db8b0d20a73e895431b608cce0cd88949078571543708dae7bbc79
// addProfessionalResult transactionHash: 0xaf869fc4d2d13e2abaa1a50474e59b934fcee64072c63fa91323bb544b62ced9
// addExamToPacientResult transactionHash: 0x5b3b700782388039123e9f8876a08f322f61469862afc14af6450d4ecc8f6dbc
// professionalAddExamToPatientResult transactionHash: 0x38bef97380e754857a924e2e3ab6e7d4d601359ab21f52af1c367e11d29477b3
// patientTransferExamToProfessionalResult transactionHash: 0x50928611c0ca513dccaf36cfed3c0b2435bfbe6dd913f309d69ac4623eba28f1
// countPatientsCall: 1
// countProfessionalsCall: 1

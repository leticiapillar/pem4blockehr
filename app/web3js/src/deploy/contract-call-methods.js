var utilWeb3 = require('../util/utilWeb3.js');
var web3 = utilWeb3.getWeb3Websocket();

async function main() {

    var myContractInstance  = utilWeb3.getContractInstance(web3);
    var ipfsHash = 'ipfsHash_exam_01';

    var accounts = await utilWeb3.getAccounts(web3);
    var accountPatient = await utilWeb3.getUnlockAccount(web3, accounts[1]);
    var accountProfessional = await utilWeb3.getUnlockAccount(web3, accounts[2]);
   
    //call countPatientsCall
    var countPatientsCall = await myContractInstance.methods.countPatients().call();
    console.log('countPatientsCall: '+countPatientsCall);

    //call countProfessionals
    var countProfessionalsCall = await myContractInstance.methods.countProfessionals().call();
    console.log('countProfessionalsCall: '+countProfessionalsCall);


    // call addPacient
    var addPacienteCall = await myContractInstance.methods.addPacient().call();
    console.log('addPacienteCall: '+addPacienteCall);

    // call addPacient
    var addProfessionalCall = await myContractInstance.methods.addProfessional().call();
    console.log('addProfessionalCall: '+addProfessionalCall);


    // call addExamToPacient
    var addExamToPacientCall = await myContractInstance.methods.addExamToPacient(ipfsHash).call();
    console.log('addExamToPacientCall: '+addExamToPacientCall);

    // call professionalAddExamToPatient
    var professionalAddExamToPatientCall = await myContractInstance.methods.professionalAddExamToPatient(accountPatient, ipfsHash).call();
    console.log('professionalAddExamToPatientCall: '+professionalAddExamToPatientCall);

    // call professionalAddExamToPatient
    var patientTransferExamToProfessionalCall = await myContractInstance.methods.patientTransferExamToProfessional(accountProfessional, ipfsHash).call();
    console.log('patientTransferExamToProfessionalCall: '+patientTransferExamToProfessionalCall);

    process.exit();
}

main().catch(console.error);

// countPatientsCall: 0
// countProfessionalsCall: 0
// addPacienteCall: true
// addProfessionalCall: true
// addExamToPacientCall: true
// professionalAddExamToPatientCall: true
// patientTransferExamToProfessionalCall: true

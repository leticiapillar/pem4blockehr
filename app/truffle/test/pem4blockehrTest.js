var Pem4BlockEHR = artifacts.require("./Pem4BlockEHR.sol");

contract("Pem4BlockEHR", function (accounts) {
    var pem4BlockEHRInstance;
    var accountProfessional = accounts[1];
    var accountPatient = accounts[2];
    var ipfsHash = 'QmSn4FfpBmjqi3j5DQRT5EfujsEbeNn48pTgTwYbQzr1D5';
    var countPatients = 0;
    var countProfessionals = 0;

    it('count patient == 0', function () {
        return Pem4BlockEHR.deployed().then(function (instance) {
            pem4BlockEHRInstance = instance;
            return pem4BlockEHRInstance.countPatients();
        }).then(function (count) {
            assert.equal(count, 0);
        });
    });

    it('count professionals == 0', function () {
        return Pem4BlockEHR.deployed().then(function (instance) {
            pem4BlockEHRInstance = instance;
            return pem4BlockEHRInstance.countProfessionals();
        }).then(function (count) {
            assert.equal(count, 0);
        });
    });

    it('add patient', function () {
        return Pem4BlockEHR.deployed().then(function (instance) {
            pem4BlockEHRInstance = instance;
            return pem4BlockEHRInstance.countPatients();
        }).then(function (count) {
            countPatients += count;
            return pem4BlockEHRInstance.addPacient.call({ from: accountPatient })
        }).then(function (success) {
            assert.equal(success, true, 'addPaciente: call success');
            return pem4BlockEHRInstance.addPacient({ from: accountPatient })
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'event: emitted success');
            assert.equal(receipt.logs[0].event, 'AddPacientEvent', 'event name: correct');
            assert.equal(receipt.logs[0].args._patient, accountPatient, 'log: account linked to the patient');
            assert.equal(receipt.logs[0].args._count.toNumber(), countPatients, 'log: total pacintes is correct');
        });
    });

    it('adicionar profissional', function () {
        return Pem4BlockEHR.deployed().then(function (instance) {
            pem4BlockEHRInstance = instance;
            return instance.countProfessionals();
        }).then(function (count) {
            countProfessionals += count;
            return pem4BlockEHRInstance.addProfessional.call({ from: accountProfessional })
        }).then(function (success) {
            assert.equal(success, true, 'addProfessional: call success');
            return pem4BlockEHRInstance.addProfessional({ from: accountProfessional })
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'event: emitted success');
            assert.equal(receipt.logs[0].event, 'AddProfessionalEvent', 'event name: correct');
            assert.equal(receipt.logs[0].args._professional, accountProfessional, 'log: account linked to the professional');
            assert.equal(receipt.logs[0].args._count.toNumber(), countProfessionals, 'log: total pacintes is correct');
        });
    });

    it('add exam to patient', function () {
        return Pem4BlockEHR.deployed().then(function (instance) {
            pem4BlockEHRInstance = instance;
            return pem4BlockEHRInstance.addExamToPacient.call(ipfsHash, { from: accountPatient })
        }).then(function (success) {
            assert.equal(success, true, 'addExamToPaciente: call success');
            return pem4BlockEHRInstance.addExamToPacient(ipfsHash, { from: accountPatient })
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'event: emitted success');
            assert.equal(receipt.logs[0].event, 'AddExamToPatientEvent', 'event name: correct');
            assert.equal(receipt.logs[0].args._patient, accountPatient, 'log: account linked to the patient');
            assert.equal(receipt.logs[0].args._addedExam, true, 'log: exam linked to the patient');
        });
    });

    it('profissional add exame to patient', function () {
        return Pem4BlockEHR.deployed().then(function (instance) {
            pem4BlockEHRInstance = instance;
            return pem4BlockEHRInstance.professionalAddExamToPatient.call(accountPatient, ipfsHash, { from: accountProfessional })
        }).then(function (success) {
            assert.equal(success, true, 'professionalAddExamToPatient: call success');
            return pem4BlockEHRInstance.professionalAddExamToPatient(accountPatient, ipfsHash, { from: accountProfessional })
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'event: emitted success');
            assert.equal(receipt.logs[0].event, 'ProfessionalAddExamToPatientEvent', 'event name: correct');
            assert.equal(receipt.logs[0].args._professional, accountProfessional, 'log: account linked to the professional');
            assert.equal(receipt.logs[0].args._patient, accountPatient, 'log: account linked to the patient');
            assert.equal(receipt.logs[0].args._addedExam, true, 'log: exam linked to the patient by professional');
        });
    });

    it('patient transfer exame to professional', function () {
        return Pem4BlockEHR.deployed().then(function (instance) {
            pem4BlockEHRInstance = instance;
            return pem4BlockEHRInstance.patientTransferExamToProfessional.call(accountProfessional, ipfsHash, { from: accountPatient })
        }).then(function (success) {
            assert.equal(success, true, 'patientTransferExamToProfessional: call success');
            return pem4BlockEHRInstance.patientTransferExamToProfessional(accountProfessional, ipfsHash, { from: accountPatient })
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'event: emitted success');
            assert.equal(receipt.logs[0].event, 'PatientTransferExamToProfessionalEvent', 'event name: correct');
            assert.equal(receipt.logs[0].args._patient, accountPatient, 'log: account linked to the patient');
            assert.equal(receipt.logs[0].args._professional, accountProfessional, 'log: account linked to the professional');
            assert.equal(receipt.logs[0].args._addedExam, true, 'log: exam transfer to the professional by patient');
        });
    });

});

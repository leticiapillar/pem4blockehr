var utilWeb3 = require('./utilWeb3.js');
var util = require('./util.js');
var moment = require('moment');

var web3 = utilWeb3.getWeb3Websocket();
var myContractInstance = utilWeb3.getContractInstance(web3);
const GAS_ESTIMATE = web3.utils.toHex(1500000);

sendPatientTransferExam = function (_num, _accountPatient, _accountProfessional, _ipfsHash, _fileName, _objData) {
    myContractInstance.methods.patientTransferExamToProfessional(_accountProfessional, _ipfsHash).send({
        from: _accountPatient,
        gas: GAS_ESTIMATE,
        gasPrice: 0
    }).on('confirmation', function (confNumber, receipt) {
        if (confNumber == 24) {
            let tc = moment.utc(); //Tc = tempo de conclusão da transação
            web3.eth.getBlock(receipt.blockNumber)
                .then(function (result) {

                    getBlockData(_num, result, tc, _objData)
                        .then(function (data) {
                            util.writeLogJson(data, _fileName);
                            util.writeLogTxt(data, _fileName);
                        })
                        .catch(function (e) {
                            console.log('error getBlockData: ' + e);
                        });

                }).catch(function (e) {
                    console.log('error getBlock: ' + e);
                });
        }
    }).catch(function (e) {
        console.log('error contract method: ' + e);
    });
}

getBlockData = function (_num, _result, _tc, _objData) {
    return new Promise((resolve, reject) => {
        if (_result == 'undefined') {
            reject(err);
        } else {
            var blockHash = _result.hash;
            var blockNumber = _result.number;
            var blockTimestamp = _result.timestamp; //The unix timestamp for when the block was collated. //Ti = Tempo de implantação da transação.

            var latency = Math.abs(moment(_tc).diff(moment.unix(blockTimestamp).utc()) / 1000);
            var data = 'number:' + _num +
                ',blockHash:' + blockHash + ',block:' + blockNumber +
                ',ti:' + moment.unix(blockTimestamp) +
                ',tc:' + moment(_tc) + 
                ',latency:' + latency;
            console.log(data);

            _objData.push({
                number: _num,
                blockHash: blockHash,
                block: blockNumber,
                ti: '' + moment.unix(blockTimestamp),
                tc: '' + moment(_tc),
                latency: latency
            });

            resolve(_objData);
        }
    });
}

var exports = module.exports = {
    sendPatientTransferExam,
    getBlockData
};
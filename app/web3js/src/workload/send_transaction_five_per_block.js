var utilWeb3 = require('../util/utilWeb3.js');
var utilWorkload = require('../util/utilWorkload.js');
var util = require('../util/util.js');
var moment = require('moment');
var web3 = utilWeb3.getWeb3Websocket();

const TRANSACTIONS_PER_BLOCK = 5;
const IPFS_HASH = 'QmUrLNeoSSGWLA28EojnfN4iKsojJ6zMfd97SfhSbHVZJy';

main().catch(console.error);

async function main() {
    const LIMIT_TRANSACTIONS = await util.varifyArgs(process.argv[2]);

    var accounts = await utilWeb3.getAccounts(web3);

    const START_NOW = moment().format();
    console.log('starting workload: ' + START_NOW, ', sendTransactions: ', (TRANSACTIONS_PER_BLOCK * LIMIT_TRANSACTIONS));
    const FILE_NAME = 'log_worload_' + LIMIT_TRANSACTIONS + '_transactions_five_per_block_' + START_NOW;

    var objData = [];
    let t = 0
    let count = 0;
    while (true) {
        var accountPatient = await utilWeb3.getUnlockAccount(web3, accounts[1]);
        var accountProfessional = await utilWeb3.getUnlockAccount(web3, accounts[2]);
        for (var i = 0; i < TRANSACTIONS_PER_BLOCK; i++) {
            ++count;
            utilWorkload.sendPatientTransferExam(count, accountPatient, accountProfessional, IPFS_HASH, FILE_NAME, objData);
        }
        var sleep = await util.funcaoSleep(5000);
        ++t;
        if (t == LIMIT_TRANSACTIONS) {
            //console.log('finished t: ' + t);
            break;
        }
    }
    console.log('finished workload: ' + moment().format());
}

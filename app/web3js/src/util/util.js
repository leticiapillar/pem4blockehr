var fs = require('fs');

varifyArgs = function (_param) {
    return new Promise((resolve, reject) => {
        var paramLimit = parseInt(_param);
        if (paramLimit > 0) {
            resolve(paramLimit);
        } else {
            console.log('Error: please enter the transaction limit as an argument.');
            reject(err);
        }
    });
}

writeLogJson = function (_objData, _fileName) {
    var json = JSON.stringify(_objData);
    return new Promise(res => writeLog(_fileName + '.json', json));
}

writeLogTxt = function (_objData, _fileName) {
    var json = JSON.stringify(_objData);
    return new Promise(res => writeLog(_fileName + '.txt', json));
}

writeLog = function (_fileName, _text) {
    return new Promise((resolve, reject) => {
        fs.writeFile(_fileName, _text, err => {
            if (err) reject(err);
            else resolve();
        });
    });
}

funcaoSleep = async function (_ms = 5000) {
    await sleep(5000);
    return 'funcaoSleep: ' + (_ms / 1000) + ' seconds';
}

sleep = function (_ms = 0) {
    return new Promise(r => setTimeout(r, _ms));
}

var exports = module.exports = {
    varifyArgs,
    writeLogJson,
    writeLogTxt,
    writeLog,
    funcaoSleep,
    sleep
};
/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */

import Api from '../tools/api';

const api = new Api();

const addWriteLog = (writeLog) => ((fn) => (async (...args) => {
    let ans = await fn(...args);
    if (typeof ans === 'object') {
        ans = ans.result;
    }
    writeLog(ans);
    return ans;
}));
const validate = (str) => {
    const n = +str;
    if (isNaN(n)) {
        throw new Error('ValidationError')
    }
    return n;
};
const round = Math.round;
const getLength = (n) => (String(n).length);
const square = (n) => (n * n);
const mod3 = (n) => (n % 3);


const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
    writeLog(value);

    const [roundLog, apiGetBaseLog, getLengthLog, squareLog, mod3Log] = [
        round,
        api.get('https://api.tech/numbers/base'),
        getLength,
        square,
        mod3
    ].map(addWriteLog(writeLog));

    Promise.resolve(value)
    .then(validate)
    .then(roundLog)
    .then((data) => (apiGetBaseLog({from: 10, to: 2, number: data})))
    .then(getLengthLog)
    .then(squareLog)
    .then(mod3Log)
    .then((id) => (api.get(`https://animals.tech/${id}`)({})))
    .then(({result}) => handleSuccess(result))
    .catch(e => {
        console.log(e);
        handleError(e.message);
    });
}

export default processSequence;

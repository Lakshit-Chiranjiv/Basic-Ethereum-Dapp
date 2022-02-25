import Web3 from 'web3';

import configuration from './../build/contracts/Basic.json';

const contract_address = configuration.networks['5777'].address;
const contract_abi = configuration.abi;

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');

const basic_contract = new web3.eth.Contract(contract_abi,contract_address);

let acc = document.querySelector('#acc');
let own = document.querySelector('#own');
let av = document.querySelector('#av');
let inp = document.querySelector('#inpval');
let btn = document.querySelector('#bt');

let currAcc;
const getAccount = async() => {
    const accounts = await web3.eth.requestAccounts();
    displayAccount = accounts[0];
    currAcc = displayAccount;
    acc.innerText = displayAccount;
}

const getContractOwner = async() => {
    const owner = await basic_contract.methods.contractOwner().call();
    own.innerText = owner;
}

const getAvalue = async() => {
    const val = await basic_contract.methods.getA().call();
    av.innerText = val;
}

const setAvalue = async() => {
    const val = Number(inp.value);
    await basic_contract.methods.setA(val).send({
        from: currAcc,
        value: 1000000000
    });
    console.log('done');
    getAvalue();
}

btn.addEventListener('click',setAvalue);

// we use methods.methodname().send({from : account, value: value transacted}) when the method is payable and specify a object with from account and value sent
getAccount();
getContractOwner();
getAvalue();
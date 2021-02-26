import { TezosToolkit } from '@taquito/taquito';
const axios = require('axios');


const tezos = new TezosToolkit('https://delphinet.smartpy.io');

async function fetchfrombchain() {

    let res = await axios.get('https://better-call.dev/v1/bigmap/delphinet/75796/keys');
    let data = res.data;
    //console.log(data);
    for(var i in data){
        var objectInstance = data[i].data;
        var timest= data[i].timestamp;
        for(var j in objectInstance.value.children) {
            var account = objectInstance.value.children[j].value;
            var contract = await tezos.contract.at(account); 
            var storage = await contract.storage();

            console.log(storage);
        }
        console.log('...');
    }
    
}

fetchfrombchain();
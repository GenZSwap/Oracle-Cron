import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner, importKey } from '@taquito/signer';

const axios = require('axios');
var CronJob = require('cron').CronJob;


const tezos = new TezosToolkit('https://delphinet.smartpy.io');

tezos.setProvider({ signer: new InMemorySigner('edskRf6hntyzJaC4Kv4ywGgPRVV2M12ubX5GkN8NxrmpXzuqBRmeppq3WhUtepahhnRRAeMQ1H44psNLmAC2M58R1A8WG5A4eD') });


const ApiEndpoint = "https://api.coinbase.com/v2/prices/XTZ-USD/sell"

var job = new CronJob('* * * * *', async () => {


    const response = await axios.get(ApiEndpoint);

    const amount = Math.floor(response.data.data.amount * 100);
    
    console.log(amount);

}, null, true, 'America/Los_Angeles');
job.start(); 
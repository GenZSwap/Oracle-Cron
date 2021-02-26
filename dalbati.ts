const Axios = require('axios');
const Tezos = require('@taquito/taquito');
const InMemorySigner  = require('@taquito/signer');
const rpc = 'https://testnet.tezster.tech';
const tezos = new Tezos.TezosToolkit(rpc);

const sendPriceToContract = async (price) => {
    const signer = await InMemorySigner.InMemorySigner.fromSecretKey('edskRyY82578J5LV2crG5rr7JZ3tRqCqoxqAgyTKGnXx4e3anG6P93XBfBWqcabA2TZJUDJg1nvaK8a11oMvsCwxWsdiv91exN');
    tezos.setProvider({signer});
    tezos.contract.at("KT1QkHVNgP282zqv4NatnhDbqgQhgrMEFL4U")
        .then(contract => {
            return contract.methods.feedData(price).send()
        })
        .then(op => {
            console.log(op.hash);
            return op.confirmation(2)
        })
        .then(hash => {
            console.log(hash);
            setTimeout(() => {
                getPrice();
            },60000)
        })
        .catch(err => {
            console.log(err);
        })
}

const getPrice = () => {
    Axios.get("https://api.coingecko.com/api/v3/coins/tezos?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false")
        .then(res => {
            console.log(res.data.market_data.current_price.usd);
            let priceToBeSent = res.data.market_data.current_price.usd * 100;
            priceToBeSent = Math.floor(priceToBeSent);
            console.log(priceToBeSent);
            sendPriceToContract(priceToBeSent);
        })
        .catch(err => {
            console.log(err);
        })
}

getPrice();
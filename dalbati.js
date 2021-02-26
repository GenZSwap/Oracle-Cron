var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var Axios = require('axios');
var Tezos = require('@taquito/taquito');
var InMemorySigner = require('@taquito/signer');
var rpc = 'https://testnet.tezster.tech';
var tezos = new Tezos.TezosToolkit(rpc);
var sendPriceToContract = function (price) { return __awaiter(_this, void 0, void 0, function () {
    var signer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, InMemorySigner.InMemorySigner.fromSecretKey('edskRyY82578J5LV2crG5rr7JZ3tRqCqoxqAgyTKGnXx4e3anG6P93XBfBWqcabA2TZJUDJg1nvaK8a11oMvsCwxWsdiv91exN')];
            case 1:
                signer = _a.sent();
                tezos.setProvider({ signer: signer });
                tezos.contract.at("KT1QkHVNgP282zqv4NatnhDbqgQhgrMEFL4U")
                    .then(function (contract) {
                    return contract.methods.feedData(price).send();
                })
                    .then(function (op) {
                    console.log(op.hash);
                    return op.confirmation(2);
                })
                    .then(function (hash) {
                    console.log(hash);
                    setTimeout(function () {
                        getPrice();
                    }, 60000);
                })["catch"](function (err) {
                    console.log(err);
                });
                return [2 /*return*/];
        }
    });
}); };
var getPrice = function () {
    Axios.get("https://api.coingecko.com/api/v3/coins/tezos?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false")
        .then(function (res) {
        console.log(res.data.market_data.current_price.usd);
        var priceToBeSent = res.data.market_data.current_price.usd * 100;
        priceToBeSent = Math.floor(priceToBeSent);
        console.log(priceToBeSent);
        sendPriceToContract(priceToBeSent);
    })["catch"](function (err) {
        console.log(err);
    });
};
getPrice();

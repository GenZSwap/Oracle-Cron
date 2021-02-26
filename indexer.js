"use strict";
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
exports.__esModule = true;
var taquito_1 = require("@taquito/taquito");
var axios = require('axios');
var tezos = new taquito_1.TezosToolkit('https://delphinet.smartpy.io');
function fetchfrombchain() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, _a, _b, _i, i, objectInstance, timest, _c, _d, _e, j, account, contract, storage;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, axios.get('https://better-call.dev/v1/bigmap/delphinet/75796/keys')];
                case 1:
                    res = _f.sent();
                    data = res.data;
                    _a = [];
                    for (_b in data)
                        _a.push(_b);
                    _i = 0;
                    _f.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 9];
                    i = _a[_i];
                    objectInstance = data[i].data;
                    timest = data[i].timestamp;
                    _c = [];
                    for (_d in objectInstance.value.children)
                        _c.push(_d);
                    _e = 0;
                    _f.label = 3;
                case 3:
                    if (!(_e < _c.length)) return [3 /*break*/, 7];
                    j = _c[_e];
                    account = objectInstance.value.children[j].value;
                    return [4 /*yield*/, tezos.contract.at(account)];
                case 4:
                    contract = _f.sent();
                    return [4 /*yield*/, contract.storage()];
                case 5:
                    storage = _f.sent();
                    console.log(storage);
                    _f.label = 6;
                case 6:
                    _e++;
                    return [3 /*break*/, 3];
                case 7:
                    console.log('...');
                    _f.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 2];
                case 9: return [2 /*return*/];
            }
        });
    });
}
fetchfrombchain();

var totalFund = 250 * Math.pow(10, 18);
var tokensMinted = 300 * Math.pow(10, 18);
var investment = 1 * Math.pow(10, 18);
var mintAmount = (investment * tokensMinted) / totalFund;
console.log(mintAmount);
totalFund += investment;
tokensMinted += mintAmount;
var call = (mintAmount * totalFund) / tokensMinted;
console.log(call);

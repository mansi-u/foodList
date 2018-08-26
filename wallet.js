

var ethers = require('ethers');
var wall = ethers.Wallet;
var providers = require('ethers').providers;
var mongoConnection = require('./mongoConnection');
var async = require('async');
var md5 = require('md5');

function addCryptoCurrency(data, callback){
    console.log(data);
    async.waterfall([function(callback){
        mongoConnection.addCryptoCurrency(data, function(data){
                callback(data.err);
        });    }, function(callback){
            mongoConnection.getUsers(function(data){
            callback(data.err, data.data)
            });
        }, function(users, callback){
            console.log(users);
            async.eachLimit(users, 10, function(user, callback){
                var password = md5(user.password);
                wall.fromBrainWallet(user.username, password).then(function (wallet) {
                    console.log("Address: ", wallet);
                    var walletDetails = wallet;
                    walletDetails.password = password;
                    mongoConnection.updateUser(user._id, {$set: {
                        walletDetails: walletDetails
                    }}, callback);
                
            });
        }, callback);
        }], callback);

   
}


function transfer(callback){
    async.waterfall([
     function(callback){
         mongoConnection.getUsers(function(data){
         callback(data.err, data.data)
         });
     },
       function(users, callback){
         var wallet = new ethers.Wallet(users[0].walletDetails.privateKey);
         var network = providers.networks.ropsten;
         var infuraProvider = new providers.InfuraProvider(network);
         wallet.provider = infuraProvider;
         var amount = ethers.utils.parseEther('1.0');
         var sendPromise = wallet.send(users[1].walletDetails.address, amount);
         sendPromise.then(data => {console.log(data);
          callback();})
     }
    ],callback);
} 

module.exports = {
    addCryptoCurrency: addCryptoCurrency,
    transfer: transfer
}
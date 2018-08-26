var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var dbName = 'foodlist';
var URL = `mongodb://mansi:db1234@ds259351.mlab.com:59351/foodlist`



function insertUsers(data, callback) {
    //console.log(data);
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, client) {
        if (err) return console.log(err);
        //  console.log(URL);
       var db = client.db(dbName);
        db.collection('users').insert(data, function (err, insertedData) {
            callback({
                err: err,
                data: insertedData
            });
            client.close();
        });
    });
}


function insertFoodItem(data, callback) {
    //console.log(data);
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, client) {
        if (err) return console.log(err);
        //  console.log(URL);
       var db = client.db(dbName);
        db.collection('food').insert(data, function (err, insertedData) {
            callback({
                err: err,
                data: insertedData
            });
            client.close();
        });
    });
}

function addCryptoCurrency(data, callback){
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, client) {
        if (err) return console.log(err);
        //  console.log(URL);
       var db = client.db(dbName);
    db.collection('cryptocurrency').insert(data, function (err, insertedData) {
        callback({
            err: err,
            data: insertedData
        });
        client.close();
    });
});
}

function getUsers(callback) {
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, client) {
        if (err) return console.log(err);
        //  console.log(URL);
       var db = client.db(dbName);
        db.collection("users").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            callback({
                err: err,
                data: result
            })
            client.close();
        });
    });
}

function updateUser(_id, update,callback) {
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, client) {
        if (err) return console.log(err);
        //  console.log(URL);
       var db = client.db(dbName);
        db.collection("users").findOneAndUpdate({_id: ObjectID(_id)},update, function (err, data) {
            if (err) return console.log(err);
            callback({
                err: err,
                data: data
            });
            client.close();

        });
    });
}

module.exports = {
    insertUsers: insertUsers,
    getUsers: getUsers,
    addCryptoCurrency: addCryptoCurrency,
    updateUser: updateUser
}

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var dbName = 'foodlist';
var URL = `mongodb://mansi:db1234@ds259351.mlab.com:59351`

function insertFoodItem(data, callback) {
    //console.log(data);
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) return console.log(err);
        //  console.log(URL);
       // var db = client.db(dbName);
        db.collection('food').insert(data, function (err, insertedData) {
            callback({
                err: err,
                data: insertedData
            });
            client.close();
        });
    });
}

function getFoodList(callback) {
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) return console.log(err);
        //  console.log(URL);
       // var db = client.db(dbName);
        db.collection("food").find({}).toArray(function (err, result) {
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

function updateStatus(data, callback) {
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) return console.log(err);
        //  console.log(URL);
      //  var db = client.db(dbName);
        db.collection("food").findOneAndUpdate({
            _id: ObjectID(data._id)
        }, {
            $inc: {
                "created-till-now": 1
            }
        }, function (err, data) {
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
    insertFoodItem: insertFoodItem,
    getFoodList: getFoodList,
    updateStatus: updateStatus
}

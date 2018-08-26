var express = require('express');
var app = express();
var server = require('http').createServer(app);
//var io = require('socket.io')(server);
var mongoConnection = require('./mongoConnection');
var wallet = require('./wallet.js');
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
//app.use(express.static(__dirname + '/node_modules'));
//var io = require('socket.io').listen(3000);
// io.on('connection', function (client) {});
// io.listen(90);
//configure socket
// var WS = require("ws");
// var WSS = new WS.Server({
//     port: 90
// });



//creating apis
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});
console.log("process.env.PORT", process.env.PORT);
server.listen(8080);


//params username, password
app.post('/api/insertUsers', function (req, res) {
    console.log("inside");
    mongoConnection.insertUsers(req.body, function (data) {
        res.json(data);
    });
});


app.post('/api/addCryptoCurrency', function (req, res) {
    wallet.addCryptoCurrency(req.body,function (data) {
        res.json(data);
    });
});
app.post('/api/getUsers', function (req, res) {
    mongoConnection.getUsers(function (data) {
        res.json(data);
    });
});
app.post('/api/transfer', function (req, res) {
    wallet.transfer(function (data) {
        res.json(data);
    });
});
//getUsers
app.post('/api/updateStatus', function (req, res) {
    mongoConnection.updateStatus(req.body, function (data) {
        res.json(data);
        mongoConnection.getFoodList(function (data) {
            if (!data.err) {
                console.log(">>>>>>>>>", data.data);
                io.emit('foodList', data.data);
            }
        });
    });
});

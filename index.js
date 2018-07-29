var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoConnection = require('./mongoConnection');
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(express.static(__dirname + '/node_modules'));
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
server.listen(9000);



app.post('/api/insertFoodItem', function (req, res) {
    mongoConnection.insertFoodItem(req.body, function (data) {

        res.json(data);
    });
});

app.get('/api/getFoodList', function (req, res) {
    mongoConnection.getFoodList(function (data) {
        res.json(data);
    });
});
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

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var getMetric = require('./src/tweet').getMetric;

app.use(express.static(__dirname + '/../client/app/'));

console.log(__dirname + '/../client/app/');

app.get('/tweet', function (req, res) {
    var data = req.data();
    console.log("we received a tweet:" + data);
    res.send(analyzeTweet(data));
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('tweet', function (msg) {
        console.log('we received a tweet for analysis: ' + msg);
        var metric = getMetric(msg, function (error, metric) {
            if (error) {
                console.log("error receiving metric: " + error);
            }
            socket.emit('tweet analysis', metric);
        });
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('Example app listening at localhost:3000');
});

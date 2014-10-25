var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var analyzeTweet = require('./src/tweet').twice;

app.use(express.static(__dirname + '/public'));

app.get('/tweet', function (req, res) {
    var data = req.data();
    console.log("we received a tweet:" + data);
    res.send(analyzeTweet(data));
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('tweet', function(msg){
        console.log('we received a tweet for analysis: ' + msg);
        var metric = '{ "score": "high" }';
        socket.emit('tweet analysis', metric);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('Example app listening at localhost:3000');
});


var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var getMetric = require('./src/tweet').getMetric;
var getBunteHeadline = require('./src/bunteArticle').getHeadline;

app.use(express.static(__dirname + '/../client/app/'));

console.log(__dirname + '/../client/app/');

app.get('/tweet', function (req, res) {
    var data = req.data();
    console.log("we received a tweet:" + data);
    res.send(analyzeTweet(data));
});

io.on('connection', function (socket) {
    console.log('a user connected');

    var emitRelatedTags = function (error, tags) {
        console.log('related tags');
        socket.emit('related tags', tags);
    };

    var emitRelatedUsers = function (error, users) {
        socket.emit('related users', users);
    };

    socket.on('tweet', function (msg) {
        console.log('we received a tweet for analysis: ' + msg);
        getMetric(msg, emitRelatedTags, emitRelatedUsers);

        getBunteHeadline(msg, function(error, headline) {
           if (error) {
               console.log("error pulling Article from Bunte");
           } else {
               socket.emit('bunte', headline);
           }
        });
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('Example app listening at localhost:3000');
});

var express = require('express');
var calculator = require('./src/tweet').twice;
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use(express.static(__dirname + '/public'));

app.get('/tweet', function(req, res) {
    res.send(calculator());
});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
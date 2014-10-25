var http = require('http');

exports.getAnalysis = function(tweet, next) {

    http.get("http://127.0.0.1:5000/", function (res) {
        res.on('data', function (chunk) {
            next(null, chunk.toString());
        });

    }).on('error', function (e) {
        console.log("Got error: " + e.message);
        next(error);
    });
};
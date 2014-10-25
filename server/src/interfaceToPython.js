var http = require('http');

exports.getAnalysis = function (tweet, next) {

    var options = {
        hostname: 'localhost',
        port: 5000,
        path: '/relatedHashtags',
        method: 'POST'
    };

    http.get(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function () {
            next(null, chunk.toString());
        })

    }).on('error', function (e) {
        console.log("Got error: " + e.message);
        next(e);
    });
};
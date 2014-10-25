var http = require('http');


exports.relatedTags = function (hashTag, next) {
    var postData = JSON.stringify({"term": hashTag});
    var options = {
        hostname: 'localhost',
        port: 5000,
        path: '/relatedhashtags',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };

    var req = http.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function () {
            var result = JSON.parse(data)["terms"];
            // leave out first result because it is the hashTag
            next(null, [result[1], result[2], result[3]]);
        })

    }).on('error', function (e) {
        console.log("Got error when trying to get related Hashtags: " + e.message);
        next(e);
    });

    req.write(postData);
    req.end();
};

exports.getAnalysis = function (hashtag, next) {

    var postData = JSON.stringify({"term": hashtag});
    var options = {
        hostname: 'localhost',
        port: 5000,
        path: '/relatedhashtags',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };

    var req = http.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function () {
            next(null, data);
        })

    }).on('error', function (e) {
        console.log("Got error when trying to communicate with Flask: " + e.message);
        next(e);
    });

    req.write(postData);
    req.end();
};
var http = require('http');

var sendRequest = function (postData, path, next) {
    var options = {
        hostname: 'localhost',
        port: 5000,
        path: path,
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
        next(e);
    });

    req.write(postData);
    req.end();
};

exports.relatedTags = function (hashTag, next) {
    var postData = JSON.stringify({"term": hashTag});
    var path = '/relatedHashtags';
    sendRequest(postData, path, next);
};

exports.relatedUsers = function (hashTag, next) {
    var postData = JSON.stringify({"term": hashTag});
    var path = '/relatedUsers';
    sendRequest(postData, path, next);
};

exports.relatedWords = function (hashTag, next) {
    var postData = JSON.stringify({"term": hashTag});
    var path = '/relatedWords';
    sendRequest(postData, path, next);
};


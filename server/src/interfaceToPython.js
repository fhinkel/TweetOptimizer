var http = require('http');

var filterFirstThreeResults = function (data, next) {
    var result = JSON.parse(data)["terms"];
    // leave out first result because it is the hashTag
    next(null, [result[1]["tag"], result[2], result[3]]);
};

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
            next(data);
        });

    }).on('error', function (e) {
        next(e);
    });

    req.write(postData);
    req.end();
};

exports.relatedTags = function (hashTag, next) {
    var postData = JSON.stringify({"term": hashTag});
    var path = '/relatedHashtags';
    var nextWithFilter = function(data) {
       filterFirstThreeResults(data, next);
    };
    sendRequest(postData, path, nextWithFilter);
};

exports.relatedUsers = function (hashTag, next) {
    var postData = JSON.stringify({"term": hashTag});
    var path = '/relatedUsers';
    var nextWithFilter = function(data) {
        filterFirstThreeResults(data, next);
    };
    sendRequest(postData, path, nextWithFilter);
};

exports.relatedWords = function (hashTag, next) {
    var postData = JSON.stringify({"term": hashTag});
    var path = '/relatedWords';
    var nextWithFilter = function(data) {
        filterFirstThreeResults(data, next);
    };
    sendRequest(postData, path, nextWithFilter);
};

exports.sendRequest = sendRequest;

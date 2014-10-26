var http = require('http');

// requests data from data crawler
var crawler = function () {
    var filterFirstThreeResults = function (data, next) {
        var result = JSON.parse(data);
        next(null, [result[0], result[1], result[2]]);
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

    var relatedTags = function (hashTag, next) {
        var postData = JSON.stringify({"term": hashTag});
        var path = '/relatedHashtags';
        var nextWithFilter = function (data) {
            filterFirstThreeResults(data, next);
        };
        sendRequest(postData, path, nextWithFilter);
    };

    var relatedUsers = function (hashTag, next) {
        var postData = JSON.stringify({"term": hashTag});
        var path = '/relatedUsers';
        var nextWithFilter = function (data) {
            filterFirstThreeResults(data, next);
        };
        sendRequest(postData, path, nextWithFilter);
    };

    var relatedWords = function (hashTag, next) {
        var postData = JSON.stringify({"term": hashTag});
        var path = '/relatedWords';
        var nextWithFilter = function (data) {
            filterFirstThreeResults(data, next);
        };
        sendRequest(postData, path, nextWithFilter);
    };

    return {
        sendRequest: sendRequest,
        filterFirstThreeResults: filterFirstThreeResults,
        relatedTags: relatedTags,
        relatedUsers: relatedUsers,
        relatedWords: relatedWords
    };
};

module.exports = crawler();


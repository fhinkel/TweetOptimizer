var http = require('http');

// requests data from data crawler
var crawler = function () {
    var filterFirstThreeResults = function (data, n, next) {
        var result = JSON.parse(data);
        var results = [];
        var upToN = Math.min(result.length, n);
        for (var i = 0; i < upToN; i = i + 1) {
            results.push(result[i]);
        }
        next(null, results);
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
            filterFirstThreeResults(data, 3, next);
        };
        sendRequest(postData, path, nextWithFilter);
    };

    var relatedUsers = function (hashTag, next) {
        var postData = JSON.stringify({"term": hashTag});
        var path = '/relatedUsers';
        var nextWithFilter = function (data) {
            var addImage = function (error, data) {
                data[0].imageUrl = "https://pbs.twimg.com/profile_images/1195885497/yo_400x400.JPG";
                for (var i = 1; i < data.length; i = i + 1) {
                    data[i].imageUrl = "https://pbs.twimg.com/profile_images/461031157157462016/3nZogZZ9_400x400.png";
                }
                next(null, data);
            };
            filterFirstThreeResults(data, 3, addImage);
        };
        sendRequest(postData, path, nextWithFilter);
    };

    var relatedWords = function (hashTag, next) {
        var postData = JSON.stringify({"term": hashTag});
        var path = '/relatedWords';
        var nextWithFilter = function (data) {
            filterFirstThreeResults(data, 3, next);
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


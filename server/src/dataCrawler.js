var async = require('async');
var http = require('http');
var Twit = require('twit');

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

    var T = new Twit({
        consumer_key:        'dA6iFIGGXCfmPtoaUriIp6IBU',
        consumer_secret:     'nOjzznhq0b0i072iGFjdV7mHUS6BLkdw0lbFLukz2DznjXB4Yy',
        access_token:        '1959149348-1oocSc7VSePCMgo5bMPhsIUMigPE10hCEVrqyZt',
        access_token_secret: 'mrffUYhOzknQquOhC2JVYZetQMZt8vo20B6J2hIFKwSC9'
    });

    var imgCache = {};
    // caching results to reduce the # of calls - there's a limit of 180 calls per 15m
    var getTwitterDetails = function (user, next) {
        var currTag = user.tag.substring(1); // remove leading @
        if (!imgCache[currTag]) {
            T.get('users/show', { screen_name: currTag },  function (err, data, response) {
                if (err) {
                    user.imageUrl = null;
                    user.fullName = null;
                    user.profileLink = null;
                    return next(null, user);
                } else {
                    imgCache[currTag] = {
                        imageUrl: data.profile_image_url,
                        fullName: data.name,
                        profileLink: 'https://twitter.com/' + currTag
                    };
                    user.imageUrl = imgCache[currTag].imageUrl;
                    user.fullName = imgCache[currTag].fullName;
                    user.profileLink = imgCache[currTag].profileLink;
                    return next(null, user);
                }
            });
        } else {
            user.imageUrl = imgCache[currTag].imageUrl;
            user.fullName = imgCache[currTag].fullName;
            user.profileLink = imgCache[currTag].profileLink;
            return next(null, user);
        }
    };

    var relatedUsers = function (hashTag, next) {
        var postData = JSON.stringify({"term": hashTag});
        var path = '/relatedUsers';
        var nextWithFilter = function (data) {
            var users = JSON.parse(data);
            users = users.splice(0, 3); // get first 3 users
            async.map(users, getTwitterDetails, function (err, enrichedUsers) {
                // no error handling #yolo #ebola
                console.log(enrichedUsers);
                return next(null, enrichedUsers);
            });
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


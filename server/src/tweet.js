var relatedTags = require('./interfaceToPython').relatedTags;
var relatedUsers = require('./interfaceToPython').relatedUsers;
var relatedWords = require('./interfaceToPython').relatedWords;

var regex = /\S*#(?:\[[^\]]+\]|\S+)/gi;
var getHashTags = function (tweet) {
    var hashtags = [];
    var resultTemp;
    // push all matching hashtags to an array
    while ((resultArray = regex.exec(tweet)) !== null) {
        hashtags.push(resultArray[0]);
    }
    regex.lastIndex = 0; // resets it
    return hashtags;
};

var getRelated = function (specificTag, relatedSomething, next) {
    relatedSomething(specificTag, function (error, response) {
        if (error) {
            console.log('Getting ' + relatedSomething + ' failed.' + error);
            return;
        }

        console.log("WE REACHED tweet.js#getRelated!");
        var result = {
            hashTag: specificTag,
            related: response.slice(0,3)
        };
        next(null, JSON.stringify(result));
    });
};

exports.getMetric = function (tweet, nextTags, nextUsers, nextWords) {
    var hashTags = getHashTags(tweet);
    for (var i = 0; i < hashTags.length; i++) {
        var tag = hashTags[i];

        getRelated(tag, relatedTags, nextTags);
        getRelated(tag, relatedUsers, nextUsers);
        getRelated(tag, relatedWords, nextWords);
    }
};

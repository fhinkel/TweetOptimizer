
var getAnalysisForTweetsFromCrawler = require('./interfaceToPython').getAnalysis;
var relatedTags = require('./interfaceToPython').relatedTags;
var relatedUsers = require('./interfaceToPython').relatedUsers;

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

exports.getMetric = function (tweet, nextTags, nextUsers, nextWords) {
    var hashTags = getHashTags(tweet);
    for (var i = 0; i < hashTags.length; i++) {
        var tag = hashTags[i];

        relatedTags(tag, function(error, response) {
            if (error) {
                console.log('Getting related tags failed.' + error);
                return;
            }
            var result = {
                hashTag: tag,
                related: response
            };
            nextTags(null, JSON.stringify(result));
        });

        relatedUsers(tag, function(error, response) {
            if (error) {
                console.log('Getting related users failed.' + error);
                return;
            }
            var result = {
                hashTag: tag,
                related: response
            };
            nextUsers(null, JSON.stringify(result));
        });
    }
};

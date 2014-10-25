var magicNumber = 42;

var getAnalysisForTweetsFromCrawler = require('./interfaceToPython').getAnalysis;

exports.twice = function () {
    return (magicNumber * 2).toString();
};

var regex = /\S*#(?:\[[^\]]+\]|\S+)/gi;
getHashTags = function (tweet) {
    var hashtags = [];
    var resultTemp;
    // push all matching hashtags to an array
    while ((resultArray = regex.exec(tweet)) !== null) {
        hashtags.push(resultArray[0]);
    }
    regex.lastIndex = 0; // resets it
    return hashtags;
};

exports.getMetric = function (tweet, next) {


    var res = getAnalysisForTweetsFromCrawler(tweet, function (error, response) {
        if (error) {
            console.log('Connection to python interface failed.');
            next(error);
        }

        var hashtags = getHashTags(tweet);
        var alternatives = ["Brigitte", "hackday", "HuffingtonPost"];
        var trends = [
            [45, 50, 30, 30, 30, 40, 50, 66, 73, 80, 80, 82, 79],
            [80, 75, 60, 40, 30, 23, 20, 18, 25, 22, 24, 19, 22],
            [45, 50, 30, 30, 30, 40, 50, 66, 30, 33, 29, 28, 12]
        ];
        var result = {
            hashtags: {}
        };

        for (var i = 0; i < hashtags.length; i++) {
            var tag = hashtags[i];
            result.hashtags[tag] = {
                score: "40",
                alternative: alternatives[i],
                trend: trends[i]
            }

        }
        next(null, JSON.stringify(result));
    });
};

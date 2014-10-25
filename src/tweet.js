var magicNumber = 42;

exports.twice = function () {
    return (magicNumber * 2).toString();
};

getHashTags = function(tweet) {
    return ['bunte', 'hackathon', 'burda'];
};

exports.getMetric = function (tweet) {
    var hashtags = getHashTags(tweet);

    var alternatives = ["Brigitte", "hackday", "HuffingtonPost"];
    var trends = [
        [45,50,30,30,30,40,50,66,73,80,80,82,79],
        [80,75,60,40,30,23,20,18,25,22,24,19,22],
        [45,50,30,30,30,40,50,66,30,33,29,28,12]
    ];

    var result = {};

    for (var i = 0; i < hashtags.length; i++) {
        var tag = hashtags[i];
        result[tag] = {
            score: "40",
            alternative: alternatives[i],
            trend: trends[i]
        }

    }
    return JSON.stringify(result);
};


var getBunteData = require('./interfaceToBunte').getAnalysis;

var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
String.prototype.trim = function () {
  return this.replace(rtrim, "");
}

// seems to always include an empty word -> doesn't matter because it won't
// really affect computeSimilarity
var tokenize = function(string) {
	return string.replace( /\n/g, " " ).split( " " );
}

// computes the # of exact word matches from the tweet and headlines
var computeSimilarity = function (tweetTokens, headline, subheadline) {
	similarity = 0;
	var headlineTokens = tokenize(headline.trim());
	var subheadlineTokens = tokenize(subheadline.trim());

	var currToken;
	for (var i = 0; i < tweetTokens.length; i++) {
		currToken = tweetTokens[i];

		for (var j = 0; j < headlineTokens.length; j++) {
			if (currToken.toLowerCase() === headlineTokens[j].toLowerCase()) {
				similarity++;
			}
		};

		for (var j = 0; j < subheadlineTokens.length; j++) {
			if (currToken.toLowerCase() === subheadlineTokens[j].toLowerCase()) {
				similarity++;
			}
		};
	};
	return similarity;
}

exports.getHeadlines = function(tweet, next) {
    var headline = "Wetten, dass..?";
    var title = "Schlechteste Quote aller Zeiten!";

    var headlines = [];

    var tweetTokens = tweet.replace(/\n/g, " " ).split( " " );

    getBunteData(function(error, data) {
    	var articles = data.articleArray;

    	var currArticle, currHeadline, currSubheadline, currSimilarity, newItem;
    	for (var i = 0; i < articles.length; i++) {
    		currArticle = articles[i];
    		currHeadline = currArticle.headlineText;
    		currSubheadline = currArticle.title;
    		currSimilarity = computeSimilarity(tweetTokens, currHeadline, currSubheadline);

    		newItem = {
    			headline: currHeadline,
    			subheadline: currSubheadline,
    			similarity: similarity,
    			id: currArticle.articleID
    		}

    		if (similarity == 0) {
    			continue;
    		}

    		// insert new item into headlines w/ descending similarity
    		if (headlines.length == 0) {
    			headlines.push(newItem);
    		} else {
	    		for (var j = 0; j < headlines.length; j++) {
	    			if (currSimilarity < headlines[j].similarity
	    				&& j+1 != headlines.length) {
	    				continue;
	    			} else {
	    				headlines.splice(j, 0, newItem);
	    				break;
	    			}
	    		};
    		}
    	};

    	console.log(headlines);
        next(null, headlines);
    });
};
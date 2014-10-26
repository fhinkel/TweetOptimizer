
var getBunteData = require('./interfaceToBunte').getAnalysis;

var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
String.prototype.trim = function () {
  return this.replace(rtrim, "");
}

// seems to always include an empty word -> doesn't matter because it won't
// really affect computeSimilarity
var tokenize = function(string) {
	return string.replace(/[.,;'"!?]/g, '').replace(/[\n]/g, " ").split(" ");
}

// computes the # of exact word matches from the tweet and headlines
var computeSimilarity = function (tweetTokens, headline, subheadline, shortText) {
	similarity = 0;
	var headlineTokens = tokenize(headline.trim());
	var subheadlineTokens = tokenize(subheadline.trim());
	var shortTextTokens = tokenize(shortText.trim());

	var currToken;
	var stopwords = ['der', 'die', 'das', 'ein', 'eine', 'einer', 'dieser'];
	for (var i = 0; i < tweetTokens.length; i++) {
		currToken = tweetTokens[i];
		if (stopwords.indexOf(currToken) != -1) {
			continue;
		}

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

		for (var j = 0; j < shortTextTokens.length; j++) {
			if (shortTextTokens[j].length < 3) {
				continue;
			} else if (currToken.toLowerCase() === shortTextTokens[j].toLowerCase()) {
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

    	var currArticle, currHeadline, currSubheadline, currSimilarity, 
    	    currShortText, newItem;
    	for (var i = 0; i < articles.length; i++) {
    		currArticle = articles[i];
    		currHeadline = currArticle.headlineText;
    		currSubheadline = currArticle.title;
    		currShortText = currArticle.shortText;
    		currSimilarity = computeSimilarity(tweetTokens, currHeadline, currSubheadline, currShortText);

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
    		var notYetInserted = true;
    		for (var j = 0; j < headlines.length; j++) {
    			if (currSimilarity >= headlines[j].similarity) {
    				headlines.splice(j, 0, newItem);
    				notYetInserted = false;
    				break;
    			} else {
    				continue;
    			}
    		};
    		if (notYetInserted) {
    			headlines.push(newItem);
    		}
    	};

    	console.log(headlines);
        next(null, headlines);
    });
};
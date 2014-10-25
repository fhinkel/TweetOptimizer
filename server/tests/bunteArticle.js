var should = require('should');
var getAnalysis= require('../src/bunteArticle').getHeadline;

describe('tweet', function () {

    it('return a headline', function (next) {
        getAnalysis("tweet", function(error, response) {
            response.should.equal("Wetten, dass..? Schlechteste Quote aller Zeiten!");
            next()
        }) ;
    });
});
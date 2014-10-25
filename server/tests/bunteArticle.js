var should = require('should');
var getAnalysis= require('../src/buteArticle').getHeadline;

describe('tweet', function () {

    it('should return hello World as JSON', function (next) {
        getAnalysis("tweet", function(error, response) {
            response.should.equal('{"hello": "Hello world!"}');
            next()
        }) ;
    });
});
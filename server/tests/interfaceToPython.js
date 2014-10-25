var should = require('should');
var relatedUsers = require('../src/interfaceToPython').relatedUsers;
var relatedTags = require('../src/interfaceToPython').relatedTags;
var relatedWords = require('../src/interfaceToPython').relatedWords;

describe('tweet', function () {

    it('should return the first 3 users', function (next) {
        relatedUsers("#burda", function (error, response) {
            response[0].tag.should.be.equal('@simplymrt');
            next()
        });
    });

    it('should return the first 3 related hash tags', function (next) {
        relatedTags("#burda", function (error, response) {
            JSON.stringify(response[1])
                .should.be.equal("#patterns,#sewing,#antique");
            next()
        });
    });

    it('should return status code 200 for related words', function(next) {
        relatedWords("#burda", function(error, response) {
            response.toString()
                .should.be.equal("#patterns,#sewing,mai");
        });
       next();
    });
});

var should = require('should');
var relatedUsers = require('../src/interfaceToPython').relatedUsers;
var relatedTags = require('../src/interfaceToPython').relatedTags;

describe('tweet', function () {

    it('should return the first 3 users', function (next) {
        relatedUsers("#burda", function (error, response) {
            response.toString()
                .should.be.equal("@princesandthepe,@ibmbigdata,");
            next()
        });
    });

    it('should return the first 3 related hash tags', function (next) {
        relatedTags("#burda", function (error, response) {
            response.toString()
                .should.be.equal("#patterns,#sewing,#antique");
            next()
        });
    });
});
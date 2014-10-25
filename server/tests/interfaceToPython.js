var should = require('should');
var getAnalysis = require('../src/interfaceToPython').getAnalysis;
var relatedTags = require('../src/interfaceToPython').relatedTags;

describe('tweet', function () {

    it('should return hello World as JSON', function (next) {
        getAnalysis("#burda", function (error, response) {
            response = JSON.parse(response);
            response["terms"].should.containEql('#burda');
            next()
        });
    });

    it('should return the first 3 related hash tags', function (next) {
        relatedTags("#burda", function (error, response) {
            response.toString()
                .should.be.equal(
                ['#kleinanzeigen', '#carrosusados', '#sevende'].toString());
            next()
        });
    });
});
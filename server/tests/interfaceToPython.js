var should = require('should');
var getAnalysis = require('../src/interfaceToPython').getAnalysis;

describe('tweet', function () {

    it('should return hello World as JSON', function (next) {
        getAnalysis("#burda", function (error, response) {
            response = JSON.parse(response);
            response["terms"].should.containEql('#burda');
            next()
        });
    });
});
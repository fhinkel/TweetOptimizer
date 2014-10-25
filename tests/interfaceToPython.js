var should = require('should');
var getAnalysis= require('../src/interfaceToPython').getAnalysis;

describe('tweet', function () {

    it('should return 200', function (next) {
        getAnalysis("tweet", function(error, response) {
           response.should.equal("Hello World!");
           next()
        }) ;
    });
});
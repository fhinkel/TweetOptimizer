var should = require('should');
var getAnalysis= require('../src/interfaceToPython').getAnalysis;

describe('tweet', function () {

    it('should return hello World as JSON', function (next) {
        getAnalysis("tweet", function(error, response) {
           response.should.equal('{"hello": "Hello world!"}');
           next()
        }) ;
    });
});
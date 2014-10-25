var should = require('should');
var getAnalysis= require('../src/interfaceToBunte').getAnalysis;

describe('tweet', function () {

    it('should return hello World as JSON', function (next) {
        getAnalysis("tweet", function(error, response) {
            JSON.stringify(response).should.containEql("articleArray");
            next()
        }) ;
    });
});
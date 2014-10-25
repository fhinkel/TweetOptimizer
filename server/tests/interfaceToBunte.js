var should = require('should');
var getAnalysis= require('../src/interfaceToBunte').getAnalysis;

describe('tweet', function () {

    it('should return data from Bunte', function (next) {
        getAnalysis(function(error, response) {
            JSON.stringify(response).should.containEql("articleArray");
            next()
        }) ;
    });
});
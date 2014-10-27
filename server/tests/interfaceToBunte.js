var should = require('should');
var getAnalysis= require('../src/interfaceToBunte').getAnalysis;

describe('Bunte API', function () {

    it('should return data from Bunte', function (next) {
        getAnalysis(function(error, response) {
            next();
            return; // requires Bunte Api to be up and running
            JSON.stringify(response).should.containEql("articleArray");
            next()
        }) ;
    });
});

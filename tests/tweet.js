var twice = require('../src/tweet').twice;
var getMetric = require('../src/tweet').getMetric;
var should = require('should');

describe('tweet', function () {

    it('should return the magic number twice', function () {
        '84'.should.equal(twice());
    });

    it('should return fake results', function (next) {
        getMetric('her is a tweet with #Fancy #tag', function(error, result) {
            "{\"bunte\":{\"score\":\"40\",\"alternative\":\"Brigitte\",\"trend\":[45,50,30,30,30,40,50,66,73,80,80,82,79]},\"hackathon\":{\"score\":\"40\",\"alternative\":\"hackday\",\"trend\":[80,75,60,40,30,23,20,18,25,22,24,19,22]},\"burda\":{\"score\":\"40\",\"alternative\":\"HuffingtonPost\",\"trend\":[45,50,30,30,30,40,50,66,30,33,29,28,12]}}"
                .should.equal(result);
            next();
        });

    });


});
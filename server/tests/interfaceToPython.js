var should = require('should');
var relatedUsers = require('../src/interfaceToPython').relatedUsers;
var relatedTags = require('../src/interfaceToPython').relatedTags;

describe('tweet', function () {

    it('should return the first 3 users', function (next) {
        relatedUsers("#burda", function (error, response) {
            response.toString()
                .should.be.equal(
                ["@einundleipizig","@faz_politik","@t3n"].toString());
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
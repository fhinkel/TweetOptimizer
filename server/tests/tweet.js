var getMetric = require('../src/tweet').getMetric;
var should = require('should');

describe('tweet', function () {

    it('should calculate related things', function (next) {
        getMetric('#burda', function (error, result) {
            result.should.equal("{\"hashTag\":\"#burda\",\"related\":[\"#patterns\",\"#sewing\",\"#antique\"]}");
            next();
        });
    });


});

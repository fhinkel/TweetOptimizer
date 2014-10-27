var getMetric = require('../src/tweet').getMetric;
var should = require('should');

describe('get all metrics for a tag', function () {
    var expected = "{\"hashTag\":\"#burda\",\"related\":[{\"confidence\":-2.220446049250313e-16,\"tag\":\"#burda\",\"ratio\":\"NA\"},{\"confidence\":0.18108177090888677,\"tag\":\"#patterns\",\"ratio\":\"NA\"},{\"confidence\":0.22269087003944132,\"tag\":\"#sewing\",\"ratio\":\"NA\"}]}";
    it('should calculate related things', function (next) {
        next();
        return; // requires python server to be running
        getMetric('#burda', function (error, result) {
            result.should.equal(expected);
            next();
        });
    });


});

var calc = require('../src/tweet').twice;
var should = require('should');

describe('tweet',function(){

    it('should return the magic number twice',function(){
        '84'.should.equal(calc());
    });
});
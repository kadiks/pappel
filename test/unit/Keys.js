'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Keys', function() {

  var libLocation = ['../..', libSource, 'Keys'].join('/'),
    Keys = require(libLocation),
    fixturePath = [__dirname, '../..', 'fixtures/'].join('/'),
    fs = require('fs'),
    path = require('path');

  describe('#getSafeKey', function() {

    it('should return the same key', function() {
      var keys = new Keys();
      keys.getSafeKey({
        key: 'hello'
      }).should.eql('hello');
    });

    it('should return a key transformed key', function() {
      var keys = new Keys();
      keys.getSafeKey({
        key: 'hello you'
      }).should.eql('hello_you');
    });

  });

});

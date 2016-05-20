'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Vars', function() {

  var libLocation = ['../..', libSource, 'Vars'].join('/'),
    Vars = require(libLocation),
    fixturePath = [__dirname, '../..', 'fixtures/'].join('/'),
    fs = require('fs'),
    path = require('path');

  describe('#transformAnonymousStrings2Pappel', function() {

    it('should return a Pappel variable from Strings', function() {
      var vars = new Vars();
      vars.transformAnonymousStrings2Pappel({
        str: '%@'
      }).should.eql('${$1}');
    });

    it('should return 2 Pappel variables from Strings', function() {
      var vars = new Vars();
      vars.transformAnonymousStrings2Pappel({
        str: '%@ %@'
      }).should.eql('${$1} ${$2}');
    });

    it('should return a Pappel typed variables from Strings', function() {
      var vars = new Vars();
      vars.transformAnonymousStrings2Pappel({
        str: '%@s'
      }).should.eql('${$1s}');
    });

  });

  describe('#transformAnonymousAndroid2Pappel', function() {

    it('should return a Pappel variable from Android', function() {
      var vars = new Vars();
      vars.transformAnonymousAndroid2Pappel({
        str: '%1$s'
      }).should.eql('${$1s}');
    });

    it('should return 2 Pappel variables from Android', function() {
      var vars = new Vars();
      vars.transformAnonymousAndroid2Pappel({
        str: '%1$s %2$s'
      }).should.eql('${$1s} ${$2s}');
    });

  });

  describe('#transformAnonymousPappel2Strings', function() {
    it('should return a String formatted variable', function() {
      var vars = new Vars();
      vars.transformAnonymousPappel2Strings({
        str: '${$1}'
      }).should.eql('%@');
    });
    it('should return 2 String formatted variables', function() {
      var vars = new Vars();
      vars.transformAnonymousPappel2Strings({
        str: '${$1} ${$2}'
      }).should.eql('%@ %@');
    });
    it('should return a String formatted typed variable', function() {
      var vars = new Vars();
      vars.transformAnonymousPappel2Strings({
        str: '${$1s}'
      }).should.eql('%@s');
    });
  });

  describe('#transformAnonymousPappel2ReactNativeLocalization', function() {
    it('should return a RNLoc formatted variable', function() {
      var vars = new Vars();
      vars.transformAnonymousPappel2ReactNativeLocalization({
        str: '${$1}'
      }).should.eql('{0}');
    });
    it('should return 2 RNLoc formatted variables', function() {
      var vars = new Vars();
      vars.transformAnonymousPappel2ReactNativeLocalization({
        str: '${$1} ${$2}'
      }).should.eql('{0} {1}');
    });
    it('should return a RNLoc formatted non-typed variable', function() {
      var vars = new Vars();
      vars.transformAnonymousPappel2ReactNativeLocalization({
        str: '${$1s}'
      }).should.eql('{0}');
    });
  });

});

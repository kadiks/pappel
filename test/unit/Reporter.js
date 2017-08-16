'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Keys', function() {

  var libLocation = ['../..', libSource, 'index'].join('/'),
    Pappel = require(libLocation),
    Reporter = Pappel.Reporter,
    fixturePath = [__dirname, '../..', 'fixtures/'].join('/'),
    fs = require('fs'),
    path = require('path');

  describe('#add', function() {

    it('should add a new message to the reporter', function() {
      var reporter = new Reporter();
      reporter.add('E_FORMAT', {
        format : 'AndroidXML',
        errMsg : 'ERR!!!'
      });
      reporter.reports.length.should.eql(1);
    });

    it('should not add a new message if key is unknown', function() {
      var reporter = new Reporter();
      reporter.add('bla bla', {
        format : 'AndroidXML',
        errMsg : 'ERR!!!'
      });
      reporter.reports.length.should.eql(0);
    });
  });

  describe('#buildReport', function() {

    it('should build a E_FORMAT report', function() {
      var reporter = new Reporter();
      reporter.buildReport({
        key : 'E_FORMAT',
        parameters : {
          format : 'AndroidXML',
          errMsg : 'ERR!!!'
        }
      }).should.eql({
        type : 'ERROR',
        key : 'FORMAT',
        parameters : {
          format : 'AndroidXML',
          errMsg : 'ERR!!!'
        }
      });
    });

    it('should build an incomplete E_FORMAT report', function() {
      var reporter = new Reporter();
      reporter.buildReport({
        key : 'E_FORMAT',
        parameters : {
          format : 'AndroidXML'
        }
      }).should.eql({
        type : 'ERROR',
        key : 'FORMAT',
        parameters : {
          format : 'AndroidXML',
          errMsg : null
        }
      });
    });

  });

});

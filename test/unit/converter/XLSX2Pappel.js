'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('XLSX2Pappel', function() {

  var libLocation = ['../../..', libSource, 'converter/XLSX2Pappel'].join('/'),
    Converter = require(libLocation),
    fixturePath = [__dirname, '../..', 'fixtures/'].join('/'),
    fs = require('fs'),
    path = require('path'),
    XLSX = require('xlsx');

  describe('#convert', function() {

    it('should convert a XLSX to Pappel format', function() {
      var conv = new Converter();
      var inputPath = path.normalize(fixturePath + 'XLSX1.xlsx');
      var workbook = XLSX.readFile(inputPath);
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.convert({
        workbook: workbook
      }).should.eql({
        'hello': {
          'fr': 'Bonjour !',
          'en': 'Hello!'
        }
      });

    });

    it('should convert a XLSX with Keys transformer to Pappel format', function() {
      var conv = new Converter();
      var inputPath = path.normalize(fixturePath + 'XLSX2.xlsx');
      var workbook = XLSX.readFile(inputPath);
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.convert({
        workbook: workbook
      }).should.eql({
        'hello': {
          'fr': 'Bonjour !',
          'en': 'Hello!'
        },
        'hello_you': {
          'fr': 'Bonjour toi !',
          'en': 'Hello you!'
        }
      });

    });

  });

});

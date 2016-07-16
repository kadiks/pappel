'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Pappel.Importer.XLSX', function() {

  var libLocation = ['../../..', libSource, 'index'].join('/'),
    Pappel = require(libLocation),
    Converter = Pappel.Importer.XLSX,
    fixturePath = [__dirname, '../..', 'fixtures/'].join('/'),
    fs = require('fs'),
    path = require('path'),
    XLSX = require('xlsx');

  describe('#convert', function() {

    it('should convert a XLSX to Pappel format', function() {
      var conv = new Converter();
      var inputPath = path.normalize(fixturePath + 'XLSX1.xlsx');
      var workbook = XLSX.readFile(inputPath);
      //var buf = fs.readFileSync(inputPath, 'utf8');
      //console.log('XLSX2PappelTest#convert input');
      conv.convert({
        input: workbook
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
        input: workbook
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

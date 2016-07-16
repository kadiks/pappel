'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Pappel.Importer.XLIFF', function() {

  var libLocation = ['../../..', libSource, 'index'].join('/'),
    Pappel = require(libLocation),
    Converter = Pappel.Importer.XLIFF,
    fixturePath = [__dirname, '../..', 'fixtures/'].join('/'),
    fs = require('fs'),
    path = require('path'),
    XLSX = require('xlsx');

  describe('#convert', function() {

    it('should convert a XLIFF to Pappel format', function() {
      var conv = new Converter();
      var inputPath = path.normalize(fixturePath + 'strings1.xlf');
      var xml = fs.readFileSync(inputPath, 'utf8');
      conv.convert({
        input: xml
      }).should.eql({
        'hello': {
          'en': 'Hello!'
        },
        'hello_you': {
          'en': 'Hello you!'
        }
      });
    });

    it('should convert a XLIFF with 2 language to Pappel format', function() {
      var conv = new Converter();
      var inputPath = path.normalize(fixturePath + 'strings2.xlf');
      var xml = fs.readFileSync(inputPath, 'utf8');
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.convert({
        input: xml
      }).should.eql({
        'hello': {
          'en': 'Hello!',
          'fr' : 'Bonjour !'
        },
        'hello_you': {
          'en': 'Hello you!',
          'fr' : 'Bonjour toi !'
        }
      });
    });

  });

});

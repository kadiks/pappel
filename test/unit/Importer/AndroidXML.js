'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Pappel.Importer.AndroidXML', function() {

  var libLocation = ['../../..', libSource, 'index'].join('/'),
    Pappel = require(libLocation),
    Converter = Pappel.Importer.AndroidXML,
    fixturePath = [__dirname, '../..', 'fixtures/'].join('/'),
    fs = require('fs'),
    path = require('path'),
    XLSX = require('xlsx');

  describe('#convert', function() {

    it('should convert a AndroidXML to Pappel format', function() {
      var conv = new Converter();
      var inputPath = path.normalize(fixturePath + 'strings1.xml');
      var xml = fs.readFileSync(inputPath, 'utf8');
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.convert({
        input: xml,
        language: 'fr'
      }).should.eql({
        'hello': {
          'fr': 'Bonjour !'
        },
        'hello_you': {
          'fr': 'Bonjour toi !'
        }
      });

    });

    it('should convert without the [language] param and default to "en"', function() {
      var conv = new Converter();
      var inputPath = path.normalize(fixturePath + 'strings1.xml');
      var xml = fs.readFileSync(inputPath, 'utf8');
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.convert({
        input: xml
      }).should.eql({
        'hello': {
          'en': 'Bonjour !'
        },
        'hello_you': {
          'en': 'Bonjour toi !'
        }
      });

    });

  });

});

'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Pappel.Importer.Strings', function() {

  var libLocation = ['../../..', libSource, 'index'].join('/'),
    Pappel = require(libLocation),
    Converter = Pappel.Importer.Strings,
    fixturePath = [__dirname, '../..', 'fixtures/'].join('/'),
    fs = require('fs'),
    path = require('path');

  describe('#convert', function() {

    it('should convert a Strings to Pappel format', function() {
      var conv = new Converter();
      var inputPath = path.normalize(fixturePath + 'Localizable1.strings');
      var strings = fs.readFileSync(inputPath, 'utf8');
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.convert({
        input: strings,
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

    it('should convert without [language] param and default to "en"', function() {
      var conv = new Converter();
      var inputPath = path.normalize(fixturePath + 'Localizable1.strings');
      var strings = fs.readFileSync(inputPath, 'utf8');
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.convert({
        input: strings
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

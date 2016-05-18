'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Pappel2AndroidXML', function() {

  var libLocation = ['../../..', libSource, 'converters/Pappel2AndroidXML'].join('/'),
    Converter = require(libLocation),
    fixturePath = [__dirname, '../..', 'fixtures/'].join('/'),
    fs = require('fs'),
    path = require('path'),
    XLSX = require('xlsx');

  describe('#convert', function() {

    it('should convert the content of one language', function() {
      var conv = new Converter();
      var inputPath = path.normalize(fixturePath + 'pappel1.json');
      var json = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.convert({
        pappel: json,
        language: 'fr'
      }).should.eql('<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<resources>' + "\r\n\t" + '<string name="hello">Bonjour !</string>' + "\r\n" + '</resources>');

    });

  });

});

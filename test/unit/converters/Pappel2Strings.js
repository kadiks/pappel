'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Pappel2Strings', function() {

  var libLocation = ['../../..', libSource, 'converters/Pappel2Strings'].join('/'),
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
      }).should.eql('"hello" = "Bonjour !";' + "\r\n");

    });

  });

});

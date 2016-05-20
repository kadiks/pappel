'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Strings2Pappel', function() {

  var libLocation = ['../../..', libSource, 'converter/Strings2Pappel'].join('/'),
    Converter = require(libLocation),
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
        stringsString: strings,
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

  });

});

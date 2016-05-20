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
      //var inputPath = path.normalize(fixturePath + 'pappel1.json');
      //var json = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.convert({
        pappel: {
          'hello': {
            'en': 'Hello!',
            'fr': 'Bonjour !'
          }
        },
        language: 'fr'
      }).should.eql("\t" + '<string name="hello">Bonjour !</string>' + "\r\n");

    });

    it('should convert the content with a variable', function() {
      var conv = new Converter();
      conv.convert({
        pappel: {
          hello: {
            en: 'Hello!',
            fr: 'Bonjour ${$1s} !'
          }
        },
        language: 'fr'
      }).should.eql("\t" + '<string name="hello">Bonjour %1$s !</string>' + "\r\n");

    });

  });

  describe('#transformString', function() {

    it('should change the Pappel variable', function() {
      var conv = new Converter();
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.transformString({
        str: 'Hello ${$1s}!'
      }).should.eql('Hello %1$s!');

    });
  });

  describe('#wrapContent', function() {

    it('should wrap the content', function() {
      var conv = new Converter();
      var content = "\t" + '<string name="hello">Bonjour !</string>' + "\r\n";
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.wrapContent({
        content: content
      }).should.eql('<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<resources>' + "\r\n" + content + '</resources>');

    });

  });

});

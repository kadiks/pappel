'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Exporter.AndroidXML', function() {


  var libLocation = ['../../..', libSource, 'index'].join('/'),
    Pappel = require(libLocation),
    Converter = Pappel.Exporter.AndroidXML,
    fixturePath = [__dirname, '../..', 'fixtures/'].join('/'),
    fs = require('fs'),
    path = require('path'),
    XLSX = require('xlsx');

    //console.log('Pappel', Pappel.default.Exporter.AndroidXML);

  describe('#convert', function() {

    it('should convert the content of one language', function() {

      var conv = new Converter();
      //var inputPath = path.normalize(fixturePath + 'pappel1.json');
      //var json = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.convert({
        input: {
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
        input: {
          hello: {
            en: 'Hello!',
            fr: 'Bonjour ${$1s} !'
          }
        },
        language: 'fr'
      }).should.eql("\t" + '<string name="hello">Bonjour %1$s !</string>' + "\r\n");

    });

    it('should convert the content without the language parameter', function() {
      var conv = new Converter();
      //var inputPath = path.normalize(fixturePath + 'pappel1.json');
      //var json = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.convert({
        input: {
          'hello': {
            'en': 'Hello!',
            'fr': 'Bonjour !'
          }
        }
      }).should.eql("\t" + '<string name="hello">Hello!</string>' + "\r\n");

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

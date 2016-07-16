'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Pappel.Exporter.XLIFF2', function() {

  var libLocation = ['../../..', libSource, 'index'].join('/'),
    Pappel = require(libLocation),
    Converter = Pappel.Exporter.XLIFF2,
    fixturePath = [__dirname, '../..', 'fixtures/'].join('/'),
    fs = require('fs'),
    path = require('path'),
    XLSX = require('xlsx');

  describe('#convert', function() {

    it('should convert the content without [language] parameter', function() {
      var conv = new Converter();
      conv.convert({
        input: {
          hello: {
            en: 'Hello!',
            fr: 'Bonjour !'
          }
        }
      }).should.eql("\t\t" +'<unit id="hello">' + "\r\n\t\t\t" + '<segment>' + "\r\n\t\t\t\t" + '<source>Hello!</source>' + "\r\n\t\t\t" + '</segment>' + "\r\n\t\t" + '</unit>' + "\r\n");

    });

    it('should convert the content with a variable', function() {
      var conv = new Converter();
      conv.convert({
        input: {
          hello: {
            en: 'Hello ${$1}!',
            fr: 'Bonjour ${$1} !'
          }
        }
      }).should.eql("\t\t" +'<unit id="hello">' + "\r\n\t\t\t" + '<segment>' + "\r\n\t\t\t\t" + '<source>Hello ${$1}!</source>' + "\r\n\t\t\t" + '</segment>' + "\r\n\t\t" + '</unit>' + "\r\n");
    });
    it('should convert the content of one language', function(){
      var conv = new Converter();
      conv.convert({
        input: {
          hello: {
            en: 'Hello!',
            fr: 'Bonjour !'
          }
        },
        language : 'fr'
      }).should.eql("\t\t" +'<unit id="hello">' + "\r\n\t\t\t" + '<segment>' + "\r\n\t\t\t\t" + '<source>Bonjour !</source>' + "\r\n\t\t\t" + '</segment>' + "\r\n\t\t" + '</unit>' + "\r\n");
    });
  });

  describe('#transformString', function() {

    it('should not change the Pappel variable', function() {
      var conv = new Converter();
      var inputPath = path.normalize(fixturePath + 'pappel1.json');
      var json = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.transformString({
        str: 'Hello ${$1s}!'
      }).should.eql('Hello ${$1s}!');

    });
  });


  describe('#wrapContent', function() {

    it('should convert the content of one language', function() {
      var conv = new Converter(),
        content = "\t\t" +'<unit id="hello">' + "\r\n\t\t\t" + '<segment>' + "\r\n\t\t\t\t" + '<source>Hello!</source>' + "\r\n\t\t\t" + '</segment>' + "\r\n\t\t" + '</unit>' + "\r\n";
      //var inputPath = path.normalize(fixturePath + 'pappel1.json');
      //var json = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.wrapContent({
        content: content
      }).should.eql('<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="en" tool="Pappel.io">'+ "\r\n\t" +'<file>'+ "\r\n" + content + "\r\n\t" +'</file>'+ "\r\n" +'</xliff>');

    });

    it('should convert the content of 2 languages', function() {
      var conv = new Converter({
        language : 'en',
        targetLanguage : 'fr'
      }),
        content = "\t\t" +'<unit id="hello">' + "\r\n\t\t\t" + '<segment>' + "\r\n\t\t\t\t" + '<source>Hello!</source>' + "\r\n\t\t\t" + + "\r\n\t\t\t\t" + '<target>Bonjour !</target>' + "\r\n\t\t\t" + '</segment>' + "\r\n\t\t" + '</unit>' + "\r\n";
      //var inputPath = path.normalize(fixturePath + 'pappel1.json');
      //var json = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.wrapContent({
        content: content
      }).should.eql('<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="en" trgLang="fr" tool="Pappel.io">'+ "\r\n\t" +'<file>'+ "\r\n" + content + "\r\n\t" +'</file>'+ "\r\n" +'</xliff>');

    });

  });

});

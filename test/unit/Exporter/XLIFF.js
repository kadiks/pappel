'use strict';
var
  should = require('should'),
  libSource = process.env.PAPPEL_COV ? 'build-cov' : 'build';

describe('Pappel.Exporter.XLIFF', function() {

  var libLocation = ['../../..', libSource, 'index'].join('/'),
    Pappel = require(libLocation),
    Converter = Pappel.Exporter.XLIFF,
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
      }).should.eql("\t\t\t" +'<trans-unit id="hello">' + "\r\n\t\t\t\t" + '<source xml:lang="en">Hello!</source>' + "\r\n\t\t\t" + '</trans-unit>' + "\r\n");

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
      }).should.eql("\t\t\t" +'<trans-unit id="hello">' + "\r\n\t\t\t\t" + '<source xml:lang="en">Hello ${$1}!</source>' + "\r\n\t\t\t" + '</trans-unit>' + "\r\n");

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
      }).should.eql("\t\t\t" +'<trans-unit id="hello">' + "\r\n\t\t\t\t" + '<source xml:lang="fr">Bonjour !</source>' + "\r\n\t\t\t" + '</trans-unit>' + "\r\n");
    });

    it('should convert the content of 2 languages', function(){
      var conv = new Converter();
      conv.convert({
        input: {
          hello: {
            en: 'Hello!',
            fr: 'Bonjour !'
          }
        },
        language : 'fr',
        targetLanguage : 'en'
      }).should.eql("\t\t\t" +'<trans-unit id="hello">' + "\r\n\t\t\t\t" + '<source xml:lang="fr">Bonjour !</source>' + "\r\n\t\t\t\t" + '<target xml:lang="en">Hello!</target>' + "\r\n\t\t\t" + '</trans-unit>' + "\r\n");
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
        content = "\t\t\t" +'<trans-unit id="hello">' + "\r\n\t\t\t\t" + '<source xml:lang="en">Hello!</source>' + "\r\n\t\t\t" + '</trans-unit>' + "\r\n";
      //var inputPath = path.normalize(fixturePath + 'pappel1.json');
      //var json = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.wrapContent({
        content: content
      }).should.eql('<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<xliff version="1.2">'+ "\r\n\t" +'<file source-language="en" tool="Pappel.io">'+ "\r\n\t\t" +'<body>' + "\r\n" + content + "\t\t" +'</body>'+ "\r\n\t" +'</file>'+ "\r\n" +'</xliff>');

    });

    it('should convert the content of 2 languages', function() {
      var conv = new Converter({
        language : 'en',
        targetLanguage : 'fr'
      }),
        content = "\t\t\t" +'<trans-unit id="hello">' + "\r\n\t\t\t\t" + '<source xml:lang="en">Hello!</source>' + "\r\n\t\t\t" + "\r\n\t\t\t\t" + '<target xml:lang="fr">Bonjour !</source>' + "\r\n\t\t\t" + '</trans-unit>' + "\r\n";
      //var inputPath = path.normalize(fixturePath + 'pappel1.json');
      //var json = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      //console.log('XLSX2PappelTest#convert inputPath', inputPath);
      conv.wrapContent({
        content: content
      }).should.eql('<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<xliff version="1.2">'+ "\r\n\t" +'<file source-language="en" target-language="fr" tool="Pappel.io">'+ "\r\n\t\t" +'<body>' + "\r\n" + content + "\t\t" +'</body>'+ "\r\n\t" +'</file>'+ "\r\n" +'</xliff>');

    });

  });

});

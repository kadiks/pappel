#!/usr/bin/env node

var Pappel = require('../index');
var XLSX = require('xlsx');
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var path = require('path');
var Logger = require('skz-logger');
var logger = new Logger();
var loggerLevel = 8;

var NECESSARY_OPTS = ['input-format', 'input', 'output-file'];
var INPUT_FORMATS = ['xlsx', 'android', 'androidxml', 'ios', 'strings'];
var OUTPUT_FORMATS = ['strings', 'ios', 'android', 'androidxml', 'pappel', 'json', 'react-native-localization'];
var BACK_TO_ROOT_PATH = '/../';


logger.setPrefix({
  prefix: 'Pappel/BIN'
});

if (!isNaN(argv['logger'])) {
  loggerLevel = argv['logger'];
  logger.setLevel({
    level: loggerLevel
  });
}

//console.log(argv);


if (INPUT_FORMATS.indexOf(argv['input-format']) === -1) {
  console.log('The "input-format"', argv['input-format'], 'is not recognized. Use one of the following:', INPUT_FORMATS.join(', '));
  return;
}

if (OUTPUT_FORMATS.indexOf(argv['output-format']) === -1) {
  console.log('The "output-format"', argv['output-format'], 'is not recognized. Use one of the following:', OUTPUT_FORMATS.join(', '));
  return;
}

var pappel = null,
  converter2Pappel = null;

// INPUT

var inputFullPath = __dirname + BACK_TO_ROOT_PATH + argv['input'];
inputFullPath = path.normalize(inputFullPath);

var converterOpts = {
  loggerLevel: loggerLevel
};
var language = argv['lang'] || '';


switch (argv['input-format']) {
  case 'xlsx':
    converter2Pappel = new Pappel.Converter.XLSX2Pappel(converterOpts);
    pappel = converter2Pappel.convert({
      workbook: XLSX.readFile(inputFullPath)
    });
    break;
  case 'android':
  case 'androidxml':
    converter2Pappel = new Pappel.Converter.AndroidXML2Pappel(converterOpts);
    pappel = converter2Pappel.convert({
      xmlString: fs.readFileSync(inputFullPath, 'utf8'),
      language: language
    });
    break;
  case 'ios':
  case 'strings':
    converter2Pappel = new Pappel.Converter.Strings2Pappel(converterOpts);
    pappel = converter2Pappel.convert({
      stringsString: fs.readFileSync(inputFullPath, 'utf8'),
      language: language
    });
    break;
}

logger.debug('pappel:', JSON.stringify(pappel));

// OUTPUT


var
  content = '',
  converterFinal = null,
  outputOpts = {
    pappel: pappel,
    loggerLevel: loggerLevel
  };
switch (argv['output-format']) {
  case 'pappel':
  case 'json':
    content = JSON.stringify(pappel);
    break;
  case 'react-native-localization':
    converterFinal = new Pappel.Converter.Pappel2ReactNativeLocalization();
    content = converterFinal.convert(outputOpts);
    break;
  case 'android':
  case 'androidxml':
    converterFinal = new Pappel.Converter.Pappel2AndroidXML();
    if (argv['lang']) {
      outputOpts.language = argv['lang'];
    }
    content = converterFinal.convert(outputOpts);
    break;
  case 'ios':
  case 'strings':
    converterFinal = new Pappel.Converter.Pappel2Strings();
    if (argv['lang']) {
      outputOpts.language = argv['lang'];
    }
    content = converterFinal.convert(outputOpts);
    break;
}

// SAVE

var outputFullPath = __dirname + BACK_TO_ROOT_PATH + argv['output-dir'] + argv['output-file'];
outputFullPath = path.normalize(outputFullPath);

fs.writeFileSync(outputFullPath, converterFinal.wrapContent({
  content: content
}), 'utf8');

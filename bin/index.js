#!/usr/bin/env node

var Pappel = require('../index');
var XLSX = require('xlsx');
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var path = require('path');
var Logger = require('skz-logger');
var logger = new Logger();

var NECESSARY_OPTS = ['input-format', 'input', 'output-file'];
var INPUT_FORMATS = ['xlsx'];
var OUTPUT_FORMATS = ['strings', 'ios', 'android', 'pappel', 'json', 'react-native-localization'];
var BACK_TO_ROOT_PATH = '/../';


logger.setPrefix({
  prefix: 'Pappel/BIN'
});

if (!isNaN(argv['logger'])) {
  logger.setLevel({
    level: argv['logger']
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

switch (argv['input-format']) {
  case 'xlsx':
    converter2Pappel = new Pappel.Converter.XLSX2Pappel();
    pappel = converter2Pappel.convert({
      workbook: XLSX.readFile(inputFullPath)
    });
    break;
}

logger.debug('pappel:', JSON.stringify(pappel));

// OUTPUT


var
  content = '',
  converterFinal = null,
  outputOpts = {
    pappel: pappel
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

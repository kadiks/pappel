#!/usr/bin/env node

var Pappel = require('../index');
var XLSX = require('xlsx');
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var path = require('path');
var Logger = require('skz-logger');
var logger = new Logger();
var loggerLevel = 8;

var PATH_SEPARATOR = path.sep;
var NECESSARY_OPTS = ['input-format', 'input', 'output-file'];
var INPUT_FORMATS = ['xlsx', 'android', 'androidxml', 'ios', 'strings'];
var OUTPUT_FORMATS = [
  'strings',
  'ios',
  'android',
  'androidxml',
  'pappel',
  'json',
  'react-native-localization'
];
var EXT2FORMAT = {
  'xml' : 'android'
};
var FORMAT2EXT = {
  'android' : 'xml',
  'androidxml' : 'xml',
  'ios' : 'strings',
  'pappel' : 'json',
  'json' : 'json',
  'react-native-localization' : 'js'
};
var ROOT_PATH = process.cwd();

// UTILITY FUNCTIONS
var getDirFormat = function(dir) {
  if (dir.substr(-1, 1) !== PATH_SEPARATOR) {
    dir = dir + PATH_SEPARATOR;
  }
  return dir;
};
var getOutputFile = function(outputFormat) {
  logger.debug('#getOutputFile outputFormat:', outputFormat);
  var ext = outputFormat;
  if (FORMAT2EXT.hasOwnProperty(outputFormat)) {
    ext = FORMAT2EXT[outputFormat];
  }
  return 'Pappel.' + ext;
};
var getPath = function(pathname) {
  if (pathname.substr(0, 1) === PATH_SEPARATOR) {
    return pathname;
  }
  logger.debug('#getPath final pathname:', ROOT_PATH + PATH_SEPARATOR + pathname);
  return path.normalize(ROOT_PATH + PATH_SEPARATOR + pathname);
};

// LOGGER SETUP
logger.setPrefix({
  prefix: 'Pappel/BIN'
});

if (!isNaN(argv['logger'])) {
  loggerLevel = argv['logger'];
  logger.setLevel({
    level: loggerLevel
  });
}

// ARGUMENTS HANDLING

var
  input = argv['input'] || null,
  inputFormat = argv['input-format'] || null,
  outputFormat = argv['output-format'] || null,
  outputDir = argv['output-dir'] || ROOT_PATH,
  outputFile = argv['output-file'] || null
;


if (input === null) {
  console.log('The [input] parameter is required.');
  return;
}

if (outputFormat === null) {
  console.log('The [output-format] parameter is required.');
  return;
}

if (inputFormat === null) {
  logger.debug('argv handling @inputFormat input:', input);
  var ext = path.extname(input);
  ext = ext.replace('.', '');
  ext = ext.toLowerCase();
  inputFormat = ext;
  if (EXT2FORMAT.hasOwnProperty(ext)) {
    inputFormat = EXT2FORMAT[ext];
  }
}
inputFormat = inputFormat.toLowerCase();
outputFormat = outputFormat.toLowerCase();

if (outputDir.substr(-1, 1) !== PATH_SEPARATOR) {
  outputDir = outputDir + PATH_SEPARATOR;
}
if (outputFile === null) {
  outputFile = getOutputFile(outputFormat);
}


if (INPUT_FORMATS.indexOf(inputFormat) === -1) {
  console.log('The [input-format]', inputFormat, 'is not recognized. Use one of the following:', INPUT_FORMATS.join(', '));
  return;
}

if (OUTPUT_FORMATS.indexOf(outputFormat) === -1) {
  console.log('The [output-format]', outputFormat, 'is not recognized. Use one of the following:', OUTPUT_FORMATS.join(', '));
  return;
}

var inputFullPath = getPath(input);
logger.debug('argv handling @inputFullPath:', inputFullPath);
inputFullPath = path.normalize(inputFullPath);

var stats;
try {
  stats = fs.statSync(inputFullPath);
} catch (e) {
  console.log('The [input] does not exist at the following path:', inputFullPath);
  return;
}
//console.log('fs.stats', stats);
//process.exit();


var pappel = null,
  converter2Pappel = null;

var converterOpts = {
  loggerLevel: loggerLevel
};
var language = argv['lang'] || '';


switch (inputFormat) {
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
switch (outputFormat) {
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

var outputFullPath = getPath(getDirFormat(outputDir) + outputFile);
logger.debug('Save outputFullPath:', outputFullPath);
outputFullPath = path.normalize(outputFullPath);

fs.writeFileSync(outputFullPath, converterFinal.wrapContent({
  content: content
}), 'utf8');

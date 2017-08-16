#!/usr/bin/env node
var Pappel = require('../build/index'); // Fix the import for ES6
import XLSX from 'xlsx';
import minimist from 'minimist';
import fs from 'fs';
import path from 'path';
import execshell from 'exec-sh';
import Logger from 'skz-logger';


const argv = minimist(process.argv.slice(2));
const logger = new Logger();

const PATH_SEPARATOR = path.sep;
const INPUT_FORMATS = [
  'xlsx',
  'android',
  'androidxml',
  'ios',
  'strings',
  'xliff',
  'xlf'
];
const OUTPUT_FORMATS = [
  'strings',
  'ios',
  'android',
  'androidxml',
  'pappel',
  'json',
  'react-native-localization',
  'xliff'
];
const EXT2FORMAT = {
  'xml' : 'android',
  'xlf' : 'xliff'
};
const FORMAT2EXT = {
  'android' : 'xml',
  'androidxml' : 'xml',
  'ios' : 'strings',
  'pappel' : 'json',
  'json' : 'json',
  'react-native-localization' : 'js',
  'xliff' : 'xlf'
};
const ROOT_PATH = process.cwd();

var loggerLevel = 8;

// UTILITY FUNCTIONS
var getDirFormat = (dir) => {
  if (dir.substr(-1, 1) !== PATH_SEPARATOR) {
    dir = dir + PATH_SEPARATOR;
  }
  return dir;
}
var getOutputFile = (outputFormat) => {
  logger.debug('#getOutputFile outputFormat:', outputFormat);
  var ext = outputFormat;
  if (FORMAT2EXT.hasOwnProperty(outputFormat)) {
    ext = FORMAT2EXT[outputFormat];
  }
  return 'Pappel.' + ext;
};
var getPath = (pathname) => {
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
  outputFile = argv['output-file'] || null,
  isWatch = argv['w'] ? true : false
;

if (argv['v']) {
  var packageJson = require('../package.json');
  console.log('Pappel v' + packageJson.version);
  process.exit();
}

if (input === null) {
  console.log('The [input] parameter is required.');
  process.exit();
}

if (outputFormat === null) {
  console.log('The [output-format] parameter is required.');
  process.exit();
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
  process.exit();
}

if (OUTPUT_FORMATS.indexOf(outputFormat) === -1) {
  console.log('The [output-format]', outputFormat, 'is not recognized. Use one of the following:', OUTPUT_FORMATS.join(', '));
  process.exit();
}

var inputFullPath = getPath(input);
logger.debug('argv handling @inputFullPath:', inputFullPath);
inputFullPath = path.normalize(inputFullPath);

var stats;
try {
  stats = fs.statSync(inputFullPath);
} catch (e) {
  console.log('The [input] does not exist at the following path:', inputFullPath);
  process.exit();
}

var pappel = null,
  importer = null;

var converterOpts = {
  loggerLevel: loggerLevel
};
var language = argv['lang'] || '';


switch (inputFormat) {
  case 'xlsx':
    importer = new Pappel.Importer.XLSX(converterOpts);
    pappel = importer.convert({
      input: XLSX.readFile(inputFullPath)
    });
    break;
  case 'android':
  case 'androidxml':
    importer = new Pappel.Importer.AndroidXML(converterOpts);
    pappel = importer.convert({
      input: fs.readFileSync(inputFullPath, 'utf8'),
      language: language
    });
    break;
  case 'ios':
  case 'strings':
    importer = new Pappel.Importer.Strings(converterOpts);
    pappel = importer.convert({
      input: fs.readFileSync(inputFullPath, 'utf8'),
      language: language
    });
    break;
  case 'xliff':
    importer = new Pappel.Importer.XLIFF(converterOpts);
    pappel = importer.convert({
      input: fs.readFileSync(inputFullPath, 'utf8')
    });
    break;
}

logger.debug('pappel:', JSON.stringify(pappel));

// OUTPUT


var
  content = '',
  exporter = null,
  outputOpts = {
    input: pappel,
    loggerLevel: loggerLevel
  };
switch (outputFormat) {
  case 'pappel':
  case 'json':
    content = JSON.stringify(pappel);
    break;
  case 'react-native-localization':
    exporter = new Pappel.Exporter.ReactNativeLocalization();
    content = exporter.convert(outputOpts);
    break;
  case 'android':
  case 'androidxml':
    exporter = new Pappel.Exporter.AndroidXML();
    if (argv['lang']) {
      outputOpts.language = argv['lang'];
    }
    content = exporter.convert(outputOpts);
    break;
  case 'ios':
  case 'strings':
    exporter = new Pappel.Exporter.Strings();
    if (argv['lang']) {
      outputOpts.language = argv['lang'];
    }
    content = exporter.convert(outputOpts);
    break;
  case 'xliff':
    exporter = new Pappel.Exporter.XLIFF();
    if (argv['lang']) {
      outputOpts.language = argv['lang'];
    }
    content = exporter.convert(outputOpts);
    break;
}

// SAVE

var outputFullPath = getPath(getDirFormat(outputDir) + outputFile);
logger.debug('Save outputFullPath:', outputFullPath);
outputFullPath = path.normalize(outputFullPath);

fs.writeFileSync(outputFullPath, exporter.wrapContent({
  content: content
}), 'utf8');

if (isWatch) {
  console.log('Pappel is watching o_o');
  fs.watchFile(inputFullPath, () => {
    console.log('Watch update...');
    var cmd = ['pappel'];
    for (var key in argv) {
      if (key !== '_' && key !== 'w') {
        cmd.push('--' + key);
        cmd.push(argv[key]);
      }
    }
    execshell(cmd.join(' '));
  });
}

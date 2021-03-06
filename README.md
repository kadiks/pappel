Pappel
Localization and format conversion tooling

A revival of the Babel tower, for your apps.

---

***Please, tell us about your experience with the library on Twitter [@pappel_io](https://twitter.com/pappel_io)***

---

[![Build status](https://api.travis-ci.org/kadiks/pappel.svg?branch=master)](https://travis-ci.org/kadiks/pappel)
[![Coverage status](https://coveralls.io/repos/github/kadiks/pappel/badge.svg?branch=master)](https://coveralls.io/github/kadiks/pappel?branch=master)

# Installation

```javascript
npm install pappel -g
```
Remove the ```-g``` if you do not plan on using the CLI

# CLI

## Usage

```
pappel --input <path> --output-format <output-format> [--v] [--w] [--input-format <input-format>] [--lang <lang>] [--output-dir <path>] [--output-file <filename.ext>]
```

## Options

- input - [source file path]
- output-format - (pappel|android|ios|xliff|react-native-localization)
- [input-format] - (xlsx|android|ios|xliff)
- [lang=''] - [2 letter ISO code]
- [output-dir='.'] - [output direction path]
- [output-file] - [name of the output file with extension]
- [v] - Version of Pappel
- [w] - Watch your file

## Examples

### Android (xml) 2 iOS (strings)
```
pappel --input strings.xml --output-format ios
```
### iOS (strings) 2 Android (xml)
```
pappel --input Localizable.strings --output-format android
```
### XLSX 2 React Native Localization
```
pappel --input spreadsheet.xlsx --output-format react-native-localization
```
### XLIFF 2 Android (xml)
```
pappel --input translation.xliff --output-format android
```

---

***Please, tell us about your experience with the library on Twitter [@pappel_io](https://twitter.com/pappel_io)***

---

# API

## Examples

### Android (xml) 2 iOS (strings)
```js
var Pappel = require('pappel');

var importer = new Pappel.Importer.AndroidXML();
var xmlString = fs.readFileSync('./strings.xml', 'utf8');
var pappelFormat = importer.convert({
  input : xmlString
});

var exporter = new Pappel.Exporter.Strings();
var content = exporter.convert({
  input: pappelFormat
});
var fileContent = exporter.wrapContent({
  content : content
});
fs.writeFileSync('./Localizable.strings', fileContent, 'utf8');
```

More in the [API docs](http://docs.pappel.io/latest/)

---

***Please, tell us about your experience with the library on Twitter [@pappel_io](https://twitter.com/pappel_io)***

---

# Changelog

## v.0.2.0

### Breaking changes
- Revamped API

- Add the "v" flag
- Watcher option ("w" flag)
- XLIFF (v2.0) converters

## v0.1.3

- XLIFF (v1.2) converters

## v0.1.2

- CLI: Only the parameters [input] & [output-format] become required
- AndroidXML & iOS importer language default to 'en'
- Improved doc

## v0.1.1

- Fix the CLI path

## v0.1.0

- AndroidXML2Pappel
- Strings2Pappel
- XLSX2Pappel
- Pappel2AndroidXML
- Pappel2Strings
- Pappel2ReactNativeLocalization


# Roadmap

- [ ] Add XLIFF2 converter
- [ ] Add SRT converter
- [ ] Add VTT converter
- [ ] Add PHP Array converter

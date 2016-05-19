module.exports = {
  Converter: {
    XLS2Pappel: require('./build/converters/XLSX2Pappel'),
    Pappel2AndroidXML: require('./build/converters/Pappel2AndroidXML'),
    Pappel2Strings: require('./build/converters/Pappel2Strings'),
    Pappel2ReactNativeLocalization: require('./build/converters/Pappel2ReactNativeLocalization')
  },
  Keys: require('./build/Keys')
};

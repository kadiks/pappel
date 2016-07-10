module.exports = {
  Converter: {
    AndroidXML2Pappel: require('./build/converter/AndroidXML2Pappel'),
    Strings2Pappel: require('./build/converter/Strings2Pappel'),
    XLSX2Pappel: require('./build/converter/XLSX2Pappel'),
    XLIFF2Pappel: require('./build/converter/XLIFF2Pappel'),
    Pappel2AndroidXML: require('./build/converter/Pappel2AndroidXML'),
    Pappel2Strings: require('./build/converter/Pappel2Strings'),
    Pappel2ReactNativeLocalization: require('./build/converter/Pappel2ReactNativeLocalization'),
    Pappel2XLIFF: require('./build/converter/Pappel2XLIFF')
  },
  Keys: require('./build/Keys'),
  Vars: require('./build/Vars')
};

module.exports = {
  Converter: {
    XLSX2Pappel: require('./build/converter/XLSX2Pappel'),
    Strings2Pappel: require('./build/converter/Strings2Pappel'),
    AndroidXML2Pappel: require('./build/converter/AndroidXML2Pappel'),
    Pappel2AndroidXML: require('./build/converter/Pappel2AndroidXML'),
    Pappel2Strings: require('./build/converter/Pappel2Strings'),
    Pappel2ReactNativeLocalization: require('./build/converter/Pappel2ReactNativeLocalization')
  },
  Keys: require('./build/Keys'),
  Vars: require('./build/Vars')
};

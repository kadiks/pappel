module.exports = {
  Converter: {
    XLS2Pappel: require('./lib/converters/XLS2Pappel'),
    Pappel2AndroidXML: require('./lib/converters/Pappel2AndroidXML'),
    Pappel2Strings: require('./lib/converters/Pappel2Strings'),
    Pappel2ReactNativeLocalization: require('./lib/converters/Pappel2ReactNativeLocalization')
  },
  Keys: require('./lib/Keys')
};

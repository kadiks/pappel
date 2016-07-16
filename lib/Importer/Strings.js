/**
 * @class Pappel.Importer.Strings
 *
 * @extends Pappel.RootConverter
 */

import Converter from '../RootConverter';
var StringFiles = require('i18n-strings-files');

class Strings extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Importer.Strings'
    });
    this._strings = StringFiles;
  }

  /**
   * @property _xml
   * @private
   */

  convert(params) {
    this._logger.info('>> #convert');
    var
      o = params || {},
      stringsString = o.input || null,
      language = o.language || 'en',
      strings = null,
      pappel = {};

    if (stringsString === null) {
      return null;
    }

    if (language === null) {
      return null;
    }

    strings = this._strings.parse(stringsString);

    /*var inspect = require('util').inspect;
    console.log(inspect(xml, {
      colors: true,
      depth: Infinity
    }));*/

    for (var key in strings) {
      pappel[key] = {};
      pappel[key][language] = strings[key];
    }

    //console.log('Strings2Pappel#convert strings', strings);



    this._logger.info('<< #convert');
    return pappel;
  }

}

export default Strings;

/**
 * @class Pappel.Converter.Strings2Pappel
 *
 * @extends Pappel.Converter.Root
 */

import Converter from './Root';
var Strings = require('i18n-strings-files');

class Strings2Pappel extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Converter.Strings2Pappel'
    });
    this._strings = Strings;
  }

  /**
   * @property _xml
   * @private
   */

  /**
   * @method convert 
   *
   * @param {Object} params
   * @param {Object} params.stringsString
   * @param {String} params.language
   */
  convert(params) {
    this._logger.info('>> #convert');
    var
      o = params || {},
      stringsString = o.stringsString || null,
      language = o.language || null,
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

module.exports = Strings2Pappel;

/**
 * @class Pappel.Converter.Pappel2Strings
 *
 * @extends Pappel.Converter.Root
 */

import Converter from './Root';

class Pappel2Strings extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Converter.Pappel2Strings'
    });
  }

  /**
   * @method convert 
   *
   * @param {Object} params
   * @param {Object} params.pappel
   * @param {String} [params.language='']
   */
  convert(params) {
    this._logger.info('>> #convert');
    var
      o = params || {},
      pappel = o.pappel || null,
      language = o.language || null,

      possibleLanguages = null;

    if (pappel === null) {
      return null;
    }

    possibleLanguages = Object.keys(pappel[Object.keys(pappel)[0]]);

    if (language === null || possibleLanguages.indexOf(language) === -1) {
      language = possibleLanguages[0];
    }

    var file = '';

    for (var key in pappel) {
      file += ['"', key, '" = "', pappel[key][language], '";', "\r\n"].join('');
    }

    this._logger.info('<< #convert');
    return file;

  }

}

module.exports = Pappel2Strings;

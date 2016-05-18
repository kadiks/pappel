/**
 * @class Pappel.Converter.Pappel2AndroidXML
 *
 * @extends Pappel.Converter.Root
 */
import Converter from './Root';

class Pappel2AndroidXML extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Converter.Pappel2AndroidXML'
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
      file += ["\t", '<string name="', key, '">', pappel[key][language], '</string>', "\r\n"].join('');
    }

    file = '<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<resources>' + "\r\n" + file + '</resources>';
    this._logger.info('<< #convert');
    return file;

  }

}

module.exports = Pappel2AndroidXML;

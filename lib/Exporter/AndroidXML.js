/**
 * @class Pappel.Exporter.AndroidXML
 *
 * @extends Pappel.RootConverter
 */
import Converter from '../RootConverter';

class AndroidXML extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Exporter.AndroidXML'
    });
  }

  get contentBoilerplateBefore() {
    return '<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<resources>' + "\r\n";
  }

  get contentBoilerplateAfter() {
    return '</resources>';
  }

  convert(params) {
    this._logger.info('>> #convert');
    var
      o = params || {},
      pappel = o.input || null,
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
      var transformedString = this.transformString({
        str: pappel[key][language]
      });
      file += ["\t", '<string name="', key, '">', transformedString, '</string>', "\r\n"].join('');
    }

    this._logger.info('<< #convert');
    return file;

  }

  /**
   * @method transformString
   *
   * @param {Object} params
   * @param {String} params.str
   */

  transformString(params) {
    this._logger.info('>> #transformString');
    var tStr = this._vars.transformAnonymousPappel2AndroidXML({
      str: params.str
    });
    this._logger.info('<< #transformString');
    return tStr;

  }

}

export default AndroidXML;

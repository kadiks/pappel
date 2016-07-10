/**
 * @class Pappel.Converter.Pappel2XLIFF
 *
 * @extends Pappel.Converter.Root
 */
import Converter from './Root';

class Pappel2XLIFF extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Converter.Pappel2XLIFF'
    });
  }

  get contentBoilerplateBefore() {
    return '<xliff version="1.2">' + "\r\n\t" + '<file source-language="' + this._language + '" tool="Pappel.io">' + "\r\n\t\t" + '<body>' + "\r\n";
  }

  get contentBoilerplateAfter() {
    return "\t\t" + '</body>' + "\r\n\t" + '</file>' + "\r\n" + '</xliff>';
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
      var str = pappel[key][language];
      file += [
        "\t\t\t", '<trans-unit id="', key, '">', "\r\n",
        "\t\t\t\t", '<source xml:lang="', language ,'">', str, '</source>', "\r\n",
        "\t\t\t", '</trans-unit>', "\r\n"
      ].join('');
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
    var tStr = params.str;
    this._logger.info('<< #transformString');
    return tStr;

  }

}

module.exports = Pappel2XLIFF;

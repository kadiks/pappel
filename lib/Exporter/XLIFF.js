/**
 * @class Pappel.Exporter.XLIFF
 *
 * @extends Pappel.RootConverter
 */
import Converter from '../RootConverter';

class XLIFF extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Exporter.XLIFF'
    });
  }

  get contentBoilerplateBefore() {
    var trgLangAttr = '';
    if (this._targetLanguage !== null) {
      trgLangAttr = ' target-language="' + this._targetLanguage + '"';
    }
    return '<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<xliff version="1.2">' + "\r\n\t" + '<file source-language="' + this._language + '"' + trgLangAttr + ' tool="Pappel.io">' + "\r\n\t\t" + '<body>' + "\r\n";
  }

  get contentBoilerplateAfter() {
    return "\t\t" + '</body>' + "\r\n\t" + '</file>' + "\r\n" + '</xliff>';
  }


  convert(params) {
    this._logger.info('>> #convert');
    var
      o = params || {},
      pappel = o.input || null,
      language = o.language || null,
      targetLanguage = o.targetLanguage ? o.targetLanguage : this._targetLanguage || null,

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
      var transUnit = [];
      transUnit.push("\t\t\t", '<trans-unit id="', key, '">', "\r\n");
      transUnit.push("\t\t\t\t", '<source xml:lang="', language ,'">', str, '</source>', "\r\n");
      if (targetLanguage !== null) {
        transUnit.push("\t\t\t\t", '<target xml:lang="', targetLanguage ,'">', pappel[key][targetLanguage], '</target>', "\r\n");
      }
      transUnit.push("\t\t\t", '</trans-unit>', "\r\n");
      file += transUnit.join('');
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

export default XLIFF;

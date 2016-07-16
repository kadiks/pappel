/**
 * @class Pappel.Exporter.XLIFF2
 *
 * @extends Pappel.RootConverter
 */
import Converter from '../RootConverter';

class XLIFF2 extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Exporter.XLIFF2'
    });
  }

  get contentBoilerplateBefore() {
    var trgLangAttr = '';
    if (this._targetLanguage) {
      trgLangAttr = ' trgLang="' + this._targetLanguage + '"';
    }
    return '<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="' + this._language + '"' + trgLangAttr + ' tool="Pappel.io">' + "\r\n\t" + '<file>' + "\r\n";
  }

  get contentBoilerplateAfter() {
    return "\r\n\t" + '</file>' + "\r\n" + '</xliff>';
  }


  convert(params) {
    this._logger.info('>> #convert');
    var
      o = params || {},
      pappel = o.input || null,
      language = o.language ? o.language : this._language || null,
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
      transUnit.push("\t\t", '<unit id="', key, '">', "\r\n");
      transUnit.push("\t\t\t", '<segment>', "\r\n");
      transUnit.push("\t\t\t\t", '<source>', str, '</source>', "\r\n");
      if (targetLanguage !== null) {
        transUnit.push("\t\t\t\t", '<target>', pappel[key][targetLanguage], '</target>', "\r\n");
      }
      transUnit.push("\t\t\t", '</segment>', "\r\n");
      transUnit.push("\t\t", '</unit>', "\r\n");
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

export default XLIFF2;

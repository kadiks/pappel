/**
 * @class Pappel.Converter.Root
 *
 * @uses Pappel.Keys
 * @uses Pappel.Vars
 *
 * @param {Object} params
 * @param {String} [params.language='en']
 * @param {String} [params.targetLanguage='']
 * @param {Number} [params.loggerLevel=8]
 */

import Logger from 'skz-logger';
import Keys from '../Keys';
import Vars from '../Vars';

class Converter {
  constructor(params) {
    var o = params || {},
      language = o.language || null,
      targetLanguage = o.targetLanguage || null;

    this._logger = new Logger();
    this._logger.setPrefix({
      prefix: 'Pappel.Converter.Root'
    });


    this._logger.setLevel({
      level: o.loggerLevel || 8
    });

    this._vars = new Vars(params);

    this._keys = new Keys(params);


    this._language = 'en';
    if (language !== null) {
      this._language = language;
    }
    this._targetLanguage = null;
    if (targetLanguage !== null) {
      this._targetLanguage = targetLanguage;
    }

  }

  /**
   * @property _logger
   * @protected
   */

  /**
   * @property _language Act as [sourceLanguage]
   * @protected
   */

  /**
   * @property _targetLanguage
   * @protected
   */

  /**
   * @property _vars
   * @protected
   */

  /**
   * @method wrapContent Wrap the content of the file with the necessary to validate the format
   *
   * @param {Object} params
   * @param {String} params.content
   */
  wrapContent(params) {
    return this.contentBoilerplateBefore + params.content + this.contentBoilerplateAfter;
  }
}

export default Converter;

/**
 * @class Pappel.Converter.Root
 *
 * @uses Pappel.Keys
 * @uses Pappel.Vars
 *
 * @param {Object} params
 * @param {Number} params.loggerLevel
 */

import Logger from 'skz-logger';
import Keys from '../Keys';
import Vars from '../Vars';

class Converter {
  constructor(params) {
    var o = params || {};

    this._logger = new Logger();
    this._logger.setPrefix({
      prefix: 'Pappel.Converter.Root'
    });


    this._logger.setLevel({
      level: o.loggerLevel || 8
    });

    this._vars = new Vars(params);

    this._keys = new Keys(params);

  }

  /**
   * @property _logger
   * @protected
   */

  /**
   * @property _vars
   * @protected
   */

  /**
   * @method wrapFile Wrap the content of the file with the necessary to validate the format
   *
   * @param {Object} params
   * @param {String} params.content
   */
  wrapContent(params) {
    return this.contentBoilerplateBefore + params.content + this.contentBoilerplateAfter;
  }
}

export default Converter;
/**
 * @class Pappel.Converter.Root
 *
 * @param {Object} params
 * @param {Number} params.loggerLevel
 */

import Logger from 'skz-logger';

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
  }

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

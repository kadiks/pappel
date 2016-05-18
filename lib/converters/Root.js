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
}

export default Converter;

/**
 * @class Pappel.Keys
 *
 * @param {Object} params
 * @param {Number} params.loggerLevel
 */

import Logger from 'skz-logger';

class Keys {

  constructor(params) {
    var o = params || {};

    this._logger = new Logger();
    this._logger.setPrefix({
      prefix: 'Pappel.Keys'
    });


    this._logger.setLevel({
      level: o.loggerLevel || 8
    });
  }

  /**
   * @method getSafeKey
   *
   * @param {Object} params
   * @param {String} params.key
   */
  getSafeKey(params) {
    var o = params || {},
      key = o.key || null,
      safeKey = o.key.replace(' ', '_');

    return safeKey;
  }
}

module.exports = Keys;

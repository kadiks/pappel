/**
 * @class Pappel.Keys
 *
 * @param {Object} params
 * @param {Number} params.loggerLevel
 */
class Keys {
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

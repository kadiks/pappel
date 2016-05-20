/**
 * @class Pappel.Vars
 *
 * @param {Object} params
 * @param {Number} params.loggerLevel
 */

import Logger from 'skz-logger';

class Vars {

  constructor(params) {
    var o = params || {};

    this._logger = new Logger();
    this._logger.setPrefix({
      prefix: 'Pappel.Vars'
    });


    this._logger.setLevel({
      level: o.loggerLevel || 8
    });
  }

  /**
   * @method transformAnonymousAndroid2Pappel
   *
   * @param {Object} params
   * @param {String} params.str
   */
  transformAnonymousAndroid2Pappel(params) {
    var o = params || {},
      str = o.str || null,
      tStr = null,
      regex = /%\d\$\w/g

    tStr = str.replace(regex, (...args) => {
      var
        match = args[0],
        index = match.substring(1, 2),
        suffix = match.substring(match.length - 1, match.length);
      var rep = `\${\$${index}${suffix}}`;
      return rep;
    });

    return tStr;
  }

  /**
   * @method transformAnonymousStrings2Pappel
   *
   * @param {Object} params
   * @param {String} params.str
   */
  transformAnonymousStrings2Pappel(params) {
    var o = params || {},
      str = o.str || null,
      tStr = null,
      regex = /%@\w?/g,
      index = 0;

    tStr = str.replace(regex, (...args) => {
      index++;
      var
        match = args[0],
        suffix = match.substring(match.length - 1, match.length);
      if (match.length === 2) {
        suffix = '';
      }
      var rep = `\${\$${index}${suffix}}`;
      return rep;
    });

    return tStr;
  }

  /**
   * @method transformAnonymousPappel2AndroidXML
   *
   * @param {Object} params
   * @param {String} params.str
   */
  transformAnonymousPappel2AndroidXML(params) {
    var o = params || {},
      str = o.str || null,
      tStr = null,
      regex = /\${\$\d+\w?}/g;

    tStr = str.replace(regex, (...args) => {
      var
        match = args[0],
        index = match.match(/\d+/)[0],
        suffix = '$' + match.substring(match.length - 2, match.length - 1);

      if (!isNaN(suffix)) {
        suffix = '';
      }
      var rep = `%${index}${suffix}`;
      return rep;
    });

    return tStr;
  }

  /**
   * @method transformAnonymousPappel2Strings
   *
   * @param {Object} params
   * @param {String} params.str
   */
  transformAnonymousPappel2Strings(params) {
    var o = params || {},
      str = o.str || null,
      tStr = null,
      regex = /\${\$\d+\w?}/g;

    tStr = str.replace(regex, (...args) => {
      var
        match = args[0],
        suffix = match.substring(match.length - 2, match.length - 1);
      if (!isNaN(suffix)) {
        suffix = '';
      }
      var rep = '%@' + suffix;
      return rep;
    });

    return tStr;
  }

  /**
   * @method transformAnonymousPappel2Strings
   *
   * @param {Object} params
   * @param {String} params.str
   */
  transformAnonymousPappel2ReactNativeLocalization(params) {
    var o = params || {},
      str = o.str || null,
      tStr = null,
      regex = /\${\$\d+\w?}/g;

    tStr = str.replace(regex, (...args) => {
      var
        match = args[0],
        number = match.match(/\d+/)[0],
        index = number - 1;
      var rep = `{${index}}`;
      return rep;
    });

    return tStr;
  }
}

module.exports = Vars;

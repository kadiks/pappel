'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class Pappel.Vars
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {Object} params
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {Number} params.loggerLevel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _skzLogger = require('skz-logger');

var _skzLogger2 = _interopRequireDefault(_skzLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vars = function () {
  function Vars(params) {
    _classCallCheck(this, Vars);

    var o = params || {};

    this._logger = new _skzLogger2.default();
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


  _createClass(Vars, [{
    key: 'transformAnonymousAndroid2Pappel',
    value: function transformAnonymousAndroid2Pappel(params) {
      var o = params || {},
          str = o.str || null,
          tStr = null,
          regex = /%\d\$\w/g;

      tStr = str.replace(regex, function () {
        var match = arguments.length <= 0 ? undefined : arguments[0],
            index = match.substring(1, 2),
            suffix = match.substring(match.length - 1, match.length);
        var rep = '${$' + index + suffix + '}';
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

  }, {
    key: 'transformAnonymousStrings2Pappel',
    value: function transformAnonymousStrings2Pappel(params) {
      var o = params || {},
          str = o.str || null,
          tStr = null,
          regex = /%@\w?/g,
          index = 0;

      tStr = str.replace(regex, function () {
        index++;
        var match = arguments.length <= 0 ? undefined : arguments[0],
            suffix = match.substring(match.length - 1, match.length);
        if (match.length === 2) {
          suffix = '';
        }
        var rep = '${$' + index + suffix + '}';
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

  }, {
    key: 'transformAnonymousPappel2AndroidXML',
    value: function transformAnonymousPappel2AndroidXML(params) {
      var o = params || {},
          str = o.str || null,
          tStr = null,
          regex = /\${\$\d+\w?}/g;

      tStr = str.replace(regex, function () {
        var match = arguments.length <= 0 ? undefined : arguments[0],
            index = match.match(/\d+/)[0],
            suffix = '$' + match.substring(match.length - 2, match.length - 1);

        if (!isNaN(suffix)) {
          suffix = '';
        }
        var rep = '%' + index + suffix;
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

  }, {
    key: 'transformAnonymousPappel2Strings',
    value: function transformAnonymousPappel2Strings(params) {
      var o = params || {},
          str = o.str || null,
          tStr = null,
          regex = /\${\$\d+\w?}/g;

      tStr = str.replace(regex, function () {
        var match = arguments.length <= 0 ? undefined : arguments[0],
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
     * @method transformAnonymousPappel2ReactNativeLocalization
     *
     * @param {Object} params
     * @param {String} params.str
     */

  }, {
    key: 'transformAnonymousPappel2ReactNativeLocalization',
    value: function transformAnonymousPappel2ReactNativeLocalization(params) {
      var o = params || {},
          str = o.str || null,
          tStr = null,
          regex = /\${\$\d+\w?}/g;

      tStr = str.replace(regex, function () {
        var match = arguments.length <= 0 ? undefined : arguments[0],
            number = match.match(/\d+/)[0],
            index = number - 1;
        var rep = '{' + index + '}';
        return rep;
      });

      return tStr;
    }
  }]);

  return Vars;
}();

module.exports = Vars;
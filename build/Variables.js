'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class Pappel.Variables
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {Object} params
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {Number} params.loggerLevel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _skzLogger = require('skz-logger');

var _skzLogger2 = _interopRequireDefault(_skzLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Variables = function () {
  function Variables(params) {
    _classCallCheck(this, Variables);

    var o = params || {};

    this._logger = new _skzLogger2.default();
    this._logger.setPrefix({
      prefix: 'Pappel.Variables'
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


  _createClass(Variables, [{
    key: 'transformAnonymousAndroid2Pappel',
    value: function transformAnonymousAndroid2Pappel(params) {
      var o = params || {},
          str = o.str || null,
          tStr = null,
          regex = new RegExp('%@', 'g'),
          index = 0;

      tStr = str.replace(regex, function () {
        var rep = '${$' + index + '}';
        return rep;
      });

      return tStr;

      var str = "odz %@  zf %@ rge%@tg";
      var regex = new RegExp('(%@)', 'g');
      var match = str.match(regex);
      console.log(match);
      var index = 0;
      str.replace(regex, function () {
        console.log('args', arguments);
        var repl = '${$' + index + '}';
        index++;
        return repl;
      });
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
          regex = new RegExp('%@', 'g'),
          index = 0;

      tStr = str.replace(regex, function () {
        var rep = '${$' + index + '}';
        return rep;
      });

      return tStr;
    }
  }]);

  return Variables;
}();

module.exports = Variables;
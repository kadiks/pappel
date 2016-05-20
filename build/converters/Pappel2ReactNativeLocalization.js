'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Root = require('./Root');

var _Root2 = _interopRequireDefault(_Root);

var _Vars = require('../Vars');

var _Vars2 = _interopRequireDefault(_Vars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Converter.Pappel2ReactNativeLocalization
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.Converter.Root
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @use Pappel.Vars
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Pappel2ReactNativeLocalization = function (_Converter) {
  _inherits(Pappel2ReactNativeLocalization, _Converter);

  function Pappel2ReactNativeLocalization(params) {
    _classCallCheck(this, Pappel2ReactNativeLocalization);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Pappel2ReactNativeLocalization).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Converter.Pappel2ReactNativeLocalization'
    });
    _this._vars = new _Vars2.default();
    return _this;
  }

  /**
   * @property _logger
   * @private
   */

  /**
   * @property _vars
   * @private
   */

  _createClass(Pappel2ReactNativeLocalization, [{
    key: 'convert',


    /**
     * @method convert 
     *
     * @param {Object} params
     * @param {Object} params.pappel
     */
    value: function convert(params) {
      this._logger.info('>> #convert');
      var o = params || {},
          pappel = o.pappel || null,
          format = {};

      if (pappel === null) {
        return null;
      }

      for (var key in pappel) {
        var pKey = pappel[key];
        for (var lang in pKey) {
          if (!format.hasOwnProperty(lang)) {
            format[lang] = {};
          }
          format[lang][key] = this.transformString({
            str: pKey[lang]
          });
        }
      }

      var content = JSON.stringify(format, null, 4);

      this._logger.info('<< #convert');
      return content;
    }
  }, {
    key: 'transformString',
    value: function transformString(params) {
      return this._vars.transformAnonymousPappel2ReactNativeLocalization({
        str: params.str
      });
    }
  }, {
    key: 'contentBoilerplateBefore',
    get: function get() {
      return '// Generated by Pappel.io' + "\r\n" + "import Localization from 'react-native-localization';" + "\r\n" + 'let I18n = new Localization(' + "\r\n";
    }
  }, {
    key: 'contentBoilerplateAfter',
    get: function get() {
      return "\r\n" + ');' + "\r\n" + 'module.exports = I18n;';
    }
  }]);

  return Pappel2ReactNativeLocalization;
}(_Root2.default);

module.exports = Pappel2ReactNativeLocalization;
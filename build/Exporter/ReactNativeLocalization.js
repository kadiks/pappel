'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RootConverter = require('../RootConverter');

var _RootConverter2 = _interopRequireDefault(_RootConverter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Exporter.ReactNativeLocalization
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.RootConverter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ReactNativeLocalization = function (_Converter) {
  _inherits(ReactNativeLocalization, _Converter);

  function ReactNativeLocalization(params) {
    _classCallCheck(this, ReactNativeLocalization);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactNativeLocalization).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Exporter.ReactNativeLocalization'
    });
    return _this;
  }

  _createClass(ReactNativeLocalization, [{
    key: 'convert',
    value: function convert(params) {
      this._logger.info('>> #convert');
      var o = params || {},
          pappel = o.input || null,
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

  return ReactNativeLocalization;
}(_RootConverter2.default);

exports.default = ReactNativeLocalization;
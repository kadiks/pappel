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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Exporter.Strings
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.RootConverter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Strings = function (_Converter) {
  _inherits(Strings, _Converter);

  function Strings(params) {
    _classCallCheck(this, Strings);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Strings).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Exporter.Strings'
    });
    return _this;
  }

  _createClass(Strings, [{
    key: 'convert',
    value: function convert(params) {
      this._logger.info('>> #convert');
      var o = params || {},
          pappel = o.input || null,
          language = o.language || null,
          possibleLanguages = null;

      if (pappel === null) {
        return null;
      }

      possibleLanguages = Object.keys(pappel[Object.keys(pappel)[0]]);

      if (language === null || possibleLanguages.indexOf(language) === -1) {
        language = possibleLanguages[0];
      }

      var file = '';

      for (var key in pappel) {
        var transformedString = this.transformString({
          str: pappel[key][language]
        });
        file += ['"', key, '" = "', transformedString, '";', "\r\n"].join('');
      }

      this._logger.info('<< #convert');
      return file;
    }

    /**
     * @method transformString
     *
     * @param {Object} params
     * @param {String} params.str
     */

  }, {
    key: 'transformString',
    value: function transformString(params) {
      this._logger.info('>> #transformString');
      var tStr = this._vars.transformAnonymousPappel2Strings({
        str: params.str
      });
      this._logger.info('<< #transformString');
      return tStr;
    }
  }, {
    key: 'contentBoilerplateBefore',
    get: function get() {
      return '/*' + "\r\n" + '  Localizable.strings' + "\r\n" + "\r\n" + '  Generated by Pappel.io' + "\r\n" + '  */' + "\r\n";
    }
  }, {
    key: 'contentBoilerplateAfter',
    get: function get() {
      return '';
    }
  }]);

  return Strings;
}(_RootConverter2.default);

exports.default = Strings;
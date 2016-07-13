'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Root = require('./Root');

var _Root2 = _interopRequireDefault(_Root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Converter.Pappel2XLIFF
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.Converter.Root
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Pappel2XLIFF = function (_Converter) {
  _inherits(Pappel2XLIFF, _Converter);

  function Pappel2XLIFF(params) {
    _classCallCheck(this, Pappel2XLIFF);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Pappel2XLIFF).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Converter.Pappel2XLIFF'
    });
    return _this;
  }

  _createClass(Pappel2XLIFF, [{
    key: 'convert',


    /**
     * @method convert
     *
     * @param {Object} params
     * @param {Object} params.pappel
     * @param {String} [params.language='']
     */
    value: function convert(params) {
      this._logger.info('>> #convert');
      var o = params || {},
          pappel = o.pappel || null,
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
        var str = pappel[key][language];
        file += ["\t\t\t", '<trans-unit id="', key, '">', "\r\n", "\t\t\t\t", '<source xml:lang="', language, '">', str, '</source>', "\r\n", "\t\t\t", '</trans-unit>', "\r\n"].join('');
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
      var tStr = params.str;
      this._logger.info('<< #transformString');
      return tStr;
    }
  }, {
    key: 'contentBoilerplateBefore',
    get: function get() {
      return '<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<xliff version="1.2">' + "\r\n\t" + '<file source-language="' + this._language + '" tool="Pappel.io">' + "\r\n\t\t" + '<body>' + "\r\n";
    }
  }, {
    key: 'contentBoilerplateAfter',
    get: function get() {
      return "\t\t" + '</body>' + "\r\n\t" + '</file>' + "\r\n" + '</xliff>';
    }
  }]);

  return Pappel2XLIFF;
}(_Root2.default);

module.exports = Pappel2XLIFF;
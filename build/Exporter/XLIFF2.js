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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Exporter.XLIFF2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.RootConverter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var XLIFF2 = function (_Converter) {
  _inherits(XLIFF2, _Converter);

  function XLIFF2(params) {
    _classCallCheck(this, XLIFF2);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XLIFF2).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Exporter.XLIFF2'
    });
    return _this;
  }

  _createClass(XLIFF2, [{
    key: 'convert',
    value: function convert(params) {
      this._logger.info('>> #convert');
      var o = params || {},
          pappel = o.input || null,
          language = o.language ? o.language : this._language || null,
          targetLanguage = o.targetLanguage ? o.targetLanguage : this._targetLanguage || null,
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
        var transUnit = [];
        transUnit.push("\t\t", '<unit id="', key, '">', "\r\n");
        transUnit.push("\t\t\t", '<segment>', "\r\n");
        transUnit.push("\t\t\t\t", '<source>', str, '</source>', "\r\n");
        if (targetLanguage !== null) {
          transUnit.push("\t\t\t\t", '<target>', pappel[key][targetLanguage], '</target>', "\r\n");
        }
        transUnit.push("\t\t\t", '</segment>', "\r\n");
        transUnit.push("\t\t", '</unit>', "\r\n");
        file += transUnit.join('');
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
      var trgLangAttr = '';
      if (this._targetLanguage) {
        trgLangAttr = ' trgLang="' + this._targetLanguage + '"';
      }
      return '<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="' + this._language + '"' + trgLangAttr + ' tool="Pappel.io">' + "\r\n\t" + '<file>' + "\r\n";
    }
  }, {
    key: 'contentBoilerplateAfter',
    get: function get() {
      return "\r\n\t" + '</file>' + "\r\n" + '</xliff>';
    }
  }]);

  return XLIFF2;
}(_RootConverter2.default);

exports.default = XLIFF2;
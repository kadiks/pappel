'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Root = require('./Root');

var _Root2 = _interopRequireDefault(_Root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Converter.Strings2Pappel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.Converter.Root
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Strings = require('i18n-strings-files');

var Strings2Pappel = function (_Converter) {
  _inherits(Strings2Pappel, _Converter);

  function Strings2Pappel(params) {
    _classCallCheck(this, Strings2Pappel);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Strings2Pappel).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Converter.Strings2Pappel'
    });
    _this._strings = Strings;
    return _this;
  }

  /**
   * @property _xml
   * @private
   */

  /**
   * @method convert
   *
   * @param {Object} params
   * @param {Object} params.stringsString
   * @param {String} [params.language='en']
   */


  _createClass(Strings2Pappel, [{
    key: 'convert',
    value: function convert(params) {
      this._logger.info('>> #convert');
      var o = params || {},
          stringsString = o.stringsString || null,
          language = o.language || 'en',
          strings = null,
          pappel = {};

      if (stringsString === null) {
        return null;
      }

      if (language === null) {
        return null;
      }

      strings = this._strings.parse(stringsString);

      /*var inspect = require('util').inspect;
      console.log(inspect(xml, {
        colors: true,
        depth: Infinity
      }));*/

      for (var key in strings) {
        pappel[key] = {};
        pappel[key][language] = strings[key];
      }

      //console.log('Strings2Pappel#convert strings', strings);

      this._logger.info('<< #convert');
      return pappel;
    }
  }]);

  return Strings2Pappel;
}(_Root2.default);

module.exports = Strings2Pappel;
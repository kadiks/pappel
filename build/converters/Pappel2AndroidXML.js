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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Converter.Pappel2AndroidXML
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.Converter.Root
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @use Pappel.Vars
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Pappel2AndroidXML = function (_Converter) {
  _inherits(Pappel2AndroidXML, _Converter);

  function Pappel2AndroidXML(params) {
    _classCallCheck(this, Pappel2AndroidXML);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Pappel2AndroidXML).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Converter.Pappel2AndroidXML'
    });
    _this._vars = new _Vars2.default();
    return _this;
  }

  _createClass(Pappel2AndroidXML, [{
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
        var transformedString = this.transformString({
          str: pappel[key][language]
        });
        file += ["\t", '<string name="', key, '">', transformedString, '</string>', "\r\n"].join('');
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
      var tStr = this._vars.transformAnonymousPappel2AndroidXML({
        str: params.str
      });
      this._logger.info('<< #transformString');
      return tStr;
    }
  }, {
    key: 'contentBoilerplateBefore',
    get: function get() {
      return '<?xml version="1.0" encoding="utf-8"?>' + "\r\n" + '<resources>' + "\r\n";
    }
  }, {
    key: 'contentBoilerplateAfter',
    get: function get() {
      return '</resources>';
    }
  }]);

  return Pappel2AndroidXML;
}(_Root2.default);

module.exports = Pappel2AndroidXML;
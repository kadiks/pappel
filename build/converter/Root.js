'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class Pappel.Converter.Root
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @uses Pappel.Keys
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @uses Pappel.Vars
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {Object} params
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {String} [params.language='en']
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {String} [params.targetLanguage='']
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {Number} [params.loggerLevel=8]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _skzLogger = require('skz-logger');

var _skzLogger2 = _interopRequireDefault(_skzLogger);

var _Keys = require('../Keys');

var _Keys2 = _interopRequireDefault(_Keys);

var _Vars = require('../Vars');

var _Vars2 = _interopRequireDefault(_Vars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Converter = function () {
  function Converter(params) {
    _classCallCheck(this, Converter);

    var o = params || {},
        language = o.language || null,
        targetLanguage = o.targetLanguage || null;

    this._logger = new _skzLogger2.default();
    this._logger.setPrefix({
      prefix: 'Pappel.Converter.Root'
    });

    this._logger.setLevel({
      level: o.loggerLevel || 8
    });

    this._vars = new _Vars2.default(params);

    this._keys = new _Keys2.default(params);

    this._language = 'en';
    if (language !== null) {
      this._language = language;
    }
    this._targetLanguage = null;
    if (targetLanguage !== null) {
      this._targetLanguage = targetLanguage;
    }
  }

  /**
   * @property _logger
   * @protected
   */

  /**
   * @property _language Act as [sourceLanguage]
   * @protected
   */

  /**
   * @property _targetLanguage
   * @protected
   */

  /**
   * @property _vars
   * @protected
   */

  /**
   * @method wrapContent Wrap the content of the file with the necessary to validate the format
   *
   * @param {Object} params
   * @param {String} params.content
   */


  _createClass(Converter, [{
    key: 'wrapContent',
    value: function wrapContent(params) {
      return this.contentBoilerplateBefore + params.content + this.contentBoilerplateAfter;
    }
  }]);

  return Converter;
}();

exports.default = Converter;
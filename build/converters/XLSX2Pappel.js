'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Root = require('./Root');

var _Root2 = _interopRequireDefault(_Root);

var _Keys = require('../Keys');

var _Keys2 = _interopRequireDefault(_Keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Converter.XLSX2Pappel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.Converter.Root
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var XLSX = require('xlsx');

var XLSX2Pappel = function (_Converter) {
  _inherits(XLSX2Pappel, _Converter);

  function XLSX2Pappel(params) {
    _classCallCheck(this, XLSX2Pappel);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XLSX2Pappel).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Converter.XLSX2Pappel'
    });
    _this._keys = new _Keys2.default(params);
    return _this;
  }

  /**
   * @method convert 
   *
   * @param {Object} params
   * @param {Object} params.workbook
   */


  _createClass(XLSX2Pappel, [{
    key: 'convert',
    value: function convert(params) {
      var _this2 = this;

      this._logger.info('>> #convert');
      var o = params || {},
          workbook = o.workbook || null;

      if (workbook === null) {
        return null;
      }

      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var json = XLSX.utils.sheet_to_json(worksheet);

      var newJson = {};
      var columns = [];

      json.forEach(function (line) {
        //console.log('Pappel.Converter.XLSX2Pappel#convert line', line);
        if (line.key.substr(0, 2) == '//') {
          return;
        }
        var safeKey = _this2._keys.getSafeKey({
          key: line.key
        });
        newJson[safeKey] = {};
        for (var i in line) {
          if (i !== 'key') {
            newJson[safeKey][i] = line[i].replace(/{{[\w ]+}}/gi, '%@');

            if (columns.indexOf(i) === -1) {
              columns.push(i);
            }
          }
        }
      });

      this._logger.info('<< #convert');

      return newJson;

      // Put all key in language : [{key : {lang1: "value", lang2 : "value"}}] to {lang1: {key: "value"}, lang2: {key: "value"}}

      var orderByLanguage = {};

      for (var j = 0; j < columns.length; j++) {

        for (var key in newJson) {
          //logger.debug('key', key);
          //logger.debug('orderByLanguage', orderByLanguage);
          //logger.debug('newJson[key][lang]', newJson[key][lang]);
          for (var lang in newJson[key]) {
            if (!orderByLanguage.hasOwnProperty(lang)) {
              orderByLanguage[lang] = {};
            }
            orderByLanguage[lang][key] = newJson[key][lang];
          }
        }
      }

      return orderByLanguage;
    }
  }]);

  return XLSX2Pappel;
}(_Root2.default);

module.exports = XLSX2Pappel;
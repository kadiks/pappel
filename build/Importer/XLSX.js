'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RootConverter = require('../RootConverter');

var _RootConverter2 = _interopRequireDefault(_RootConverter);

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Importer.XLSX
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.RootConverter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var XLSX = function (_Converter) {
  _inherits(XLSX, _Converter);

  function XLSX(params) {
    _classCallCheck(this, XLSX);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XLSX).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Importer.XLSX'
    });
    return _this;
  }

  _createClass(XLSX, [{
    key: 'convert',
    value: function convert(params) {
      var _this2 = this;

      this._logger.info('>> #convert');
      var o = params || {},
          input = o.input || null,
          workbook = null;

      if (input === null) {
        return null;
      }

      workbook = input;

      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var json = _xlsx2.default.utils.sheet_to_json(worksheet);

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
    }
  }]);

  return XLSX;
}(_RootConverter2.default);

exports.default = XLSX;
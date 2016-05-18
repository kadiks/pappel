'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _skzLogger = require('skz-logger');

var _skzLogger2 = _interopRequireDefault(_skzLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @class Pappel.Converter.Root
                                                                                                                                                           *
                                                                                                                                                           * @param {Object} params
                                                                                                                                                           * @param {Number} params.loggerLevel
                                                                                                                                                           */

var Converter = function Converter(params) {
  _classCallCheck(this, Converter);

  var o = params || {};

  this._logger = new _skzLogger2.default();
  this._logger.setPrefix({
    prefix: 'Pappel.Converter.Root'
  });

  this._logger.setLevel({
    level: o.loggerLevel || 8
  });
};

exports.default = Converter;
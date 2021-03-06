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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Importer.AndroidXML
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.RootConverter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var XML = require('xml-parser');

var AndroidXML = function (_Converter) {
  _inherits(AndroidXML, _Converter);

  function AndroidXML(params) {
    _classCallCheck(this, AndroidXML);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AndroidXML).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Importer.AndroidXML'
    });
    _this._xml = XML;
    return _this;
  }

  /**
   * @property _xml
   * @private
   */

  _createClass(AndroidXML, [{
    key: 'convert',
    value: function convert(params) {
      this._logger.info('>> #convert');
      var o = params || {},
          xmlString = o.input || null,
          language = o.language || 'en',
          xml = null,
          pappel = {};

      if (xmlString === null) {
        return null;
      }

      if (language === null) {
        return null;
      }

      xml = this._xml(xmlString);

      /*var inspect = require('util').inspect;
      console.log(inspect(xml, {
        colors: true,
        depth: Infinity
      }));*/

      var xmlArray = xml.root.children;

      xmlArray.forEach(function (node, index, array) {
        pappel[node.attributes.name] = {};
        pappel[node.attributes.name][language] = node.content;
      });

      this._logger.info('<< #convert');
      return pappel;
    }
  }]);

  return AndroidXML;
}(_RootConverter2.default);

exports.default = AndroidXML;
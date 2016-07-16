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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Importer.XLIFF
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.RootConverter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var XML = require('xml-parser');

var XLIFF = function (_Converter) {
  _inherits(XLIFF, _Converter);

  function XLIFF(params) {
    _classCallCheck(this, XLIFF);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XLIFF).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Importer.XLIFF'
    });
    _this._xml = XML;
    return _this;
  }

  /**
   * @property _xml
   * @private
   */

  _createClass(XLIFF, [{
    key: 'convert',
    value: function convert(params) {
      this._logger.info('>> #convert');
      var o = params || {},
          xmlString = o.input || null,
          language = null,
          targetLanguage = null,
          xml = null,
          pappel = {};

      if (xmlString === null) {
        return null;
      }

      xml = this._xml(xmlString);

      /*var inspect = require('util').inspect;
      console.log(inspect(xml, {
        colors: true,
        depth: Infinity
      }));*/

      var xmlFileNode = xml.root.children[0];

      language = xmlFileNode.attributes['source-language'];
      targetLanguage = xmlFileNode.attributes['target-language'] || null;

      var xmlBodyNode = xmlFileNode.children[0];

      var xmlArray = xmlBodyNode.children;

      //console.log('#convert xmlArray', xmlArray);

      xmlArray.forEach(function (node, index, array) {
        //console.log('#convert node', node);
        //console.log('#convert node.attributes', node.attributes);
        //console.log('#convert node.children', node.children);
        pappel[node.attributes.id] = {};
        pappel[node.attributes.id][language] = node.children[0].content;
        if (targetLanguage !== null) {
          pappel[node.attributes.id][targetLanguage] = node.children[1].content;
        }
      });

      this._logger.info('<< #convert');
      return pappel;
    }
  }]);

  return XLIFF;
}(_RootConverter2.default);

exports.default = XLIFF;
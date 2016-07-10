'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Root = require('./Root');

var _Root2 = _interopRequireDefault(_Root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Converter.XLIFF2Pappel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.Converter.Root
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var XML = require('xml-parser');

var XLIFF2Pappel = function (_Converter) {
  _inherits(XLIFF2Pappel, _Converter);

  function XLIFF2Pappel(params) {
    _classCallCheck(this, XLIFF2Pappel);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XLIFF2Pappel).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Converter.XLIFF2Pappel'
    });
    _this._xml = XML;
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
   * @param {Object} params.xmlString
   */


  _createClass(XLIFF2Pappel, [{
    key: 'convert',
    value: function convert(params) {
      this._logger.info('>> #convert');
      var o = params || {},
          xmlString = o.xmlString || null,
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

  return XLIFF2Pappel;
}(_Root2.default);

module.exports = XLIFF2Pappel;
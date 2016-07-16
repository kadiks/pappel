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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Pappel.Importer.XLIFF2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends Pappel.RootConverter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var XML = require('xml-parser');

var XLIFF2 = function (_Converter) {
  _inherits(XLIFF2, _Converter);

  function XLIFF2(params) {
    _classCallCheck(this, XLIFF2);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XLIFF2).call(this, params));

    _this._logger.setPrefix({
      prefix: 'Pappel.Importer.XLIFF2'
    });
    _this._xml = XML;
    return _this;
  }

  /**
   * @property _xml
   * @private
   */

  _createClass(XLIFF2, [{
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

      //console.log('#convert xml', xml);

      var xmlFileNode = xml.root.children[0];

      //console.log('#convert xmlFileNode', xmlFileNode);

      language = xml.root.attributes['srcLang'];
      targetLanguage = xml.root.attributes['trgLang'] || null;

      //console.log('language:', language, 'targetLanguage:', targetLanguage);

      //var xmlBodyNode = xmlFileNode.children[0];

      //console.log('#convert xmlBodyNode', xmlBodyNode);

      var xmlUnits = xmlFileNode.children;

      //console.log('#convert xmlArray', xmlArray);

      xmlUnits.forEach(function (node, index, array) {
        //console.log('#convert node', node);
        //console.log('#convert node.attributes', node.attributes);
        //console.log('#convert node.children', node.children);
        var key = node.attributes.id;

        var xmlSegments = node.children;
        pappel[key] = {};
        var txtSrc = '';
        var txtTrg = '';
        xmlSegments.forEach(function (node, index, array) {
          //console.log('#convert node2', node.children);
          var sourceNode = null;
          var targetNode = null;
          var xmlSrcTarg = node.children;
          xmlSrcTarg.forEach(function (node, index, array) {
            //console.log('xmlSrcTarg loop #1');
            if (node.name === 'source') {
              sourceNode = node;
            }
            if (node.name === 'target') {
              targetNode = node;
            }
            if (sourceNode !== null) {
              txtSrc = txtSrc + sourceNode.content;
              sourceNode = null;
            }
            if (targetNode !== null) {
              txtTrg = txtTrg + targetNode.content;
              targetNode = null;
            }
          });
          pappel[key][language] = txtSrc;
          if (targetLanguage !== null) {
            if (txtTrg.length > 0) {
              pappel[key][targetLanguage] = txtTrg;
            }
          }
        });
      });

      this._logger.info('<< #convert');
      return pappel;
    }
  }]);

  return XLIFF2;
}(_RootConverter2.default);

exports.default = XLIFF2;
/**
 * @class Pappel.Importer.XLIFF2
 *
 * @extends Pappel.RootConverter
 */

import Converter from '../RootConverter';
var XML = require('xml-parser');

class XLIFF2 extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Importer.XLIFF2'
    });
    this._xml = XML;
  }

  /**
   * @property _xml
   * @private
   */

  convert(params) {
    this._logger.info('>> #convert');
    var
      o = params || {},
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

    xmlUnits.forEach((node, index, array) => {
      //console.log('#convert node', node);
      //console.log('#convert node.attributes', node.attributes);
      //console.log('#convert node.children', node.children);
      var key = node.attributes.id;

      var xmlSegments = node.children;
      pappel[key] = {};
      var txtSrc = '';
      var txtTrg = '';
      xmlSegments.forEach((node, index, array) => {
        //console.log('#convert node2', node.children);
        var sourceNode = null;
        var targetNode = null;
        var xmlSrcTarg = node.children;
        xmlSrcTarg.forEach((node, index, array) => {
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

}

export default XLIFF2;

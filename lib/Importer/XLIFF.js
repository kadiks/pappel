/**
 * @class Pappel.Importer.XLIFF
 *
 * @extends Pappel.RootConverter
 */

import Converter from '../RootConverter';
var XML = require('xml-parser');

class XLIFF extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Importer.XLIFF'
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

    var xmlFileNode = xml.root.children[0];

    language = xmlFileNode.attributes['source-language'];
    targetLanguage = xmlFileNode.attributes['target-language'] || null;

    var xmlBodyNode = xmlFileNode.children[0];

    var xmlArray = xmlBodyNode.children;

    //console.log('#convert xmlArray', xmlArray);

    xmlArray.forEach((node, index, array) => {
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

}

export default XLIFF;

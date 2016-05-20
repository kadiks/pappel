/**
 * @class Pappel.Converter.AndroidXML2Pappel
 *
 * @extends Pappel.Converter.Root
 */

import Converter from './Root';
var XML = require('xml-parser');

class AndroidXML2Pappel extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Converter.AndroidXML2Pappel'
    });
    this._xml = XML;
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
   * @param {String} params.language
   */
  convert(params) {
    this._logger.info('>> #convert');
    var
      o = params || {},
      xmlString = o.xmlString || null,
      language = o.language || null,
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

    xmlArray.forEach((node, index, array) => {
      pappel[node.attributes.name] = {};
      pappel[node.attributes.name][language] = node.content;
    });



    this._logger.info('<< #convert');
    return pappel;
  }

}

module.exports = AndroidXML2Pappel;

/**
 * @class Pappel.Importer.AndroidXML
 *
 * @extends Pappel.RootConverter
 */

import Converter from '../RootConverter';
var XML = require('xml-parser');

class AndroidXML extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Importer.AndroidXML'
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

    xmlArray.forEach((node, index, array) => {
      pappel[node.attributes.name] = {};
      pappel[node.attributes.name][language] = node.content;
    });



    this._logger.info('<< #convert');
    return pappel;
  }

}

export default AndroidXML;

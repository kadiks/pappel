/**
 * @class Pappel.Converter.XLSX2Pappel
 *
 * @extends Pappel.Converter.Root
 */

import Converter from './Root';
import XLSX from 'xlsx';

class XLSX2Pappel extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Converter.XLSX2Pappel'
    });
  }

  /**
   * @method convert 
   *
   * @param {Object} params
   * @param {Object} params.workbook
   */
  convert(params) {
    this._logger.info('>> #convert');
    var
      o = params || {},
      workbook = o.workbook || null;

    if (workbook === null) {
      return null;
    }

    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var json = XLSX.utils.sheet_to_json(worksheet);

    var newJson = {};
    var columns = [];

    json.forEach((line) => {
      //console.log('Pappel.Converter.XLSX2Pappel#convert line', line);
      if (line.key.substr(0, 2) == '//') {
        return;
      }
      var safeKey = this._keys.getSafeKey({
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

}

module.exports = XLSX2Pappel;

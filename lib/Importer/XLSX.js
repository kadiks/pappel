/**
 * @class Pappel.Importer.XLSX
 *
 * @extends Pappel.RootConverter
 */

import Converter from '../RootConverter';
import XLSXParser from 'xlsx';

class XLSX extends Converter {

  constructor(params) {
    super(params);
    this._logger.setPrefix({
      prefix: 'Pappel.Importer.XLSX'
    });
  }

  convert(params) {
    this._logger.info('>> #convert');
    var
      o = params || {},
      input = o.input || null,
      workbook = null;

    if (input === null) {
      return null;
    }

    workbook = input;

    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var json = XLSXParser.utils.sheet_to_json(worksheet);

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

export default XLSX;

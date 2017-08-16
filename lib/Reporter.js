/**
 * @class Pappel.Reporter
 *
 * @param {Object} params
 * @param {Number} params.loggerLevel
 */

import Logger from 'skz-logger';

class Reporter {

  constructor(params) {
    var o = params || {};

    this._logger = new Logger();
    this._logger.setPrefix({
      prefix: 'Pappel.Reporter'
    });
    this._logger.setLevel({
      level: o.loggerLevel || 8
    });

    this._reports = [];
  }

  /**
   * @property reports
   */
  get reports() {
    return this._reports;
  }
  set reports(report) {
    if (report !== null) {
      this._reports.push(report);
    }
  }

  /**
   * @property templates
   */
  get templates() {
    return {
      'E_FORMAT' : ['format', 'errMsg'],
      'W_KEY_CHANGE' : ['oKey', 'oKeyLine', 'nKey', 'oKeyLine'],
      'W_VAR_CHANGE' : ['oVar', 'oVarLine', 'nVar', 'nVarLine']
    };
  }

  /**
   * @method add
   *
   * @param {String} reportKey
   * @param {Object} parameters
   */
   add(reportKey = null, parameters = {}) {
     var report = this.buildReport({
       key : reportKey,
       parameters
     });

     this.reports = report;
   }

   /**
    * @method buildReport
    *
    * @param {Object} params
    * @param {String} params.key
    * @param {Object} params.parameters
    */
   buildReport({ key, parameters }) {
     if (key === null) {
       return null;
     }
     if (this.templates.hasOwnProperty(key) === false) {
       return null;
     }

     var report = {};
     report.type = key[0] === 'E' ? 'ERROR' : 'WARNING';
     report.key = key.substr(2);
     report.parameters = {};

     var requiredKeys = this.templates[key];
     requiredKeys.forEach(requiredKey => {
       report.parameters[requiredKey] = parameters[requiredKey] || null;
     });

     return report;
   }
}

export default Reporter;

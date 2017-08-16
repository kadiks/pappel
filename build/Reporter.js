'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class Pappel.Reporter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {Object} params
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {Number} params.loggerLevel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _skzLogger = require('skz-logger');

var _skzLogger2 = _interopRequireDefault(_skzLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reporter = function () {
  function Reporter(params) {
    _classCallCheck(this, Reporter);

    var o = params || {};

    this._logger = new _skzLogger2.default();
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


  _createClass(Reporter, [{
    key: 'add',


    /**
     * @method add
     *
     * @param {String} reportKey
     * @param {Object} parameters
     */
    value: function add() {
      var reportKey = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var parameters = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var report = this.buildReport({
        key: reportKey,
        parameters: parameters
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

  }, {
    key: 'buildReport',
    value: function buildReport(_ref) {
      var key = _ref.key;
      var parameters = _ref.parameters;

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
      requiredKeys.forEach(function (requiredKey) {
        report.parameters[requiredKey] = parameters[requiredKey] || null;
      });

      return report;
    }
  }, {
    key: 'reports',
    get: function get() {
      return this._reports;
    },
    set: function set(report) {
      if (report !== null) {
        this._reports.push(report);
      }
    }

    /**
     * @property templates
     */

  }, {
    key: 'templates',
    get: function get() {
      return {
        'E_FORMAT': ['format', 'errMsg'],
        'W_KEY_CHANGE': ['oKey', 'oKeyLine', 'nKey', 'oKeyLine'],
        'W_VAR_CHANGE': ['oVar', 'oVarLine', 'nVar', 'nVarLine']
      };
    }
  }]);

  return Reporter;
}();

exports.default = Reporter;
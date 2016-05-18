'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Pappel.Keys
 */

var Keys = function () {
  function Keys() {
    _classCallCheck(this, Keys);
  }

  _createClass(Keys, [{
    key: 'getSafeKey',

    /**
     * @method getSafeKey
     *
     * @param {Object} params
     * @param {String} params.key
     */
    value: function getSafeKey(params) {
      var o = params || {},
          key = o.key || null,
          safeKey = o.key.replace(' ', '_');

      return safeKey;
    }
  }]);

  return Keys;
}();

module.exports = Keys;
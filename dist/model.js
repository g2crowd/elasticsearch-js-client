'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
  _createClass(Model, null, [{
    key: 'deserialize',
    value: function deserialize(hits) {
      return hits.map(function (hit) {
        return Object.assign({ id: hit['_id'] }, hit._source);
      });
    }
  }]);

  function Model(indexName, attributes) {
    var _this = this;

    _classCallCheck(this, Model);

    var item = void 0;
    this.indexName = indexName;
    this.attributes = attributes;
    this.storedFields = function () {
      var result = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Array.from(_this.selectAttribute('stored', true))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          item = _step.value;

          result.push(item.name);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return result;
    }();
    this.textFields = function () {
      var result1 = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Array.from(_this.selectAttribute('type', 'text'))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          item = _step2.value;

          result1.push(item.name);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result1;
    }();
    this.fulltextFields = function () {
      var result2 = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Array.from(_this.selectAttribute('fulltext', true))[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          item = _step3.value;

          var boost = item.boost ? '^' + item.boost : '';
          result2.push(item.name + boost);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return result2;
    }();
  }

  _createClass(Model, [{
    key: 'searchPath',
    value: function searchPath() {
      return '/' + this.indexName + '/_search';
    }
  }, {
    key: 'selectAttribute',
    value: function selectAttribute(key, value) {
      return Array.from(this.attributes).filter(function (item) {
        return item[key] === value;
      });
    }
  }]);

  return Model;
}();

module.exports = Model;
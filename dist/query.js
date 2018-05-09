'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Query = function () {
  function Query(model, fn) {
    _classCallCheck(this, Query);

    this.model = model;
    this.musts = [];
    this.shoulds = [];
    this.filters = [];
    this.mustNots = [];
    this.sorts = [];
    this.booster = null;
    this.from = 0;
    this.size = 10;
    if (fn) {
      fn(this);
    }
  }

  _createClass(Query, [{
    key: 'must',
    value: function must(value) {
      this.musts.push(value);
      return this;
    }
  }, {
    key: 'should',
    value: function should(value) {
      this.shoulds.push(value);
      return this;
    }
  }, {
    key: 'filter',
    value: function filter(value) {
      this.filters.push(value);
      return this;
    }
  }, {
    key: 'must_not',
    value: function must_not(value) {
      this.mustNots.push(value);
      return this;
    }
  }, {
    key: 'sort',
    value: function sort(value) {
      this.sorts.push(value);
      return this;
    }

    // { functions: [{field_value_factor: { field: 'name', modifier: 'log1p', factor: 1 }}] }

  }, {
    key: 'boost',
    value: function boost(opts) {
      return this.booster = opts;
    }
  }, {
    key: 'paginate',
    value: function paginate(opts) {
      this.size = parseInt(opts.per || 10, 10);
      return this.from = (parseInt(opts.page || 1, 10) - 1) * this.size;
    }
  }, {
    key: 'wrapInBoost',
    value: function wrapInBoost(query) {
      if (!this.booster) {
        return { query: query };
      } else {
        return {
          query: {
            function_score: {
              boost_mode: this.booster.boost_mode || 'multiply',
              score_mode: this.booster.score_mode || 'multiply',
              query: query,
              functions: this.booster.functions || []
            }
          }
        };
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var query = this.wrapInBoost({
        bool: {
          must: this.musts,
          should: this.shoulds,
          filter: this.filters,
          must_not: this.mustNots
        }
      });

      return Object.assign(query, {
        sort: this.sorts,
        from: this.from,
        size: this.size,
        _source: this.model.storedFields
      });
    }
  }]);

  return Query;
}();

module.exports = Query;
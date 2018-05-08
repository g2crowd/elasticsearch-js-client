class Query {
  constructor(model, fn) {
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

  must(value) {
    this.musts.push(value);
    return this;
  }

  should(value) {
    this.shoulds.push(value);
    return this;
  }

  filter(value) {
    this.filters.push(value);
    return this;
  }

  must_not(value) {
    this.mustNots.push(value);
    return this;
  }

  sort(value) {
    this.sorts.push(value);
    return this;
  }

  // { functions: [{field_value_factor: { field: 'name', modifier: 'log1p', factor: 1 }}] }
  boost(opts) {
    return (this.booster = opts);
  }

  paginate(opts) {
    this.size = parseInt(opts.per || 10, 10);
    return (this.from = (parseInt(opts.page || 1, 10) - 1) * this.size);
  }

  wrapInBoost(query) {
    if (!this.booster) {
      return {query};
    } else {
      return {
        query: {
          function_score: {
            boost_mode: this.booster.boost_mode || 'multiply',
            score_mode: this.booster.score_mode || 'multiply',
            query,
            functions: this.booster.functions || [],
          },
        },
      };
    }
  }

  toJSON() {
    const query = this.wrapInBoost({
      bool: {
        must: this.musts,
        should: this.shoulds,
        filter: this.filters,
        must_not: this.mustNots,
      },
    });

    return Object.assign(query, {
      sort: this.sorts,
      from: this.from,
      size: this.size,
      _source: this.model.storedFields,
    });
  }
}

module.exports = Query;

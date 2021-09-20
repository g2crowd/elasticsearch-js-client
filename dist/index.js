var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __require = typeof require !== "undefined" ? require : (x) => {
  throw new Error('Dynamic require of "' + x + '" is not supported');
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/index.js
__export(exports, {
  Client: () => client_default,
  Model: () => model_default,
  Query: () => query_default
});

// src/model.js
var Model = class {
  static deserialize(hits) {
    return hits.map(({ _id: id, _source: source }) => ({ id, ...source }));
  }
  constructor(indexName, attributes) {
    this.indexName = indexName;
    this.attributes = attributes;
  }
  get storedFields() {
    return this.selectAttribute("stored", true).map((item) => item.name);
  }
  get textFields() {
    return this.selectAttribute("type", "text").map((item) => item.name);
  }
  get fulltextFields() {
    return this.selectAttribute("fulltext", true).map((item) => {
      const boost = item.boost ? `^${item.boost}` : "";
      return item.name + boost;
    });
  }
  searchPath() {
    return `/${this.indexName}/_search`;
  }
  selectAttribute(key, value) {
    return Array.from(this.attributes).filter((item) => item[key] === value);
  }
};
var model_default = Model;

// src/client.js
var Client = class {
  constructor(query, opts = {}) {
    this.query = query;
    this.opts = opts;
    this.transport = this.opts.transport || window.$;
  }
  send(opts = {}) {
    return this.transport.ajax({
      url: this.opts.url,
      type: "POST",
      data: JSON.stringify(this.query.toJSON()),
      dataType: "json",
      headers: {
        Authorization: `Basic ${btoa(this.opts.userinfo)}`,
        "Content-Type": "application/json"
      },
      success(data) {
        if (!opts.success) {
          return;
        }
        const docs = data.hits.hits;
        return opts.success(model_default.deserialize(docs), data);
      },
      error: opts.error
    });
  }
};
var client_default = Client;

// src/query.js
var Query = class {
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
  boost(opts) {
    return this.booster = opts;
  }
  paginate({ per, page }) {
    this.size = parseInt(per || "10", 10);
    return this.from = (parseInt(page || "1", 10) - 1) * this.size;
  }
  wrapInBoost(query) {
    if (!this.booster) {
      return { query };
    } else {
      return {
        query: {
          function_score: {
            boost_mode: this.booster.boost_mode || "multiply",
            score_mode: this.booster.score_mode || "multiply",
            query,
            functions: this.booster.functions || []
          }
        }
      };
    }
  }
  toJSON() {
    const query = this.wrapInBoost({
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
};
var query_default = Query;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Client,
  Model,
  Query
});

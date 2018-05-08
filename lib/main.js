/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/namespace.js.coffee");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client.js.coffee":
/*!******************************!*\
  !*** ./src/client.js.coffee ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Client, Model;\n\nModel = __webpack_require__(/*! model */ \"./src/model.js.coffee\");\n\nClient = class Client {\n  constructor(query, opts1 = {}) {\n    this.query = query;\n    this.opts = opts1;\n    this.transport = this.opts.transport || $;\n  }\n\n  send(opts = {}) {\n    return this.transport.ajax({\n      url: this.opts.url,\n      type: 'POST',\n      data: JSON.stringify(this.query.toJSON()),\n      dataType: 'json',\n      headers: {\n        Authorization: 'Basic ' + btoa(this.opts.userinfo)\n      },\n      success: function(data) {\n        var docs;\n        if (!opts.success) {\n          return;\n        }\n        docs = data.hits.hits;\n        return opts.success(Model.deserialize(docs), data);\n      },\n      error: opts.error\n    });\n  }\n\n};\n\nmodule.exports = Client;\n\n\n//# sourceURL=webpack:///./src/client.js.coffee?");

/***/ }),

/***/ "./src/model.js.coffee":
/*!*****************************!*\
  !*** ./src/model.js.coffee ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var $, Model;\n\n$ = jQuery;\n\nModel = class Model {\n  static deserialize(hits) {\n    var hit, i, len, results;\n    results = [];\n    for (i = 0, len = hits.length; i < len; i++) {\n      hit = hits[i];\n      results.push($.extend(true, {\n        id: hit['_id']\n      }, hit._source));\n    }\n    return results;\n  }\n\n  constructor(indexName, attributes) {\n    var boost, item;\n    this.indexName = indexName;\n    this.attributes = attributes;\n    this.storedFields = (function() {\n      var i, len, ref, results;\n      ref = this.selectAttribute('stored', true);\n      results = [];\n      for (i = 0, len = ref.length; i < len; i++) {\n        item = ref[i];\n        results.push(item.name);\n      }\n      return results;\n    }).call(this);\n    this.textFields = (function() {\n      var i, len, ref, results;\n      ref = this.selectAttribute('type', 'text');\n      results = [];\n      for (i = 0, len = ref.length; i < len; i++) {\n        item = ref[i];\n        results.push(item.name);\n      }\n      return results;\n    }).call(this);\n    this.fulltextFields = (function() {\n      var i, len, ref, results;\n      ref = this.selectAttribute('fulltext', true);\n      results = [];\n      for (i = 0, len = ref.length; i < len; i++) {\n        item = ref[i];\n        boost = item.boost ? `^${item.boost}` : '';\n        results.push(item.name + boost);\n      }\n      return results;\n    }).call(this);\n  }\n\n  searchPath() {\n    return `/${this.indexName}/_search`;\n  }\n\n  selectAttribute(key, value) {\n    var i, item, len, ref, results;\n    ref = this.attributes;\n    results = [];\n    for (i = 0, len = ref.length; i < len; i++) {\n      item = ref[i];\n      if (item[key] === value) {\n        results.push(item);\n      }\n    }\n    return results;\n  }\n\n};\n\nmodule.exports = Model;\n\n\n//# sourceURL=webpack:///./src/model.js.coffee?");

/***/ }),

/***/ "./src/namespace.js.coffee":
/*!*********************************!*\
  !*** ./src/namespace.js.coffee ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = {\n  Client: __webpack_require__(/*! client */ \"./src/client.js.coffee\"),\n  Model: __webpack_require__(/*! model */ \"./src/model.js.coffee\"),\n  Query: __webpack_require__(/*! query */ \"./src/query.js.coffee\")\n};\n\n\n//# sourceURL=webpack:///./src/namespace.js.coffee?");

/***/ }),

/***/ "./src/query.js.coffee":
/*!*****************************!*\
  !*** ./src/query.js.coffee ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Query;\n\nQuery = class Query {\n  constructor(model, fn) {\n    this.model = model;\n    this.musts = [];\n    this.shoulds = [];\n    this.filters = [];\n    this.mustNots = [];\n    this.sorts = [];\n    this.booster = null;\n    this.from = 0;\n    this.size = 10;\n    if (fn) {\n      fn(this);\n    }\n  }\n\n  must(value) {\n    this.musts.push(value);\n    return this;\n  }\n\n  should(value) {\n    this.shoulds.push(value);\n    return this;\n  }\n\n  filter(value) {\n    this.filters.push(value);\n    return this;\n  }\n\n  must_not(value) {\n    this.mustNots.push(value);\n    return this;\n  }\n\n  sort(value) {\n    this.sorts.push(value);\n    return this;\n  }\n\n  // { functions: [{field_value_factor: { field: 'name', modifier: 'log1p', factor: 1 }}] }\n  boost(opts) {\n    return this.booster = opts;\n  }\n\n  paginate(opts) {\n    this.size = parseInt(opts.per || 10, 10);\n    return this.from = (parseInt(opts.page || 1, 10) - 1) * this.size;\n  }\n\n  wrapInBoost(query) {\n    if (!this.booster) {\n      return {\n        query: query\n      };\n    } else {\n      return {\n        query: {\n          function_score: {\n            boost_mode: this.booster.boost_mode || 'multiply',\n            score_mode: this.booster.score_mode || 'multiply',\n            query: query,\n            functions: this.booster.functions || []\n          }\n        }\n      };\n    }\n  }\n\n  toJSON() {\n    var query;\n    query = this.wrapInBoost({\n      bool: {\n        must: this.musts,\n        should: this.shoulds,\n        filter: this.filters,\n        must_not: this.mustNots\n      }\n    });\n    return $.extend(query, {\n      sort: this.sorts,\n      from: this.from,\n      size: this.size,\n      _source: this.model.storedFields\n    });\n  }\n\n};\n\nmodule.exports = Query;\n\n\n//# sourceURL=webpack:///./src/query.js.coffee?");

/***/ })

/******/ });
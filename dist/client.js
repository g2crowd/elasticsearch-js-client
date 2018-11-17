'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = require('./model');

var Client = function () {
  function Client(query, opts) {
    _classCallCheck(this, Client);

    this.query = query;
    if (opts == null) {
      opts = {};
    }
    this.opts = opts;
    this.transport = this.opts.transport || window.$;
  }

  _createClass(Client, [{
    key: 'send',
    value: function send(opts) {
      if (opts == null) {
        opts = {};
      }
      return this.transport.ajax({
        url: this.opts.url,
        type: 'POST',
        data: JSON.stringify(this.query.toJSON()),
        dataType: 'json',
        headers: {
          Authorization: 'Basic ' + btoa(this.opts.userinfo),
          'Content-Type': 'application/json'
        },
        success: function success(data) {
          if (!opts.success) {
            return;
          }

          var docs = data.hits.hits;
          return opts.success(Model.deserialize(docs), data);
        },

        error: opts.error
      });
    }
  }]);

  return Client;
}();

module.exports = Client;
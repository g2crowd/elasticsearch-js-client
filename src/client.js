import Model from './model';

class Client {
  constructor(query, opts = {}) {
    this.query = query;
    this.opts = opts;
    this.transport = this.opts.transport || window.$;
  }

  send(opts = {}) {
    return this.transport.ajax({
      url: this.opts.url,
      type: 'POST',
      data: JSON.stringify(this.query.toJSON()),
      dataType: 'json',
      headers: {
        Authorization: `Basic ${btoa(this.opts.userinfo)}`,
        'Content-Type': 'application/json'
      },
      success(data) {
        if (!opts.success) {
          return;
        }

        const docs = data.hits.hits;
        return opts.success(Model.deserialize(docs), data);
      },
      error: opts.error
    });
  }
}

export default Client;

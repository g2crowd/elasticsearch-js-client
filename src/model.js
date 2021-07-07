class Model {
  static deserialize(hits) {
    return hits.map(({ _id: id, _source: source }) => ({ id, ...source }));
  }

  constructor(indexName, attributes) {
    this.indexName = indexName;
    this.attributes = attributes;
  }

  get storedFields() {
    return this.selectAttribute('stored', true).map((item) => item.name);
  }

  get textFields() {
    return this.selectAttribute('type', 'text').map((item) => item.name);
  }

  get fulltextFields() {
    return this.selectAttribute('fulltext', true).map((item) => {
      const boost = item.boost ? `^${item.boost}` : '';
      return item.name + boost;
    });
  }

  searchPath() {
    return `/${this.indexName}/_search`;
  }

  selectAttribute(key, value) {
    return Array.from(this.attributes).filter((item) => item[key] === value);
  }
}

export default Model;

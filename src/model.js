class Model {
  static deserialize(hits) {
    return hits.map(hit => Object.assign({ id: hit['_id'] }, hit._source));
  }

  constructor(indexName, attributes) {
    let item;
    this.indexName = indexName;
    this.attributes = attributes;
    this.storedFields = (() => {
      const result = [];
      for (item of Array.from(this.selectAttribute('stored', true))) {
        result.push(item.name);
      }
      return result;
    })();
    this.textFields = (() => {
      const result1 = [];
      for (item of Array.from(this.selectAttribute('type', 'text'))) {
        result1.push(item.name);
      }
      return result1;
    })();
    this.fulltextFields = (() => {
      const result2 = [];
      for (item of Array.from(this.selectAttribute('fulltext', true))) {
        const boost = item.boost ? `^${item.boost}` : '';
        result2.push(item.name + boost);
      }
      return result2;
    })();
  }

  searchPath() {
    return `/${this.indexName}/_search`;
  }

  selectAttribute(key, value) {
    return Array.from(this.attributes).filter(item => item[key] === value);
  }
}

export default Model;

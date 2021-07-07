import { beforeEach, describe, test, expect } from '@jest/globals';
import Model from '../src/model';

describe('Model', function () {
  let attributes = [
    { name: 'name', stored: true, type: 'text', fulltext: true, boost: 2 },
    { name: 'description', stored: true, type: 'text', fulltext: true },
    { name: 'validated', stored: false, type: 'boolean', fulltext: false }
  ];

  let model;

  beforeEach(function () {
    model = new Model('products', attributes);
  });

  describe('deserialize', function () {
    let hits = [
      { _id: 1, _source: { name: 'Salesforce', description: 'CRM product', validated: true } },
      { _id: 2, _source: { name: 'HubSpot', description: 'Marketing Automation product', validated: true } }
    ];

    test('returns deserialized hits', function () {
      expect(Model.deserialize(hits)).toEqual([
        { id: 1, name: 'Salesforce', description: 'CRM product', validated: true },
        { id: 2, name: 'HubSpot', description: 'Marketing Automation product', validated: true }
      ]);
    });
  });

  describe('storedFields', function () {
    test('returns stored fields', function () {
      expect(model.storedFields).toEqual(['name', 'description']);
    });
  });

  describe('textFields', function () {
    test('returns text fields', function () {
      expect(model.textFields).toEqual(['name', 'description']);
    });
  });

  describe('fulltextFields', function () {
    test('returns fulltext fields', function () {
      expect(model.fulltextFields).toEqual(['name^2', 'description']);
    });
  });

  describe('searchPath', function () {
    test('returns search path', function () {
      expect(model.searchPath()).toEqual('/products/_search');
    });
  });
});

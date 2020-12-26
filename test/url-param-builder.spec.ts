/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
import { expect } from 'chai';
import 'mocha';
import { UrlBuilder } from '../src/index';

describe('UrlParamBuilder', () => {

  const exampleUrl = 'https://localhost:8080';
  const examplePath = 'test';

  describe('#addQueryParam()', () => {
    it('should insert \'?\' to separate the first param from the path', () => {
      const url = UrlBuilder.create('localhost', 8080)
        .addPath(examplePath)
        .addQueryParam('foo', 'bar')
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?foo=bar`);
    });

    it('should insert \'&\' to separate query params from the second param onwards', () => {
      const url = UrlBuilder.create('localhost', 8080)
        .addPath(examplePath)
        .addQueryParam('foo', 'bar')
        .addQueryParam('baz', 'qux')
        .addQueryParam('quux', 'quuz')
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?foo=bar&baz=qux&quux=quuz`);
    });

    it('should allow numeric query params', () => {
      const url = UrlBuilder.create('localhost', 8080)
        .addPath(examplePath)
        .addQueryParam('foo', 1)
        .addQueryParam('bar', 2)
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?foo=1&bar=2`);
    });

    it('should allow boolean query params', () => {
      const url = UrlBuilder.create('localhost', 8080)
        .addPath(examplePath)
        .addQueryParam('foo', true)
        .addQueryParam('bar', false)
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?foo=true&bar=false`);
    });

    it('should JSON.stringify query params which are not of type string, number, boolean', () => {
      const obj = {
        foo: 'bar',
        baz: 0,
        qux: true,
      };
      const url = UrlBuilder.create('localhost', 8080)
        .addPath(examplePath)
        .addQueryParam('obj', obj)
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?obj={"foo":"bar","baz":0,"qux":true}`);
    });
  });
});

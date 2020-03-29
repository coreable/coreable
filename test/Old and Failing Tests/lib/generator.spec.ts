import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { generator } from '../../src/lib/generator';

describe('Test Data Generator [lib/generator.ts]', () => {

  it('should generate fake data and insert it into the database', async() => {
    return await generator();
  });

});

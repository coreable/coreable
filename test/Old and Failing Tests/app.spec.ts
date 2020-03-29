import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { app } from '../src/lib/express';

describe('Express [lib/express.ts]', () => {

  it('should be an applicaition', async() => {
    return expect(app).to.exist;
  });

}); 
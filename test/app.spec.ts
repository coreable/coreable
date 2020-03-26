import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { app } from '../src/app';
 
describe('Application [app.ts]', () => {

  it('should be an applicaition', async() => {
    return expect(app).to.exist;
  });

}); 
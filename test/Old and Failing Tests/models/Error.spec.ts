import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { CoreableError } from '../../src/models/CoreableError';

describe('Error Model [models/Error.ts]', () => {
  let coreableError: CoreableError;
  before((done) => {
    coreableError = new CoreableError();
    return done();
  });

  it('can set code to 123', () => {
    coreableError.code = "123";
    return expect(coreableError.code).to.equal("123");
  });

  it('can set path to field', () => {
    coreableError.path = "field";
    return expect(coreableError.path).to.equal("field");
  });

  it('can set message to unit testing', () => {
    coreableError.message = "unit testing";
    return expect(coreableError.message).to.equal("unit testing");
  });

});
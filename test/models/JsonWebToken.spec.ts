import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { JsonWebToken } from '../../src/models/JsonWebToken';

describe('Json Web Token Model [JsonWebToken.ts]', () => {
  let token: JsonWebToken;
  before((done) => {
    token = new JsonWebToken();
    return done();
  });

  it('can set token to \"unit testing\"', () => {
    token.token = "unit testing";
    return expect(token.token).to.equal("unit testing");
  });

  it('can set userID 1', () => {
    token.userID = 1
    return expect(token.userID).to.equal(1);
  });

  it('can set expiry date', () => {
    const expiry = new Date().getTime().valueOf();
    token.exp = expiry;
    return expect(token.exp).to.equal(expiry);
  });

  it('can set issued at', () => {
    const expiry = new Date().getTime().valueOf();
    token.iat = expiry;
    return expect(token.iat).to.equal(expiry);
  });

});
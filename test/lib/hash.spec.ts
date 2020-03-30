import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { generatePasswordHash, ROUNDS, JWT_SECRET, checkPassword, encodeJWT, decodeJWT } from '../../src/lib/hash';

describe('Hashing & JWT [src/lib/hash.ts]', () => {
  let rounds = ROUNDS;
  let secret = JWT_SECRET;
  let user = { userID: 1, email: "unit@test.com" };
  let password = '1234abc';
  let hash: string;
  let JWT: any;

  before(async() => {
    hash = await generatePasswordHash(password);
    return;
  })

  it('should hash a password', async() => {
    return expect(hash).to.not.equal(password);
  });

  it('should return true for correct password', async() => {
    let isValidPassword = await checkPassword(password, hash);
    return expect(isValidPassword).to.be.true;
  });

  it('should return false for an incorrect password', async() => {
    let isValidPassword = await checkPassword('abc1234', hash);
    return expect(isValidPassword).to.be.false;
  });

  it('should encode an object to JWT', async() => {
    JWT = await encodeJWT(user);
    return expect(JWT).to.be.a('string').but.not.an('object');
  });

  it('should decode a JWT to object', async() => {
    try {
      JWT = await decodeJWT(JWT);
    } catch (err) {
      return expect('1').to.equal('2');
    }
    return expect(JWT).to.be.a('object').but.not.a('string');
  });

  it('should reject a fake JWT', async() => {
    let fakeJWT = 'unittest';
    try {
      fakeJWT = await decodeJWT(fakeJWT);
    } catch(err) {
      return expect(true).to.equal(true);
    }
    return expect('1').to.equal('2');
  });

});
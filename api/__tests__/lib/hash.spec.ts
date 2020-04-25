/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/

import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { generatePasswordHash, checkPassword, encodeJWT, decodeJWT } from '../../lib/hash';

describe('Hashing & JWT [api/lib/hash.ts]', () => {
  let user = { _id: 1, email: "unit@test.com", manager: false };
  let password = '1234abc';
  let hash: string;
  let JWT: any;

  before(async() => {
    hash = await generatePasswordHash(password);
    return;
  });

  it('should allow a password to be hashed', async() => {
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

  it('should allow an object to be encoded to JWT', async() => {
    JWT = await encodeJWT(user);
    return expect(JWT).to.be.a('string').but.not.an('object');
  });

  it('should allow a valid a JWT to be decoded to an object', async() => {
    try {
      JWT = await decodeJWT(JWT);
    } catch (err) {
      return expect('1').to.equal('2');
    }
    return expect(JWT).to.be.a('object').but.not.a('string');
  });

  it('should reject a fake JWT from being decoded', async() => {
    let fakeJWT = 'unittest';
    try {
      fakeJWT = await decodeJWT(fakeJWT);
    } catch(err) {
      return expect(true).to.equal(true);
    }
    return expect('1').to.equal('2');
  });

});
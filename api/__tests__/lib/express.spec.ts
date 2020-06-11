/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Coreables source code is free software; you can redistribute it
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

import { server } from '../../server';

describe('Express [api/lib/express.ts]', () => {
  let sessionToken: any;

  before(async() => {
    await server._done;
    const res1 = await chai.request(server).post('/graphql').send({
      query: 
      `mutation {
        login(email:"u0@0.com", password: "unittest") {
          data {
            user {
              firstName
              email
              _id
            }
            token
          }
          errors {
            code
            path
            message
          }
        }
      }`
    });
    sessionToken = res1.body.data.login.data.token;
    return;
  });

  it('should return a status code of 404 (Not Found) for /', async() => {
    sessionToken;
    const res = await chai.request(server).get('/');
    return expect(res.status).to.equal(404);
  });

  it('should recognise a logged in user', async() => {
    const res = await chai.request(server).get('/graphQL').set('JWT', sessionToken).send({
      query: 
      `query {
        API {
          data {
            API {
              time,
              env
            }
          }
        }
      }`
    });
    return expect(res.header.jwt).to.exist.and.be.a('string');
  });

  it('should destroy an invalid session', async() => {
    const res = await chai.request(server).get('/graphQL').set('JWT', 'unittest').send({
      query: 
      `query {
        API {
          data {
            API {
              time,
              env
            }
          }
        }
      }`
    });
    return expect(res.header.jwt).to.not.exist;
  });

});
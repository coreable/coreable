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

import { server } from '../../../server';

describe('Me Query [api/queries/Me.ts]', () => { 
  let sessionToken: string;

  before(async() => {
    await server._done;
    const res = await chai.request(server).post('/graphQL').send({
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
    sessionToken = res.body.data.login.data.token;
    return;
  });

  it('should reject an unauthenticated user', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', 'unittest').send({
      query: 
      `query {
        me {
          data {
            user {
              firstName
            } 
          }
          errors {
            path
            code
            message
          }
        }
      }`
    });
    return expect(res.body.data.me).to.have.property('errors').and.not.have.property('data');
  });

  it('should return data for an authenticated user', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `query {
        me {
          data {
            user {
              firstName
            } 
          }
          errors {
            path
            code
            message
          }
        }
      }`
    });
    return expect(res.body.data.me).to.have.property('data').and.not.have.property('errors');
  });

});

import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { server } from '../../../server';

describe('Login Mutation [api/graphql/mutations/Login.ts]', () => {
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

  it('should allow a user with correct email and password to login', async() => {
    const res = await chai.request(server).post('/graphql').send({
      query: 
      `mutation {
        login(email:"u0@0.com", password: "unittest") {
          errors {
            message
            path
            code
          }
          data {
            user {
              _id
              email
              firstName
            }
            token
          }
        }
      }`
    });
    return expect(res.body.data.login).to.have.property('data').and.not.have.property('errors');
  });
 
  it('should reject an already authenticated user', async() => {
    const res = await chai.request(server).post('/graphql').set('JWT', sessionToken).send({
      query: 
      `mutation {
        login(email:"u0@0.com", password: "unittest") {
          errors {
            message
            path
            code
          }
          data {
            user {
              _id
              email
              firstName
            }
            token
          }
        }
      }`
    });
    return expect(res.body.data.login).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject an unknown email', async() => {
    const res = await chai.request(server).post('/graphql').send({
      query: 
      `mutation {
        login(email:"u99@99.com", password: "unittest") {
          errors {
            message
            path
            code
          }
          data {
            user {
              _id
              email
              firstName
            }
            token
          }
        }
      }`
    });
    return expect(res.body.data.login).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject an incorrect password', async() => {
    const res = await chai.request(server).post('/graphql').send({
      query: 
      `mutation {
        login(email:"u0@0.com", password: "unittest2") {
          errors {
            message
            path
            code
          }
          data {
            user {
              _id
              email
              firstName
            }
            token
          }
        }
      }`
    });
    return expect(res.body.data.login).to.have.property('errors').and.not.have.property('data');
  });

});

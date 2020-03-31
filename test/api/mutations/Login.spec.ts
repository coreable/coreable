import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../../src/models/User';
import { app } from '../../../src/lib/express';

describe('Login Mutation [src/api/mutations/Login.ts]', () => {
  let sessionToken: any;

  before(async() => {
    const res1 = await chai.request(app).post('/graphql').send({
      query: 
      `mutation {
        register(email:"unit@test.com", firstName: "unit", lastName: "test", password: "unittest") {
          data {
            user {
              firstName
              email
              userID
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
    sessionToken = res1.body.data.register.data.token;
    return;
  });
  
  after(async() => {
    await User.destroy({
      where: {
        email: 'unit@test.com',
      },
      force: true
    });
    return;
  });

  it('should allow a user with correct email and password to login', async() => {
    const res = await chai.request(app).post('/graphql').send({
      query: 
      `mutation {
        login(email:"unit@test.com", password: "unittest") {
          errors {
            message
            path
            code
          }
          data {
            user {
              userID
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
    const res = await chai.request(app).post('/graphql').set('JWT', sessionToken).send({
      query: 
      `mutation {
        login(email:"unit@test.com", password: "unittest") {
          errors {
            message
            path
            code
          }
          data {
            user {
              userID
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
    const res = await chai.request(app).post('/graphql').send({
      query: 
      `mutation {
        login(email:"unit2@test2.com", password: "unittest2") {
          errors {
            message
            path
            code
          }
          data {
            user {
              userID
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
    const res = await chai.request(app).post('/graphql').send({
      query: 
      `mutation {
        login(email:"unit@test.com", password: "unittest2") {
          errors {
            message
            path
            code
          }
          data {
            user {
              userID
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

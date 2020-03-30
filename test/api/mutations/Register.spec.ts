import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../../src/models/User';
import { app } from '../../../src/lib/express';

describe('Register [src/api/mutations/Register.ts]', () => {
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
    return true;
  });

  after(async() => {
    await User.destroy({
      where: {
        email: 'unit@test.com',
      },
      force: true
    });
    await User.destroy({
      where: {
        email: 'unit2@test2.com',
      },
      force: true
    });
    return;
  });

  it('should deny an already authenticated user from registering', async() => {
    const res = await chai.request(app).post('/graphql').set('JWT', sessionToken).send({
      query: 
      `mutation {
        register(email:"unit2@test2.com", firstName: "unit2", lastName: "test2", password: "unittest2") {
          data {
            user {
              firstName
              email
              userID
            }
          }
          errors {
            code
            path
            message
          }
        }
      }`
    });
    return expect(res.body.data.register).to.have.property('errors').and.not.have.property('data');
  });

  it('should allow an unauthenticated user to register with a unique email', async() => {
    const res = await chai.request(app).post('/graphql').send({
      query: 
      `mutation {
        register(email:"unit2@test2.com", firstName: "unit2", lastName: "test2", password: "unittest2") {
          data {
            user {
              firstName
              email
              userID
            }
          }
          errors {
            code
            path
            message
          }
        }
      }`
    });
    return expect(res.body.data.register).to.have.property('data').and.not.have.property('errors');
  });

  it('should reject an unauthenticated user to register with a unique email but a short password', async() => {
    const res = await chai.request(app).post('/graphql').send({
      query: 
      `mutation {
        register(email:"unit2@test2.com", firstName: "unit2", lastName: "test2", password: "unit") {
          data {
            user {
              firstName
              email
              userID
            }
          }
          errors {
            code
            path
            message
          }
        }
      }`
    });
    return expect(res.body.data.register).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject an unauthenticated user to register with a non unique email', async() => {
    const res = await chai.request(app).post('/graphql').send({
      query: 
      `mutation {
        register(email:"unit@test.com", firstName: "unit", lastName: "test", password: "unittest") {
          data {
            user {
              firstName
              email
              userID
            }
          }
          errors {
            code
            path
            message
          }
        }
      }`
    });
    return expect(res.body.data.register).to.have.property('errors').and.not.have.property('data');
  });

});
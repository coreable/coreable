import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../../models/User';
import { server } from '../../../server';

describe('Register Mutation [api/graphql/mutations/Register.ts]', () => {
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
    return true;
  });

  after(async() => {
    await User.destroy({
      where: {
        email: 'unit2@test2.com',
      }
    });
    return;
  });

  it('should reject an already authenticated user from registering', async() => {
    const res = await chai.request(server).post('/graphql').set('JWT', sessionToken).send({
      query: 
      `mutation {
        register(email:"unit2@test2.com", firstName: "unit2", lastName: "test2", password: "unittest2") {
          data {
            user {
              firstName
              email
              _id
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
    const res = await chai.request(server).post('/graphql').send({
      query: 
      `mutation {
        register(email:"unit2@test2.com", firstName: "unit2", lastName: "test2", password: "unittest2") {
          data {
            user {
              firstName
              email
              _id
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
    const res = await chai.request(server).post('/graphql').send({
      query: 
      `mutation {
        register(email:"unit@test.com", firstName: "unit2", lastName: "test2", password: "unit") {
          data {
            user {
              firstName
              email
              _id
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
    const res = await chai.request(server).post('/graphql').send({
      query: 
      `mutation {
        register(email:"unit2@test2.com", firstName: "unit", lastName: "test", password: "unittest") {
          data {
            user {
              firstName
              email
              _id
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
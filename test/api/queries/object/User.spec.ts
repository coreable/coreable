import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import { app } from '../../../../src/lib/express';
import chaiHttp from 'chai-http';
import { User } from '../../../../src/models/User';

chai.use(chaiHttp); 

describe('User Object Query [api/queries/object/User.ts]', () => { 
  let sessionToken: string;

  before(async() => {
    const res = await chai.request(app).post('/graphQL').send({
      query: 
      `mutation {
        register(email:"unit@test.com", firstName: "unit", lastName: "test", password: "unittest") {
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
    sessionToken = res.body.data.register.data.token;
    return;
  });

  after(async() => {
    return await User.destroy({ where: { 'email': 'unit@test.com' }});
  });

  it('should deny an unauthenticated user', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', 'fakeSession').send({
      query: 
      `query {
        user (email: "unit@test.com") {
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
    return expect(res.body.data.user).to.have.property('errors').and.not.have.property('data');
  });

  it('should accept an authenticated user', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `query {
        user(email: "unit@test.com") {
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
    return expect(res.body.data.user).to.have.property('data').and.not.have.property('errors');
  });

  it('reject an authenticated user with no query parameter', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `query {
        user {
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
    return expect(res.body.data.user).to.have.property('errors').and.not.have.property('data');
  });

  it('should notify a user with an invalid email doesn\'t exist', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `query {
        user(email: "aaaaaa") {
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
    return expect(res.body.data.user).to.have.property('errors').and.not.have.property('data');
  });

});
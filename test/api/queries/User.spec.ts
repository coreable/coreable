import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { server } from '../../../src/lib/startup';
import chaiHttp from 'chai-http';
import { User } from '../../../src/models/User';
import { userInfo } from 'os';

chai.use(chaiHttp);

describe('User Query [api/queries/User.ts]', () => { 
  let sessionToken: string;

  before(async() => {
    await server.load;
    const res = await chai.request(server).post('/graphQL').send({
      query: 
      `mutation {
        register(firstName:"unit", lastName: "test", email: "unit@test.com", password:"unittest") {
          errors{
            code,
            path,
            message,
          }
          result {
            user {
              email,
              firstName,
              userID,
            }
            session {
              token
            }
          }
        }
      }`
    });
    sessionToken = res.body.data.register.result.session.token;
    return;
  });

  after(async() => {
    return await User.destroy({ where: { 'email': 'unit@test.com' }});
  });

  it('should deny an unauthenticated user', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', 'fakeSession').send({
      query: 
      `query {
        user {
          result {
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
    return expect(res.body.data.user.result).to.not.exist;
  });

  it('should accept an authenticated user', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `query {
        user {
          result {
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
    return expect(res.body.data.user.result).to.exist;
  });

  it('should not return a user with an invalid email', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `query {
        user(email: "aaaaaa") {
          result {
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
    return expect(res.body.data.user.errors).to.exist;
  });

});
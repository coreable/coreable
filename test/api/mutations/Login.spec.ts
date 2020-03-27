import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { server } from '../../../src/server';
import chaiHttp from 'chai-http';
import { User } from '../../../src/models/User';

chai.use(chaiHttp);

describe('Login Mutation [api/mutations/Login.ts]', () => { 
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

  it('should login with a valid email and password', async() => {
    const res = await chai.request(server).post('/graphQL').send({
      query: `mutation {
        login(email:"unit@test.com", password: "unittest") {
          errors {
            message,
            path,
            code,
          }
          result {
            user {
              firstName,
              email,
              userID,
            }
            session {
              token
            }
          }
        }
      }`
    });
    sessionToken = res.body.data.login.result.session.token;
    return expect(res.body.data.login.result).to.exist;
  });

  it('should not login with an invalid email', async() => {
    const res = await chai.request(server).post('/graphQL').send({
      query: `mutation {
        login(email:"login2@test.com", password: "unittest") {
          errors {
            message,
            path,
            code,
          }
          result {
            user {
              firstName,
              email,
              userID,
            }
            session {
              token
            }
          }
        }
      }`
    });
    return expect(res.body.data.login.result).to.not.exist;
  });

  it('should not login with an invalid pasword', async() => {
    const res = await chai.request(server).post('/graphQL').send({
      query: `mutation {
        login(email:"unit@test.com", password: "2") {
          errors {
            message,
            path,
            code,
          }
          result {
            user {
              firstName,
              email,
              userID,
            }
            session {
              token
            }
          }
        }
      }`
    });
    return expect(res.body.data.login.result).to.not.exist;
  });

  it('should not login with an already logged in user', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query: `mutation {
        login(email:"unit@test.com", password: "unittest") {
          errors {
            message,
            path,
            code,
          }
          result {
            user {
              firstName,
              email,
              userID,
            }
            session {
              token
            }
          }
        }
      }`
    });
    return expect(res.body.data.login.result).to.not.exist;
  });

});
import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { server } from '../../../src/server';
import chaiHttp from 'chai-http';
import { User } from '../../../src/models/User';

chai.use(chaiHttp);

describe('Register Mutation [api/mutations/Register.ts]', () => { 
  let sessionToken: string;

  before(async() => {
    return await server.load;
  });

  after(async() => {
    return await User.destroy({ where: { 'email': 'unit@test.com' }});
  });

  it('should register a valid form submission', async() => {
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
    return expect(res.body.data.register.result.user).to.exist.and;
  });

  it('should not register a previously register email address', async() => {
    const res = await chai.request(server).post('/graphQL').send({
      query: `mutation {
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
    return expect(res.body.data.register.result).to.not.exist;
  });

  it('should deny a short password', async() => {
    const res = await chai.request(server).post('/graphQL').send({
      query: `mutation {
        register(firstName:"unit", lastName: "test", email: "unit@test.com", password:"test") {
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
    return expect(res.body.data.register.result).to.not.exist;
  });

  it('should not register with an already logged in user', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query: `mutation {
        register(firstName:"unit", lastName: "test", email: "unit@test.com", password:"test") {
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
    return expect(res.body.data.register.result).to.not.exist;
  });
});
import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { server } from '../../../src/server';
import chaiHttp from 'chai-http';
import { User } from '../../../src/models/User';
import { userInfo } from 'os';

chai.use(chaiHttp);

describe('Me Query [api/queries/Me.ts]', () => { 
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

  it('should return a logged in users information', async() => {
    const res = await chai.request(server).get('/graphQL').set('JWT', sessionToken).send({
      query: 
      `query {
        me {
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
    return expect(res.body.data.me.result).to.exist;
  });

  it('should not return information for an un-authenticated user', async() => {
    const res = await chai.request(server).get('/graphQL').send({
      query: 
      `query {
        me {
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
    return expect(res.body.data.me.result).to.not.exist;
  });

});

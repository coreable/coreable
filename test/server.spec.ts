import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import server from '../src/';
import chaiHttp from 'chai-http';
import { User } from '../src/models/User';

chai.use(chaiHttp);

describe('HTTP server [server.ts]', () => {
  let sessionToken: string;

  before(async() => {
    return await server;
  });

  after(async() => { 
    return await User.destroy({ where: { 'email': 'unt@test.com' }});
  });

  it('should start a HTTP server', async() => {
    const res = await chai.request(server).get('/');
    return expect(res.status).to.equal(404);
  }); 

  it('should start a graphQL server', async() => {
    const res = await chai.request(server).get('/graphQL').send({
      query: 'query { API { result { API { time, mode } } } }'
    });
    return expect(res.status).to.equal(200);
  });

  it('should register a user', async() => {
    const res = await chai.request(server).post('/graphQL').send({
      query: 
      `mutation {
        register(firstName:"unit", lastName: "test", email: "unt@test.com", password:"unittest") {
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
    return expect(res.status).to.equal(200);
  });

  it('should login with the user', async() => {
    const res = await chai.request(server).post('/graphQL').send({
      query: 
      `mutation {
        login(email:"unt@test.com", password: "unittest") {
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
    return expect(res.status).to.equal(200);
  });

  it('should recognise a logged in user', async() => {
    const res = await chai.request(server).get('/graphQL').set('JWT', sessionToken).send({ query: 'query { API { result { API { time, mode } } } }' });
    return expect(res.header.jwt).to.equal(sessionToken);
  });

  it('should destory an invalid session', async() => {
    const res = await chai.request(server).get('/graphQL').set('JWT', 'fakeSession').send({ query: 'query { API { result { API { time, mode } } } }' });
    return expect(res.header.jwt).to.not.exist;
  });

});
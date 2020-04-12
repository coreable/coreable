import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { server } from '../../server';

describe('Express [api/lib/express.ts]', () => {
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

  it('should return a status code of 404 (Not Found) for /', async() => {
    sessionToken;
    const res = await chai.request(server).get('/');
    return expect(res.status).to.equal(404);
  });

  it('should recognise a logged in user', async() => {
    const res = await chai.request(server).get('/graphQL').set('JWT', sessionToken).send({
      query: 
      `query {
        API {
          data {
            API {
              time,
              env
            }
          }
        }
      }`
    });
    return expect(res.header.jwt).to.exist.and.be.a('string');
  });

  it('should destroy an invalid session', async() => {
    const res = await chai.request(server).get('/graphQL').set('JWT', 'unittest').send({
      query: 
      `query {
        API {
          data {
            API {
              time,
              env
            }
          }
        }
      }`
    });
    return expect(res.header.jwt).to.not.exist;
  });

});
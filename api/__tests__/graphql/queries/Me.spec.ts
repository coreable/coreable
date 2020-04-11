import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

import { server } from '../../../server';

describe('Me Query [api/queries/Me.ts]', () => { 
  let sessionToken: string;

  before(async() => {
    await server._done;
    const res = await chai.request(server).post('/graphQL').send({
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
    sessionToken = res.body.data.login.data.token;
    return;
  });

  it('should reject an unauthenticated user', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', 'unittest').send({
      query: 
      `query {
        me {
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
    return expect(res.body.data.me).to.have.property('errors').and.not.have.property('data');
  });

  it('should return data for an authenticated user', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `query {
        me {
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
    return expect(res.body.data.me).to.have.property('data').and.not.have.property('errors');
  });

});

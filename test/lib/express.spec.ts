import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../src/models/User';
import { app } from '../../src/lib/express';

describe('Express [src/express.ts]', () => {
  let sessionToken: any;

  before(async() => {
    const user = await User.create({
      firstName: 'unit',
      lastName: 'test',
      email: 'unit@test.com',
      password: 'unittest'
    });
    const res = await chai.request(app).post('/graphql').send({
      query: 
      `mutation {
        login(email:"unit@test.com", password: "unittest") {
          errors {
            message
            path
            code
          }
          data {
            user {
              userID
              email
              firstName
            }
            token
          }
        }
      }`
    });
    sessionToken = res.body.data.login.data.token;
    return;
  });

  after(async() => {
    return await User.destroy({
      where: {
        firstName: 'unit',
        lastName: 'test',
        email: 'unit@test.com',
      }
    });
  });

  it('should be an express application', async() => {
    return expect(app).to.exist;
  });

  it('should return a status code of 404 (Not Found) for /', async() => {
    const res = await chai.request(app).get('/');
    return expect(res.status).to.equal(404);
  });

  it('should recognise a logged in user', async() => {
    const res = await chai.request(app).get('/graphQL').set('JWT', sessionToken).send({
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
    const res = await chai.request(app).get('/graphQL').set('JWT', 'unittest').send({
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

  it('should return a status code of 200 (OK) for /graphQL', async() => {
    const res = await chai.request(app).get('/graphQL').send({
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
    return expect(res.body.data.API).to.have.property('data').and.not.have.property('errors');
  });

});
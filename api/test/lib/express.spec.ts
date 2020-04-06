import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../models/User';
import { sequelize } from '../../lib/sequelize';
import { app } from '../../lib/express';

describe('Express [api/lib/express.ts]', () => {
  let sessionToken: any;

  before(async() => {
    const res1 = await chai.request(app).post('/graphql').send({
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
    sessionToken = res1.body.data.register.data.token;
    return;
  });

  beforeEach(() => {
    sequelize.models.User.clearCacheAll();
  });

  after(async() => {
    await User.destroy({
      where: {
        email: 'unit@test.com',
      },
      force: true
    });
    return;
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
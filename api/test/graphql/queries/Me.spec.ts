import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import { app } from '../../lib/express';
import chaiHttp from 'chai-http';
import { User } from '../../models/User';

chai.use(chaiHttp);

import { sequelize } from '../../lib/sequelize';

describe('Me Query [api/queries/Me.ts]', () => { 
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

  beforeEach(() => {
    sequelize.models.User.clearCacheAll();
  });


  after(async() => {
    return await User.destroy({ where: { 'email': 'unit@test.com' }});
  });

  it('should deny an unauthenticated user', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', 'fakeSession').send({
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

  it('should accept an authenticated user', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
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

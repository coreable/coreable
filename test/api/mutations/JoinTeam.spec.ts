import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../../src/models/User';
import { app } from '../../../src/lib/express';
import { Team } from '../../../src/models/Team';

describe('JoinTeam [src/api/mutations/JoinTeam.ts]', () => {
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

  it('should let an authenticated user join a group they\'re not already in', async() => {
    const team: any = await Team.findOne();
    const res = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        joinTeam(inviteCode:"${team.inviteCode}") {
          data {
            user {
              firstName
              email
              teams {
                teamName
              }
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
    return expect(res.body.data.joinTeam).to.have.property('data').and.not.have.property('errors');
  });

});
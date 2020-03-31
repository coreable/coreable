import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../../src/models/User';
import { app } from '../../../src/lib/express';
import { Team } from '../../../src/models/Team';

describe('JoinTeam Mutation [src/api/mutations/JoinTeam.ts]', () => {
  let sessionToken: any;
  let team: any;

  before(async() => {
    const res1 = await chai.request(app).post('/graphql').send({
      query: 
      `mutation {
        register(email:"unit@test.com", firstName: "unit", lastName: "test", password: "unittest") {
          data {
            user {
              firstName
              email
              userID
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
    team = await Team.findOne();
    return;
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

  it('should let an authenticated user join a team they\'re not in', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        joinTeam(inviteCode: "${team.inviteCode}") {
          data {
            user {
              firstName
              email
              teams {
                teamID
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

  it('should deny an unauthenticated user joining a team', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', 'unittest').send({
      query: 
      `mutation {
        joinTeam(inviteCode: "${team.inviteCode}") {
          data {
            user {
              firstName
              email
              teams {
                teamID
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
    return expect(res.body.data.joinTeam).to.have.property('errors').and.not.have.property('data');
  });

  it('should deny an authenticated user joining an unknown team', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        joinTeam(inviteCode: "unittest") {
          data {
            user {
              firstName
              email
              teams {
                teamID
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
    return expect(res.body.data.joinTeam).to.have.property('errors').and.not.have.property('data');
  });

  it('should not let an authenticated user join a team they\'re already in', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        joinTeam(inviteCode: "${team.inviteCode}") {
          data {
            user {
              firstName
              email
              teams {
                teamID
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
    return expect(res.body.data.joinTeam).to.have.property('errors').and.not.have.property('data');
  });


});
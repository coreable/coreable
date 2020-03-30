import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../../src/models/User';
import { app } from '../../../src/lib/express';
import { Team } from '../../../src/models/Team';
import { Op } from 'sequelize';

describe('LeaveTeam [src/api/mutations/LeaveTeam.ts]', () => {
  let sessionToken: any;
  // let user: any;
  // let userTeams: any;
  let targetTeam: any;
  let notTargetTeam: any;

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
    targetTeam = await Team.findOne();
    notTargetTeam = await Team.findOne({ where: { teamID: { [Op.not]: targetTeam.teamID }} });
    const res3 = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        joinTeam(inviteCode: "${targetTeam.inviteCode}") {
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

  it('should reject an unauthenticated user', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', 'unittest').send({
      query: 
      `mutation {
        leaveTeam(teamID: "${targetTeam.teamID}") {
          data {
            user {
              firstName
              userID
              teams {
                teamID
                teamName
              }
            }
          }
          errors {
            code
            path
            message
          }
        }
      }`
    });
    return expect(res.body.data.leaveTeam).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject an authenticated user leaving an unknown team', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        leaveTeam(teamID: "unittest") {
          data {
            user {
              firstName
              userID
              teams {
                teamID
                teamName
              }
            }
          }
          errors {
            code
            path
            message
          }
        }
      }`
    });
    return expect(res.body.data.leaveTeam).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject an authenticated user leaving a team they\'re not in', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        leaveTeam(teamID: "${notTargetTeam.teamID}") {
          data {
            user {
              firstName
              userID
              teams {
                teamID
                teamName
              }
            }
          }
          errors {
            code
            path
            message
          }
        }
      }`
    });
    return expect(res.body.data.leaveTeam).to.have.property('errors').and.not.have.property('data');
  });

  it('should allow an authenticated user to leave a team they\'re in', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        leaveTeam(teamID: "${targetTeam.teamID}") {
          data {
            user {
              firstName
              userID
              teams {
                teamID
                teamName
              }
            }
          }
          errors {
            code
            path
            message
          }
        }
      }`
    });
    console.log(res.body.data.leaveTeam.errors);
    return expect(res.body.data.leaveTeam).to.have.property('data').and.not.have.property('errors');
  });


});
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../../models/User';
import { app } from '../../../lib/express';
import { Team } from '../../../models/Team';
import { Op } from 'sequelize';

describe('LeaveTeam Mutation [api/graphql/mutations/LeaveTeam.ts]', () => {
  let sessionToken: any;
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
    targetTeam = await Team.findOne();
    notTargetTeam = await Team.findOne({ where: { _id: { [Op.not]: targetTeam._id }} });
    await chai.request(app).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        joinTeam(inviteCode: "${targetTeam.inviteCode}") {
          data {
            user {
              firstName
              email
              teams {
                _id
                name
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
        leaveTeam(team_id: "${targetTeam._id}") {
          data {
            user {
              firstName
              _id
              teams {
                _id
                name
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
        leaveTeam(team_id: "unittest") {
          data {
            user {
              firstName
              _id
              teams {
                _id
                name
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
        leaveTeam(team_id: "${notTargetTeam._id}") {
          data {
            user {
              firstName
              _id
              teams {
                _id
                name
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
        leaveTeam(team_id: "${targetTeam._id}") {
          data {
            user {
              firstName
              _id
              teams {
                _id
                name
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
    return expect(res.body.data.leaveTeam).to.have.property('data').and.not.have.property('errors');
  });


});
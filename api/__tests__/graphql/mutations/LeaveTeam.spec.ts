import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../../models/User';
import { server } from '../../../server';
import { Team } from '../../../models/Team';
import { Op } from 'sequelize';

describe('LeaveTeam Mutation [api/graphql/mutations/LeaveTeam.ts]', () => {
  let sessionToken: any;
  let targetTeam: any;
  let user: any;
  let notTargetTeam: any;

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
    user = await User.findOne({ where: { email: 'u0@0.com' }, include: [{ model: Team, as: 'teams' }] });
    let teamIds = [];
    for (const teams of user.teams) {
      teamIds.push(teams._id);
    }
    targetTeam = await Team.findOne({ where: { _id: { [Op.notIn]: teamIds } }});
    teamIds.push(targetTeam._id);
    notTargetTeam = await Team.findOne({ where: { _id: { [Op.notIn]: teamIds }} });
    return await user.addTeam(targetTeam);
  });

  after(async() => {
    try {
      return await user.removeTeam(targetTeam);
    } catch (err) {
      return true;
    }
  });

  it('should reject an unauthenticated user', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', 'unittest').send({
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
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
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
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
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
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
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
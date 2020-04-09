import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { server } from '../../../server';
import { User } from '../../../models/User';
import { Team } from '../../../models/Team';

import { Op } from 'sequelize';

describe('JoinTeam Mutation [api/graphql/mutations/JoinTeam.ts]', () => {
  let sessionToken: any;
  let team: any;
  let user: any;

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
    team = await Team.findOne({ where: { _id: { [Op.notIn]: teamIds } }});
    return;
  });

  after(async() => {
    return await user.removeTeam(team);
  });

  it('should allow an authenticated user join a team they\'re not in', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        joinTeam(inviteCode: "${team.inviteCode}") {
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
    return expect(res.body.data.joinTeam).to.have.property('data').and.not.have.property('errors');
  });

  it('should reject an unauthenticated user joining a team', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', 'unittest').send({
      query: 
      `mutation {
        joinTeam(inviteCode: "${team.inviteCode}") {
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
    return expect(res.body.data.joinTeam).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject an authenticated user joining an unknown team', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        joinTeam(inviteCode: "unittest") {
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
    return expect(res.body.data.joinTeam).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject an authenticated user join a team they\'re already in', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query: 
      `mutation {
        joinTeam(inviteCode: "${team.inviteCode}") {
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
    return expect(res.body.data.joinTeam).to.have.property('errors').and.not.have.property('data');
  });


});
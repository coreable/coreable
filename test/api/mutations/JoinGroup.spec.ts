import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { server } from '../../../src/server';
import chaiHttp from 'chai-http';
import { User } from '../../../src/models/User';
import { Group } from '../../../src/models/Group';

chai.use(chaiHttp);

describe('JoinGroup Mutation [api/mutations/JoinGroup.ts]', () => { 
  let sessionToken: string;
  let user: any;
  let group: any;
  let user2: any;
  let group2: any;

  before(async() => {
    await server.load;
    group = await Group.create({
      groupName: 'unitTest',
      groupLeaderID: 1,
      inviteCode: '123',
      industryID: 1,
    });
    const res = await chai.request(server).post('/graphQL').send({
      query: 
      `mutation {
        register(firstName:"unit", lastName: "test", email: "unit@test.com", password:"unittest") {
          errors{
            code,
            path,
            message,
          }
          result {
            user {
              email,
              firstName,
              userID,
            }
            session {
              token
            }
          }
        }
      }`
    });
    user = res.body.data.register.result.user;
    sessionToken = res.body.data.register.result.session.token;
    group2 = await Group.create({
      groupName: 'unitTest2',
      groupLeaderID: res.body.data.register.result.user.userID,
      inviteCode: '1234',
      industryID: 1,
    });
    user2 = await User.create({
      firstName: 'unit',
      lastName: 'test',
      password: 'unittest',
      email: 'unit2@test2.com'
    });
    return;
  });

  it('should let a user join a group with the correct invite code', async() => {
    let res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query:
      `mutation {
        joinGroup(userID: ${user.userID}, inviteCode: "123") {
          result {
            user {
              userID
            }
            group{
              groupName
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
    return expect(res.body.data.joinGroup.result).to.exist;
  });

  it('should deny a user joining a group with the incorrect invite code', async() => {
    let res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query:
      `mutation {
        joinGroup(userID: ${user.userID}, inviteCode: "abc") {
          result {
            user {
              userID
            }
            group{
              groupName
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
    return expect(res.body.data.joinGroup.errors).to.exist;
  });

  it('should deny an unauthenticated user joining a group', async() => {
    let res = await chai.request(server).post('/graphQL').send({
      query:
      `mutation {
        joinGroup(userID: ${user.userID}, inviteCode: "123") {
          result {
            user {
              userID
            }
            group{
              groupName
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
    return expect(res.body.data.joinGroup.result).to.not.exist;
  });

  it('should deny an unknown user joining a group', async() => {
    let res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query:
      `mutation {
        joinGroup(userID: -99999, inviteCode: "123") {
          result {
            user {
              userID
            }
            group{
              groupName
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
    return expect(res.body.data.joinGroup.result).to.not.exist;
  });

  it('should let the group leader join the group', async() => {
    let res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query:
      `mutation {
        joinGroup(userID: ${user.userID}, inviteCode: "1234") {
          result {
            user {
              userID
            }
            group{
              groupName
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
    return expect(res.body.data.joinGroup.result).to.exist;
  });

  it('should deny a user joining a group twice', async() => {
    let res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query:
      `mutation {
        joinGroup(userID: ${user.userID}, inviteCode: "123") {
          result {
            user {
              userID
            }
            group{
              groupName
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
    return expect(res.body.data.joinGroup.result).to.not.exist;
  });

  it('should deny an authenticated user making another user join a group with the correct invite code', async() => {
    let res = await chai.request(server).post('/graphQL').set('JWT', sessionToken).send({
      query:
      `mutation {
        joinGroup(userID: ${user2.userID}, inviteCode: "123") {
          result {
            user {
              userID
            }
            group{
              groupName
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
    return expect(res.body.data.joinGroup.errors).to.exist;
  });

  after(async() => {
    await Group.destroy({ where: { 'groupName': 'unitTest' }});
    await Group.destroy({ where: { 'groupName': 'unitTest2' }});
    await User.destroy({ where: { 'email': 'unit@test.com' }});
    await User.destroy({ where: { 'email': 'unit2@test2.com' }});
  });

});

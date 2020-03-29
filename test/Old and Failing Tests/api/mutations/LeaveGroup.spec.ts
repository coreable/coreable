// import mocha, { describe, it } from 'mocha';
// import chai, { expect, assert } from 'chai';
// import { server } from '../../../src/lib/startup';
// import chaiHttp from 'chai-http';
// import { User } from '../../../src/models/User';
// import { Team } from '../../../src/models/Team';

// chai.use(chaiHttp);

// describe('LeaveGroup Mutation [api/mutations/LeaveGroup.ts]', () => { 
//   let user1: any; // leader of group 1
//   let sessionToken1: string; // user 1's login token
//   let group1: any; // user 1's group
//   let team1: any; // the relation between user 1 and group 1

//   let user2: any; // member of group 2
//   let sessionToken2: string; // user 2's login session
//   let group2: any; // a group belonging to someone unknown
//   let team2: any; // the relation between user2 and group2

//   // before(async() => {
//   //   await server.load;
//   //   // user 1
//   //   user1 = await User.create({
//   //     firstName: 'unit',
//   //     lastName: 'test',
//   //     email: 'unit@test.com',
//   //     password: 'unittest',
//   //     industryID: 1,
//   //     root: 0
//   //   });
//   //   group1 = await Group.create({
//   //     groupName: 'unitTest1',
//   //     groupLeaderID: user1.userID,
//   //     industryID: 1,
//   //     inviteCode: 'unitTest1'
//   //   });
//   //   const res1 = await chai.request(server).post('/graphQL').send({
//   //     query: 
//   //     `mutation {
//   //       login(email:"unit@test.com", password: "unittest") {
//   //         errors {
//   //           message,
//   //           path,
//   //           code,
//   //         }
//   //         result {
//   //           user {
//   //             firstName,
//   //             email,
//   //             userID,
//   //           }
//   //           session {
//   //             token
//   //           }
//   //         }
//   //       }
//   //     }`
//   //   });
//   //   sessionToken1 = res1.body.data.login.result.session.token;

//   //   // user 2
//   //   user2 = await User.create({
//   //     firstName: 'unit2',
//   //     lastName: 'test2',
//   //     email: 'unit2@test2.com',
//   //     password: 'unittest',
//   //     industryID: 1,
//   //     root: 0
//   //   });
//   //   group2 = await Group.create({
//   //     groupName: 'unitTest2',
//   //     groupLeaderID: 2,
//   //     industryID: 1,
//   //     inviteCode: 'unitTest2'
//   //   });
//   //   const res2 = await chai.request(server).post('/graphQL').send({
//   //     query: 
//   //     `mutation {
//   //       login(email:"unit2@test2.com", password: "unittest") {
//   //         errors {
//   //           message,
//   //           path,
//   //           code,
//   //         }
//   //         result {
//   //           user {
//   //             firstName,
//   //             email,
//   //             userID,
//   //           }
//   //           session {
//   //             token
//   //           }
//   //         }
//   //       }
//   //     }`
//   //   });
//   //   sessionToken2 = res2.body.data.login.result.session.token;
//   //   return;
//   // });

//   // after(async() => {
//   //   await Group.destroy({ where: { 'groupName': 'unitTest1' }});
//   //   await Group.destroy({ where: { 'groupName': 'unitTest2' }});
//   //   await User.destroy({ where: { 'email': 'unit@test.com' }});
//   //   await User.destroy({ where: { 'email': 'unit2@test2.com' }});
//   // });

//   // beforeEach(async() => {
//   //   team1 = await Team.create({
//   //     userID: user1.userID,
//   //     groupID: group1.groupID
//   //   });
//   //   team2 = await Team.create({
//   //     userID: user2.userID,
//   //     groupID: group2.groupID
//   //   });
//   //   return;
//   // });

//   // afterEach(async() => {
//   //   await Team.destroy({ where: { 'userID': user1.userID, 'groupID': group1.groupID }});
//   //   await Team.destroy({ where: { 'userID': user2.userID, 'groupID': group2.groupID }});
//   // });

//   it.skip('should let a user leave their group', async() => {
//     const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken2).send({
//       query: 
//       `mutation {
//         leaveGroup(userID: ${user2.userID}, groupID: ${group2.groupID}) {
//           result {
//             user {
//               userID
//               firstName
//             }
//             group {
//               groupID
//               groupName
//             }
//           }
//           errors {
//             path
//             code
//             message
//           }
//         }
//       }`
//     });
//     return expect(res.body.data.leaveGroup.result).to.exist;
//   });

//   it.skip('should not let the group leader leave the group', async() => {
//     const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken1).send({
//       query: 
//       `mutation {
//         leaveGroup(userID: ${user1.userID}, groupID: ${group1.groupID}) {
//           result {
//             user {
//               userID
//               firstName
//             }
//             group {
//               groupID
//               groupName
//             }
//           }
//           errors {
//             path
//             code
//             message
//           }
//         }
//       }`
//     });
//     return expect(res.body.data.leaveGroup.errors).to.exist;
//   });

//   it.skip('should not let an unauthenticated user leave a group', async() => {
//     const res = await chai.request(server).post('/graphQL').send({
//       query: 
//       `mutation {
//         leaveGroup(userID: ${user2.userID}, groupID: ${group2.groupID}) {
//           result {
//             user {
//               userID
//               firstName
//             }
//             group {
//               groupID
//               groupName
//             }
//           }
//           errors {
//             path
//             code
//             message
//           }
//         }
//       }`
//     });
//     return expect(res.body.data.leaveGroup.errors).to.exist;
//   });

//   it.skip('should not let a user make another user leave a group', async() => {  
//     const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken1).send({
//       query: 
//       `mutation {
//         leaveGroup(userID: ${user2.userID}, groupID: ${group2.groupID}) {
//           result {
//             user {
//               userID
//               firstName
//             }
//             group {
//               groupID
//               groupName
//             }
//           }
//           errors {
//             path
//             code
//             message
//           }
//         }
//       }`
//     });
//     return expect(res.body.data.leaveGroup.errors).to.exist;
//   });

//   it.skip('should not let a user leave a group they\'re not in', async() => {
//     const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken1).send({
//       query: 
//       `mutation {
//         leaveGroup(userID: ${user1.userID}, groupID: ${group2.groupID}) {
//           result {
//             user {
//               userID
//               firstName
//             }
//             group {
//               groupID
//               groupName
//             }
//           }
//           errors {
//             path
//             code
//             message
//           }
//         }
//       }`
//     });
//     return expect(res.body.data.leaveGroup.errors).to.exist;
//   });

//   it.skip('should not let an unknown user leave the group', async() => {
//     const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken1).send({
//       query: 
//       `mutation {
//         leaveGroup(userID: -999, groupID: ${group1.groupID}) {
//           result {
//             user {
//               userID
//               firstName
//             }
//             group {
//               groupID
//               groupName
//             }
//           }
//           errors {
//             path
//             code
//             message
//           }
//         }
//       }`
//     });
//     return expect(res.body.data.leaveGroup.errors).to.exist;
//   });

//   it.skip('should not let a user leave an unknown group', async() => {
//     const res = await chai.request(server).post('/graphQL').set('JWT', sessionToken1).send({
//       query: 
//       `mutation {
//         leaveGroup(userID: ${user1.userID}, groupID: -99) {
//           result {
//             user {
//               userID
//               firstName
//             }
//             group {
//               groupID
//               groupName
//             }
//           }
//           errors {
//             path
//             code
//             message
//           }
//         }
//       }`
//     });
//     return expect(res.body.data.leaveGroup.errors).to.exist;
//   });

// });
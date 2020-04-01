import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../../src/models/User';
import { app } from '../../../src/lib/express';
import { Team } from '../../../src/models/Team';
import { Review } from '../../../src/models/Review';

describe('SubmitReview Mutation [src/api/mutations/SubmitReview.ts]', () => {
  let user1ID: any;
  let session1Token: any;
  let user2ID: any;
  let session2Token: any;
  let commonTeam: any;
  let user3ID: any;

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
    session1Token = res1.body.data.register.data.token;
    user1ID = res1.body.data.register.data.user._id;
    const res2 = await chai.request(app).post('/graphql').send({
      query: 
      `mutation {
        register(email:"unit2@test2.com", firstName: "unit2", lastName: "test2", password: "unittest2") {
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
    session2Token = res2.body.data.register.data.token;
    user2ID = res2.body.data.register.data.user._id;
    const res3 = await chai.request(app).post('/graphql').send({
      query: 
      `mutation {
        register(email:"unit3@test3.com", firstName: "unit3", lastName: "test3", password: "unittest3") {
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
    user3ID = res3.body.data.register.data.user._id;

    commonTeam = await Team.findOne();
    await chai.request(app).post('/graphQL').set('JWT', session1Token).send({
      query: 
      `mutation {
        joinTeam(inviteCode: "${commonTeam.inviteCode}") {
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
    await chai.request(app).post('/graphQL').set('JWT', session2Token).send({
      query: 
      `mutation {
        joinTeam(inviteCode: "${commonTeam.inviteCode}") {
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
    return true;
  });

  after(async() => {
    await User.destroy({
      where: {
        email: 'unit@test.com',
      },
      force: true
    });
    await User.destroy({
      where: {
        email: 'unit2@test2.com',
      },
      force: true
    });
    await User.destroy({
      where: {
        email: 'unit3@test3.com',
      },
      force: true
    });
    await Review.destroy({
      where: {
        receiver_id: user2ID,
        submitter_id: user1ID
      }
    });
    return;
  });

  it('should accept a valid review from 2 users with a common team without an already existing review for the subjects state', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', session1Token).send({
      query:
      `mutation {
        submitReview(receiver_id: "${user2ID}", team_id: "${commonTeam._id}", signifiesInterest: 1, calm: 1, faith: 1, change: 1, empathy: 1, newIdeas: 1, proactive: 1, crossTeam: 1, managesOwn: 1, eyeContact: 1, workDemands: 1, openToShare: 1, distractions: 1, cooperatively: 1, emotionalReponse: 1, positiveBelief: 1, resilienceFeedback: 1, influences: 1, clearInstructions: 1, preventsMisunderstandings: 1, easilyExplainsComplexIdeas: 1, tone: 1, verbalAttentiveFeedback: 1) {
          data {
            review {
              submitter_id
              receiver_id
              _id
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
    return expect(res.body.data.submitReview).to.have.property('data').and.not.have.property('errors');
  });

  it('should reject an unauthenticated user', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', 'unittest').send({
      query:
      `mutation {
        submitReview(receiver_id: "${user2ID}", team_id: "${commonTeam._id}", signifiesInterest: 1, calm: 1, faith: 1, change: 1, empathy: 1, newIdeas: 1, proactive: 1, crossTeam: 1, managesOwn: 1, eyeContact: 1, workDemands: 1, openToShare: 1, distractions: 1, cooperatively: 1, emotionalReponse: 1, positiveBelief: 1, resilienceFeedback: 1, influences: 1, clearInstructions: 1, preventsMisunderstandings: 1, easilyExplainsComplexIdeas: 1, tone: 1, verbalAttentiveFeedback: 1) {
          data {
            review {
              submitter_id
              receiver_id
              _id
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
    return expect(res.body.data.submitReview).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject a review against an unknown user', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', session1Token).send({
      query:
      `mutation {
        submitReview(receiver_id: "unittest", team_id: "${commonTeam._id}", signifiesInterest: 1, calm: 1, faith: 1, change: 1, empathy: 1, newIdeas: 1, proactive: 1, crossTeam: 1, managesOwn: 1, eyeContact: 1, workDemands: 1, openToShare: 1, distractions: 1, cooperatively: 1, emotionalReponse: 1, positiveBelief: 1, resilienceFeedback: 1, influences: 1, clearInstructions: 1, preventsMisunderstandings: 1, easilyExplainsComplexIdeas: 1, tone: 1, verbalAttentiveFeedback: 1) {
          data {
            review {
              submitter_id
              receiver_id
              _id
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
    return expect(res.body.data.submitReview).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject a review against a user when there is no common team', async() => {
    const res = await chai.request(app).post('/graphQL').set('JWT', session1Token).send({
      query:
      `mutation {
        submitReview(receiver_id: "${user3ID}", team_id: "${commonTeam._id}", signifiesInterest: 1, calm: 1, faith: 1, change: 1, empathy: 1, newIdeas: 1, proactive: 1, crossTeam: 1, managesOwn: 1, eyeContact: 1, workDemands: 1, openToShare: 1, distractions: 1, cooperatively: 1, emotionalReponse: 1, positiveBelief: 1, resilienceFeedback: 1, influences: 1, clearInstructions: 1, preventsMisunderstandings: 1, easilyExplainsComplexIdeas: 1, tone: 1, verbalAttentiveFeedback: 1) {
          data {
            review {
              submitter_id
              receiver_id
              _id
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
    return expect(res.body.data.submitReview).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject a review if one has already been submitted for the subjects state', async() => {
    await chai.request(app).post('/graphQL').set('JWT', session1Token).send({
      query:
      `mutation {
        submitReview(receiver_id: "${user2ID}", team_id: "${commonTeam._id}", signifiesInterest: 1, calm: 1, faith: 1, change: 1, empathy: 1, newIdeas: 1, proactive: 1, crossTeam: 1, managesOwn: 1, eyeContact: 1, workDemands: 1, openToShare: 1, distractions: 1, cooperatively: 1, emotionalReponse: 1, positiveBelief: 1, resilienceFeedback: 1, influences: 1, clearInstructions: 1, preventsMisunderstandings: 1, easilyExplainsComplexIdeas: 1, tone: 1, verbalAttentiveFeedback: 1) {
          data {
            review {
              submitter_id
              receiver_id
              _id
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
    const res2 = await chai.request(app).post('/graphQL').set('JWT', session1Token).send({
      query:
      `mutation {
        submitReview(receiver_id: "${user2ID}", team_id: "${commonTeam.team_id}", signifiesInterest: 1, calm: 1, faith: 1, change: 1, empathy: 1, newIdeas: 1, proactive: 1, crossTeam: 1, managesOwn: 1, eyeContact: 1, workDemands: 1, openToShare: 1, distractions: 1, cooperatively: 1, emotionalReponse: 1, positiveBelief: 1, resilienceFeedback: 1, influences: 1, clearInstructions: 1, preventsMisunderstandings: 1, easilyExplainsComplexIdeas: 1, tone: 1, verbalAttentiveFeedback: 1) {
          data {
            review {
              submitter_id
              receiver_id
              _id
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
    return expect(res2.body.data.submitReview).to.have.property('errors').and.not.have.property('data');
  });

});
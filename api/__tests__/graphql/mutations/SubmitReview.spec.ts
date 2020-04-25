/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/

import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { User } from '../../../models/User';
import { server } from '../../../server';
import { Team } from '../../../models/Team';
import { Review } from '../../../models/Review';
import { Op } from 'sequelize';

describe('SubmitReview Mutation [api/graphql/mutations/SubmitReview.ts]', () => {
  let user0: any;
  let u0_id: any;
  let session_u0: any;
  let user1: any;
  let u1_id: any;
  let user3: any;
  let user4: any;
  let team0: any;
  let review_ids: string[] = [];

  before(async() => {
    await server._done;
    const res0 = await chai.request(server).post('/graphql').send({
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
    session_u0 = res0.body.data.login.data.token;
    u0_id = res0.body.data.login.data.user._id;
    user0 = await User.findOne({ where: { _id: u0_id }, include: [{ model: Team, as: 'teams' }] });

    const res1 = await chai.request(server).post('/graphql').send({
      query: 
      `mutation {
        login(email:"u1@1.com", password: "unittest") {
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
    u1_id = res1.body.data.login.data.user._id;
    user1 = await User.findOne({ where: { _id: u1_id }, include: [{ model: Team, as: 'teams' }] });
    team0 = user0.teams[0];
    user3 = await User.findOne({ where: { email: 'u3@3.com' }, include: [{ model: Team, as: 'teams' }] });

    if (user0.teams[0]._id !== user1.teams[0]._id) {
      throw new Error("User 0 and User 1 are not in team0!");
    }

    return true;
  });

  after(async() => {
    await user4.removeTeam(team0);
    return await Review.destroy({
      where: {
        _id: {
          [Op.in]: review_ids
        }
      }
    });
  });

  it('should accept a valid review on a user with a common team without an already existing review for the subjects state', async() => {
    user4 = await User.findOne({ where: { email: 'u4@4.com' }});
    await user4.addTeam(team0);
    const res = await chai.request(server).post('/graphQL').set('JWT', session_u0).send({
      query:
      `mutation {
        submitReview(receiver_id: "${user4._id}", team_id: "${team0._id}", signifiesInterest: 1, calm: 1, faith: 1, change: 1, empathy: 1, newIdeas: 1, proactive: 1, crossTeam: 1, managesOwn: 1, eyeContact: 1, workDemands: 1, openToShare: 1, distractions: 1, cooperatively: 1, emotionalResponse: 1, positiveBelief: 1, resilienceFeedback: 1, influences: 1, clearInstructions: 1, preventsMisunderstandings: 1, easilyExplainsComplexIdeas: 1, tone: 1, verbalAttentiveFeedback: 1) {
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
    review_ids.push(res.body.data.submitReview.data.review._id);
    return expect(res.body.data.submitReview).to.have.property('data').and.not.have.property('errors');
  });
 
  it('should reject an unauthenticated user', async() => {
    const res = await chai.request(server).post('/graphQL').set('JWT', 'unittest').send({
      query:
      `mutation {
        submitReview(receiver_id: "${user1._id}", team_id: "${team0._id}", signifiesInterest: 1, calm: 1, faith: 1, change: 1, empathy: 1, newIdeas: 1, proactive: 1, crossTeam: 1, managesOwn: 1, eyeContact: 1, workDemands: 1, openToShare: 1, distractions: 1, cooperatively: 1, emotionalResponse: 1, positiveBelief: 1, resilienceFeedback: 1, influences: 1, clearInstructions: 1, preventsMisunderstandings: 1, easilyExplainsComplexIdeas: 1, tone: 1, verbalAttentiveFeedback: 1) {
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
    const res = await chai.request(server).post('/graphQL').set('JWT', session_u0).send({
      query:
      `mutation {
        submitReview(receiver_id: "unittest", team_id: "${team0._id}", signifiesInterest: 1, calm: 1, faith: 1, change: 1, empathy: 1, newIdeas: 1, proactive: 1, crossTeam: 1, managesOwn: 1, eyeContact: 1, workDemands: 1, openToShare: 1, distractions: 1, cooperatively: 1, emotionalResponse: 1, positiveBelief: 1, resilienceFeedback: 1, influences: 1, clearInstructions: 1, preventsMisunderstandings: 1, easilyExplainsComplexIdeas: 1, tone: 1, verbalAttentiveFeedback: 1) {
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
    const res = await chai.request(server).post('/graphQL').set('JWT', session_u0).send({
      query:
      `mutation {
        submitReview(receiver_id: "${user3._id}", team_id: "${team0._id}", signifiesInterest: 1, calm: 1, faith: 1, change: 1, empathy: 1, newIdeas: 1, proactive: 1, crossTeam: 1, managesOwn: 1, eyeContact: 1, workDemands: 1, openToShare: 1, distractions: 1, cooperatively: 1, emotionalResponse: 1, positiveBelief: 1, resilienceFeedback: 1, influences: 1, clearInstructions: 1, preventsMisunderstandings: 1, easilyExplainsComplexIdeas: 1, tone: 1, verbalAttentiveFeedback: 1) {
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
    const res = await chai.request(server).post('/graphQL').set('JWT', session_u0).send({
      query:
      `mutation {
        submitReview(receiver_id: "${user1._id}", team_id: "${team0._id}", signifiesInterest: 1, calm: 1, faith: 1, change: 1, empathy: 1, newIdeas: 1, proactive: 1, crossTeam: 1, managesOwn: 1, eyeContact: 1, workDemands: 1, openToShare: 1, distractions: 1, cooperatively: 1, emotionalResponse: 1, positiveBelief: 1, resilienceFeedback: 1, influences: 1, clearInstructions: 1, preventsMisunderstandings: 1, easilyExplainsComplexIdeas: 1, tone: 1, verbalAttentiveFeedback: 1) {
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

});
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { server } from '../../../server';
import { Manager } from '../../../models/Manager';
import { Subject } from '../../../models/Subject';

describe('ChangeSubjectState Mutation [api/graphql/mutations/ChangeSubjectState.ts]', () => {
  let session_m1: any;
  let session_u0: any;
  let manager1: any;
  let subject1: any;

  before(async() => {
    await server._done;
    const res = await chai.request(server).post('/graphql').set('JWT', '').send({
      query:
      `mutation {
        login(email:"m1@1.com", password: "unittest") {
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
    session_m1 = res.body.data.login.data.token;
    const res1 = await chai.request(server).post('/graphql').set('JWT', '').send({
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
    session_u0 = res1.body.data.login.data.token;
    manager1 = await Manager.findOne({ where: { _id: res.body.data.login.data.user._id }, include: [{ model: Subject, as: 'subjects' }] });
    subject1 = manager1.subjects[0];
    return;
  });

  after(async() => {
    return await subject1.update({
      state: 2
    });
  });

  it('should let a manager change their subjects state to 1', async() => {
    const res = await chai.request(server).post('/graphql').set('JWT', session_m1).send({
      query:
      `mutation {
        changeSubjectState(state: 1, subject_id: "${subject1._id}") {
          data {
            subject {
              state
              _id
              name
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
    return expect(res.body.data.changeSubjectState).to.have.property('data').and.not.have.property('errors');
  });

  it('should reject a manager from trying to change their subjects state to 4', async() => {
    const res = await chai.request(server).post('/graphql').set('JWT', session_m1).send({
      query:
      `mutation {
        changeSubjectState(state: 4, subject_id: "${subject1._id}") {
          data {
            subject {
              state
              _id
              name
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
    return expect(res.body.data.changeSubjectState).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject a manager from trying to change an unknown subjects state to 2', async() => {
    const res = await chai.request(server).post('/graphql').set('JWT', session_m1).send({
      query:
      `mutation {
        changeSubjectState(state: 2, subject_id: "unittest") {
          data {
            subject {
              state
              _id
              name
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
    return expect(res.body.data.changeSubjectState).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject an unauthenticated user from trying to change a subjects state to 4', async() => {
    const res = await chai.request(server).post('/graphql').set('JWT', 'unittest').send({
      query:
      `mutation {
        changeSubjectState(state: 4, subject_id: "${subject1._id}") {
          data {
            subject {
              state
              _id
              name
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
    return expect(res.body.data.changeSubjectState).to.have.property('errors').and.not.have.property('data');
  });

  it('should reject a user from changing a subjects state', async() => {
    const res = await chai.request(server).post('/graphql').set('JWT', session_u0).send({
      query:
      `mutation {
        changeSubjectState(state: 4, subject_id: "${subject1._id}") {
          data {
            subject {
              state
              _id
              name
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
    return expect(res.body.data.changeSubjectState).to.have.property('errors').and.not.have.property('data');
  });

});
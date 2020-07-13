/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Coreables source code is free software; you can redistribute it
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

import { server } from '../../../../server';
import { Industry } from '../../../models/Industry';
import { Op } from 'sequelize';
import { User } from '../../../models/User';

describe('JoinIndustryMutation [api/graphql/mutations/JoinIndustry.ts]', () => {
  let sessionToken: any;
  let industry: any;
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
    user = await User.findOne({ where: { _id: res1.body.data.login.data.user._id }, include: [{ model: Industry, as: 'industry' }]});
    industry = await Industry.findOne({ where: { _id: { [Op.not]: user.industry._id } }});
    return;
  });

  it('should reject an unauthenticated user changing industry', async() => {
    const res = await chai.request(server).post('/graphql').set('JWT', 'unittest').send({
      query: `
      mutation {
        joinIndustry(industry_id: "${industry._id}") {
          data {
            user {
              industry {
                _id
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
    return expect(res.body.data.joinIndustry).to.have.property('errors').and.not.have.property('data');
  });

  it('should allow a user to change industry', async() => {
    const res = await chai.request(server).post('/graphql').set('JWT', sessionToken).send({
      query: `
      mutation {
        joinIndustry(industry_id: "${industry._id}") {
          data {
            user {
              industry {
                _id
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
    return expect(res.body.data.joinIndustry).to.have.property('data').and.not.have.property('errors');
  });

  it('should reject a user joining the same industry', async() => {
    let me: any = await User.findOne({ where: { _id: user._id }, include: [{ model: Industry, as: 'industry' }]});
    const res = await chai.request(server).post('/graphql').set('JWT', sessionToken).send({
      query: `
      mutation {
        joinIndustry(industry_id: "${me.industry._id}") {
          data {
            user {
              industry {
                _id
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
    return expect(res.body.data.joinIndustry).to.have.property('errors').and.not.have.property('data');
  });

});
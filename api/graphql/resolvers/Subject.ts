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

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';

import { Subject } from '../../models/Subject';
import { TeamResolver } from './Team';
import { ReviewResolver } from './Review';
import { sequelize } from '../../lib/sequelize';
import { Team } from '../../models/Team';
import { User } from '../../models/User';
import { Review } from '../../models/Review';

export const SubjectResolver: GraphQLObjectType<Subject> = new GraphQLObjectType({
  name: 'SubjectResolver',
  description: 'This represents a Subject',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(subject, args, context) {
          return subject._id;
        }
      },
      'name': {
        type: GraphQLString,
        resolve(subject, args, context) {
          return subject.name;
        }
      },
      'state': {
        type: GraphQLInt,
        resolve(subject, args, context) {
          return subject.state;
        }
      },
      'teams': {
        type: new GraphQLList(TeamResolver),
        resolve(subject, args, context) {
          return subject.teams;
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'SubjectAverageReport',
          fields: () => {
            return {
              'average': {
                type: ReviewResolver,
                resolve(average, args, context) {
                  return average;
                }
              },
              'sorted': {
                type: new GraphQLList(new GraphQLObjectType({
                  name: 'SubjectSortedAverageArray',
                  fields: () => {
                    return {
                      'field': {
                        type: GraphQLString,
                        resolve(sortable, args, context) {
                          return sortable[0];
                        }
                      },
                      'value': {
                        type: GraphQLFloat,
                        resolve(sortable, args, context) {
                          return sortable[1];
                        }
                      }
                    }
                  }
                })),
                resolve(average, args, context) {
                  const sortable = [];
                  for (const field in average) {
                    if (!isNaN(average[field])) {
                      sortable.push([field, average[field]]);
                    }
                  }
                  sortable.sort((a, b) => {
                    return a[1] - b[1]
                  });
                  return sortable;
                }
              }
            }
          }
        }),
        async resolve(subject, args, context) {
          let averages = await sequelize.models.Subject.findOne(
            {
              where: { _id: subject._id },
              group: ['_id'],
              attributes: {
                exclude: [
                  '_id',
                  'name',
                  'state',
                  'createdAt',
                  'updatedAt'
                ],
                include: [
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.calm')),
                    'calm'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.change')),
                    'change'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.clearInstructions')),
                    'clearInstructions'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.cooperatively')),
                    'cooperatively'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.crossTeam')),
                    'crossTeam'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.distractions')),
                    'distractions'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.easilyExplainsComplexIdeas')),
                    'easilyExplainsComplexIdeas'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.emotionalResponse')),
                    'emotionalResponse'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.empathy')),
                    'empathy'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.eyeContact')),
                    'eyeContact'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.faith')),
                    'faith'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.influences')),
                    'influences'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.managesOwn')),
                    'managesOwn'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.newIdeas')),
                    'newIdeas'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.openToShare')),
                    'openToShare'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.positiveBelief')),
                    'positiveBelief'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.preventsMisunderstandings')),
                    'preventsMisunderstandings'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.proactive')),
                    'proactive'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.resilienceFeedback')),
                    'resilienceFeedback'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.signifiesInterest')),
                    'signifiesInterest'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.tone')),
                    'tone'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.verbalAttentiveFeedback')),
                    'verbalAttentiveFeedback'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('teams.users.reviews.workDemands')),
                    'workDemands'
                  ],
                ]
              },
              include: [{
                model: Team, as: 'teams',
                attributes: {
                  exclude: [
                    'name',
                    'inviteCode',
                    'createdAt',
                    'updatedAt'
                  ]
                },
                include: [{
                  model: User, as: 'users',
                  attributes: {
                    exclude: [
                      'firstName',
                      'lastName',
                      'email',
                      'password',
                      'passwordResetToken',
                      'passwordResetExpiry',
                      'createdAt',
                      'updatedAt'
                    ]
                  },
                  include: [{
                    model: Review, as: 'reviews', attributes: {
                      exclude: [
                        'createdAt',
                        'updatedAt'
                      ]
                    }
                  }]
                }]
              }]
            }
          );
          return averages.dataValues;
        }
      }
    }
  }
});

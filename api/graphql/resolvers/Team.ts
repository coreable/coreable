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
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

import { Team } from '../../models/Team';
import { SubjectResolver } from './Subject';
import { UserResolver } from './User';
import { ReviewResolver } from './Review';
import { sequelize } from '../../lib/sequelize';
import { User } from '../../models/User';
import { Review } from '../../models/Review';

export const TeamResolver: GraphQLObjectType<Team> = new GraphQLObjectType({
  name: 'TeamResolver',
  description: 'This represents a Team',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(team, args, context) {
          return team._id;
        }
      },
      'name': {
        type: GraphQLString,
        resolve(team, args, context) {
          return team.name;
        }
      },
      'inviteCode': {
        type: GraphQLString,
        resolve(team, args, context) {
          return team.inviteCode;
        }
      },
      'subject': {
        type: SubjectResolver,
        resolve(team, args, context) {
          return team.subject;
        }
      },
      'users': {
        type: new GraphQLList(UserResolver),
        resolve(team, args, context) {
          return team.users;
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'TeamAverageReport',
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
                  name: 'TeamSortedAverageArray',
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
        async resolve(team, args, context) {
          let averages = await sequelize.models.Team.findOne(
            {
              where: { _id: team._id },
              group: ['_id'],
              attributes: {
                exclude: [
                  '_id',
                  'name',
                  'inviteCode',
                  'subject_id',
                  'createdAt',
                  'updatedAt',
                ],
                include: [
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.calm')),
                    'calm'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.change')),
                    'change'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.clearInstructions')),
                    'clearInstructions'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.cooperatively')),
                    'cooperatively'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.crossTeam')),
                    'crossTeam'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.distractions')),
                    'distractions'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.easilyExplainsComplexIdeas')),
                    'easilyExplainsComplexIdeas'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.emotionalResponse')),
                    'emotionalResponse'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.empathy')),
                    'empathy'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.eyeContact')),
                    'eyeContact'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.faith')),
                    'faith'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.influences')),
                    'influences'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.managesOwn')),
                    'managesOwn'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.newIdeas')),
                    'newIdeas'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.openToShare')),
                    'openToShare'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.positiveBelief')),
                    'positiveBelief'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.preventsMisunderstandings')),
                    'preventsMisunderstandings'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.proactive')),
                    'proactive'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.resilienceFeedback')),
                    'resilienceFeedback'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.resilienceFeedback')),
                    'resilienceFeedback'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.signifiesInterest')),
                    'signifiesInterest'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('tone')),
                    'tone'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.verbalAttentiveFeedback')),
                    'verbalAttentiveFeedback'
                  ],
                  [
                    sequelize.fn('avg',
                      sequelize.col('users.reviews.workDemands')),
                    'workDemands'
                  ],
                ]
              },
              include: [{
                model: User,
                as: 'users',
                group: ['_id'],
                include: [
                  {
                    model: Review,
                    as: 'reviews',
                    group: ['_id'],
                  }
                ]
              }]
            }
          );
          return averages.dataValues;
        }
      }
    }
  }
});

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
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

import { Team } from '../../models/Team';
import { SubjectResolver } from './Subject';
import { UserResolver } from './User';
import { ReviewResolver } from './Review';
import { sequelize } from '../../lib/sequelize';
import { User } from '../../models/User';
import { Review } from '../../models/Review';
import { Op } from 'sequelize';
import { TeamAverage } from '../../models/TeamAverage';

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
                type: new GraphQLObjectType({
                  name: 'TeamAverageSingle',
                  fields: () => {
                    return {
                      'default': {
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
                          average = average.dataValues;
                          const sortable = [];
                          for (const field in average) {
                            if (!isNaN(average[field]) && Number.isFinite(average[field])) {
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
                  let averages: any;
                  let week;
                  week = 7 * 60 * 60 * 24 * 1000; // week = 7 * 60 * 60 * 24 * 1000;
                  week = new Date(Date.now() - week);
                  averages = await sequelize.models.TeamAverage.findOne({
                    where: {
                      team_id: team._id,
                      createdAt: {
                        [Op.gte]: week
                      }
                    }
                  });
                  if (averages) {
                    return averages;
                  }
                  averages = await getTeamAverages(team);
                  averages = await TeamAverage.create({
                    team_id: team._id,
                    emotionalResponse: averages.dataValues.emotionalResponse,
                    empathy: averages.dataValues.empathy,
                    managesOwn: averages.dataValues.managesOwn,
                    cooperatively: averages.dataValues.cooperatively,
                    positiveBelief: averages.dataValues.positiveBelief,
                    resilienceFeedback: averages.dataValues.resilienceFeedback,
                    calm: averages.dataValues.calm,
                    change: averages.dataValues.change,
                    newIdeas: averages.dataValues.newIdeas,
                    workDemands: averages.dataValues.workDemands,
                    proactive: averages.dataValues.proactive,
                    influences: averages.dataValues.influences,
                    clearInstructions: averages.dataValues.clearInstructions,
                    easilyExplainsComplexIdeas: averages.dataValues.easilyExplainsComplexIdeas,
                    openToShare: averages.dataValues.openToShare,
                    tone: averages.dataValues.tone,
                    crossTeam: averages.dataValues.crossTeam,
                    distractions: averages.dataValues.distractions,
                    eyeContact: averages.dataValues.eyeContact,
                    signifiesInterest: averages.dataValues.signifiesInterest,
                    verbalAttentiveFeedback: averages.dataValues.verbalAttentiveFeedback
                  });
                  return averages;
                }
              },
              'averages': {
                type: new GraphQLList(ReviewResolver),
                args: {
                  limit: {
                    type: GraphQLInt,
                  },
                  start: {
                    type: new GraphQLNonNull(GraphQLString),
                  }
                },
                async resolve(team, args, context) {
                  let averages: any;
                  try {
                    args.start = Date.parse(args.start);
                    args.start = new Date(args.start);
                  } catch (err) {
                    return err;
                  }
                  averages = await sequelize.models.TeamAverage.findAll({
                    where: {
                      team_id: team._id,
                      createdAt: {
                        [Op.gte]: args.start
                      }
                    },
                    limit: args.limit
                  });
                  if (averages) {
                    return averages;
                  }
                  averages = await getTeamAverages(team);
                  averages = await TeamAverage.create({
                    team_id: team._id,
                    emotionalResponse: averages.dataValues.emotionalResponse,
                    empathy: averages.dataValues.empathy,
                    managesOwn: averages.dataValues.managesOwn,
                    cooperatively: averages.dataValues.cooperatively,
                    positiveBelief: averages.dataValues.positiveBelief,
                    resilienceFeedback: averages.dataValues.resilienceFeedback,
                    calm: averages.dataValues.calm,
                    change: averages.dataValues.change,
                    newIdeas: averages.dataValues.newIdeas,
                    workDemands: averages.dataValues.workDemands,
                    proactive: averages.dataValues.proactive,
                    influences: averages.dataValues.influences,
                    clearInstructions: averages.dataValues.clearInstructions,
                    easilyExplainsComplexIdeas: averages.dataValues.easilyExplainsComplexIdeas,
                    openToShare: averages.dataValues.openToShare,
                    tone: averages.dataValues.tone,
                    crossTeam: averages.dataValues.crossTeam,
                    distractions: averages.dataValues.distractions,
                    eyeContact: averages.dataValues.eyeContact,
                    signifiesInterest: averages.dataValues.signifiesInterest,
                    verbalAttentiveFeedback: averages.dataValues.verbalAttentiveFeedback
                  });
                  if (!Array.isArray(averages)) {
                    averages = [averages];
                  }
                  return averages;
                }
              }
            }
          }
        }),
        resolve(team, args, context) {
          return team;
        }
      }
    }
  }
});

export function getTeamAverages(team: Team) {
  return sequelize.models.Team.findOne(
    {
      where: { _id: team._id },
      group: ['_id'],
      attributes: {
        exclude: [
          '_id',
          'name',
          'inviteCode',
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
              sequelize.col('users.reviews.signifiesInterest')),
            'signifiesInterest'
          ],
          [
            sequelize.fn('avg',
              sequelize.col('users.reviews.tone')),
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
        include: [
          {
            model: Review,
            as: 'reviews',
            attributes: {
              exclude: [
                'updatedAt',
                'createdAt'
              ]
            },
            group: ['_id'],
          }
        ]
      }]
    }
  );
}
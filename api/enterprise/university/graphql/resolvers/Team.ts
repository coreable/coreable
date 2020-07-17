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

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

import { UniversityTeam } from '../../models/Team';
import { UniversitySubjectResolver } from './Subject';
import { UniversityUserResolver } from './User';
import { ReviewResolver } from './Review';

import { sequelize } from '../../../../lib/sequelize';
import { UniversityUser } from '../../models/User';
import { UniversityReview } from '../../models/Review';
import { UniversityTeamAverage } from '../../models/TeamAverage';
import { Op } from 'sequelize';

export const UniversityTeamResolver: GraphQLObjectType<UniversityTeam> = new GraphQLObjectType({
  name: 'UniversityTeamResolver',
  description: 'This represents a UniversityTeam',
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
        type: UniversitySubjectResolver,
        async resolve(team: any, args, context) {
          return await team.getSubject();
        }
      },
      'users': {
        type: new GraphQLList(UniversityUserResolver),
        async resolve(team: any, args, context) {
          return await team.getUsers();
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'UniversityTeamAverageReport',
          fields: () => {
            return {
              'average': {
                type: new GraphQLObjectType({
                  name: 'UniversityTeamAverageSingle',
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
                          name: 'UniversityTeamSortedAverageArray',
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
                  averages = await UniversityTeamAverage.create({
                    team_id: team._id,
                    calm: averages.dataValues.calm,
                    clearInstructions: averages.dataValues.clearInstructions,
                    cooperatively: averages.dataValues.cooperatively,
                    crossTeam: averages.dataValues.crossTeam,
                    distractions: averages.dataValues.distractions,
                    easilyExplainsComplexIdeas: averages.dataValues.easilyExplainsComplexIdeas,
                    empathy: averages.dataValues.empathy,
                    usesRegulators: averages.dataValues.usesRegulators,
                    influences: averages.dataValues.influences,
                    managesOwn: averages.dataValues.managesOwn,
                    newIdeas: averages.dataValues.newIdeas,
                    openToShare: averages.dataValues.openToShare,
                    positiveBelief: averages.dataValues.positiveBelief,
                    proactive: averages.dataValues.proactive,
                    resilienceFeedback: averages.dataValues.resilienceFeedback,
                    signifiesInterest: averages.dataValues.signifiesInterest,
                    workDemands: averages.dataValues.workDemands,
                  });
                  return averages;
                }
              },
              'averages': {
                type: new GraphQLList(ReviewResolver),
                args: {
                  endDate: {
                    type: GraphQLString,
                  },
                  startDate: {
                    type: GraphQLString,
                  }
                },
                async resolve(team, args, context) {
                  let averages: any;
                  if (args.startDate) {
                    try {
                      args.startDate = Date.parse(args.startDate);
                      args.startDate = new Date(args.startDate);
                    } catch (err) {
                      return err;
                    }
                  }
                  if (args.endDate) {
                    try {

                      args.endDate = Date.parse(args.endDate);
                      args.endDate = new Date(args.endDate);
                    } catch (err) {
                      return err;
                    }
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
                  averages = await UniversityTeamAverage.create({
                    team_id: team._id,
                    calm: averages.dataValues.calm,
                    clearInstructions: averages.dataValues.clearInstructions,
                    cooperatively: averages.dataValues.cooperatively,
                    crossTeam: averages.dataValues.crossTeam,
                    distractions: averages.dataValues.distractions,
                    easilyExplainsComplexIdeas: averages.dataValues.easilyExplainsComplexIdeas,
                    empathy: averages.dataValues.empathy,
                    usesRegulators: averages.dataValues.usesRegulators,
                    influences: averages.dataValues.influences,
                    managesOwn: averages.dataValues.managesOwn,
                    newIdeas: averages.dataValues.newIdeas,
                    openToShare: averages.dataValues.openToShare,
                    positiveBelief: averages.dataValues.positiveBelief,
                    proactive: averages.dataValues.proactive,
                    resilienceFeedback: averages.dataValues.resilienceFeedback,
                    signifiesInterest: averages.dataValues.signifiesInterest,
                    workDemands: averages.dataValues.workDemands,
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

export function getTeamAverages(team: UniversityTeam) {
  return UniversityTeam.findOne(
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
              sequelize.col('users.reviews.easilyExplainsComplexIdeas')),
            'easilyExplainsComplexIdeas'
          ],
          [
            sequelize.fn('avg',
              sequelize.col('users.reviews.empathy')),
            'empathy'
          ],
          [
            sequelize.fn('avg',
              sequelize.col('users.reviews.usesRegulators')),
            'usesRegulators'
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
        model: UniversityUser,
        as: 'users',
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
            model: UniversityReview,
            as: 'reviews',
            attributes: {
              exclude: [
                'updatedAt',
                'createdAt'
              ]
            }
          }
        ]
      }]
    }
  );
}
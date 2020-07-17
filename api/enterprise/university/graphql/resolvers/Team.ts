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

import { UniversityUserResolver } from './User';
import { UniversityReviewResolver } from './Review';
import { UniversityTeamAverage } from '../../models/TeamAverage';
import { UniversityTeam } from '../../models/Team';

import { Op } from 'sequelize';
import { GetTeamAverages } from '../../logic/GetTeamAverages';
import { UniversityTutorialResolver } from './Tutorial';
import { GetTeamTutorial } from '../../logic/GetTeamTutorial';
import { GetTeamSubject } from '../../logic/GetTeamSubject';
import { UniversitySubjectResolver } from './Subject';

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
      'tutorial': {
        type: UniversityTutorialResolver,
        async resolve(team: any, args, context) {
          return await GetTeamTutorial(team, args, context);
        }
      },
      'subject': {
        type: UniversitySubjectResolver,
        async resolve(team: any, args, context) {
          return await GetTeamSubject(team, args, context);
        }
      },
      'users': {
        type: new GraphQLList(UniversityUserResolver),
        async resolve(team: any, args, context) {
          return null;
          return await team.getUsers();
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'UniversityTeamAverageReport',
          fields: () => {
            return {
              'average': {
                args: {
                  endDate: {
                    type: GraphQLString,
                  },
                  startDate: {
                    type: GraphQLString,
                  }
                },
                type: new GraphQLObjectType({
                  name: 'UniversityTeamAverageSingle',
                  fields: () => {
                    return {
                      'default': {
                        type: new GraphQLList(UniversityReviewResolver),
                        resolve(averages, args, context) {
                          return averages;
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
                          if (average.length === 1) {
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
                          return null;
                        }
                      }
                    }
                  }
                }),
                async resolve(team, args, context) {
                  // ALWAYS CALCULATE AND STORE THE NEWEST VALUE IF
                  // THE TOP RECORD IN THE DATABASE IS OLDER THAN A WEEK OLD
                  const latestAverage: any = await GetTeamAverages(team, args, context);
                  const topRecord: any = await UniversityTeamAverage.findOne({
                    where: { team_id: team._id },
                    order: [['createdAt', 'DESC']]
                  });

                  const weekAgo = Date.now() - 604800000;
                  const DATE_QUERY: any = {};

                  if (!topRecord || (Date.parse(topRecord.createdAt) < weekAgo)) {
                    await UniversityTeamAverage.create({
                      ...latestAverage.dataValues,
                      team_id: team._id
                    });
                  }

                  if (args.startDate) {
                    try {
                      args.startDate = Date.parse(args.startDate);
                      args.startDate = new Date(args.startDate);
                      DATE_QUERY[Op.gte] = args.startDate;
                    } catch (err) {
                      return err;
                    }
                  }

                  if (args.endDate) {
                    try {
                      args.endDate = Date.parse(args.endDate);
                      args.endDate = new Date(args.endDate);
                      DATE_QUERY[Op.lte] = args.endDate;
                    } catch (err) {
                      return err;
                    }
                  }

                  // if no start or end date is specified
                  // return only the latest average
                  if (!args.startDate && !args.endDate) {
                    return [latestAverage];
                  }

                  const averages: any = await UniversityTeamAverage.findAll({
                    where: {
                      team_id: team._id,
                      createdAt: DATE_QUERY
                    }
                  });

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

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

import { UniversityUser } from '../../models/User';
import { UniversityTeamResolver } from './Team';
import { UniversityReviewResolver } from './Review';
import { UniversitySubjectResolver } from './Subject';
import { UniversityIndustryResolver } from './Industry';
import { UserResolver } from '../../../../identity/graphql/resolvers/User';

import { UniversityReview } from '../../models/Review';

import { Op } from 'sequelize';
import { GetReflectionAverages } from '../../logic/GetReflectionAverages';
import { GetPendingUsersNeedingReview } from '../../logic/GetPendingUsersNeedingReview';
import { UniversityTutorialResolver } from './Tutorial';
import { UniversityUserAverage } from '../../models/UserAverage';
import { GetUserAverages } from '../../logic/GetUserAverages';

export const UniversityUserResolver: GraphQLObjectType<UniversityUser> = new GraphQLObjectType({
  name: 'UniversityUserResolver',
  description: 'This represents a UniversityUser',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user._id;
        }
      },
      'user': {
        type: UserResolver,
        async resolve(user: any, args, context) {
          return await user.getUser();
        }
      },
      'team': {
        type: GraphQLList(UniversityTeamResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await user.getTeams({ where: args });
        }
      },
      'subject': {
        type: GraphQLList(UniversitySubjectResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await user.getSubjects({ where: args });
          // return await GetUserSubjects(user, args, context);
        }
      },
      'tutorial': {
        type: GraphQLList(UniversityTutorialResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await user.getTutorials({ where: args });
        }
      },
      'industry': {
        type: UniversityIndustryResolver,
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await user.getIndustry();
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'UniversityUserReport',
          fields: () => {
            return {
              'normal': {
                type: new GraphQLList(UniversityReviewResolver),
                async resolve(user, args, context) {
                  if (context.USER._id !== user._id) {
                    return null;
                  }

                  return await UniversityReview.findAll({
                    attributes: {
                      exclude: ['submitter_id', 'createdAt', 'updatedAt']
                    },
                    where: { receiver_id: user._id, submitter_id: { [Op.not]: user._id } },
                  });
                }
              },
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
                  name: 'UniversityUserAverageSingle',
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
                          name: 'UniversityUserSortedAverageArray',
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
                async resolve(user, args, context) {
                  // ALWAYS CALCULATE AND STORE THE NEWEST VALUE IF
                  // THE TOP RECORD IN THE DATABASE IS OLDER THAN A WEEK OLD
                  const latestAverage: any = await GetUserAverages(user, args, context);
                  const topRecord: any = await UniversityUserAverage.findOne({
                    where: { user_id: user._id },
                    order: [['createdAt', 'DESC']]
                  });

                  const weekAgo = Date.now() - 604800000;

                  if (!topRecord || (Date.parse(topRecord.createdAt) < weekAgo)) {
                    await UniversityUserAverage.create({
                      ...latestAverage.dataValues,
                      user_id: user._id
                    });
                  }

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

                  // if no start or end date is specified
                  // return only the latest average
                  if (!args.startDate && !args.endDate) {
                    return [latestAverage];
                  }

                  const averages: any = await UniversityUserAverage.findAll({
                    where: {
                      user_id: user._id,
                      createdAt: {
                        [Op.gte]: args.startDate,
                        [Op.lte]: args.endDate
                      }
                    },
                    limit: args.limit
                  });

                  if (!Array.isArray(averages)) {
                    return [averages];
                  }
                  return averages;
                }
              }
            }
          }
        }),
        resolve(user, args, context) {
          return user;
        }
      },
      'submissions': {
        type: new GraphQLList(UniversityReviewResolver),
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }

          return await UniversityReview.findAll({
            attributes: {
              exclude: ['receiver_id', 'createdAt', 'updatedAt']
            },
            where: { submitter_id: user._id, receiver_id: { [Op.not]: user._id } }
          });
        }
      },
      'pending': {
        type: new GraphQLList(UniversityTeamResolver),
        async resolve(user, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await GetPendingUsersNeedingReview(user, args, context);
        }
      },
      'reflection': {
        type: UniversityReviewResolver,
        async resolve(user: any, args: any, context: any) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await GetReflectionAverages(user, args, context);
        }
      }
    }
  }
});

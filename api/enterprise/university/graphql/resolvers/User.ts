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
import { ReviewResolver } from './Review';
import { UniversitySubjectResolver } from './Subject';
import { IndustryResolver } from './Industry';
import { UserResolver } from '../../../../identity/graphql/resolvers/User';

import { UniversityReview } from '../../models/Review';

import { Op } from 'sequelize';
import { GetReflectionAverages } from '../../logic/GetReflectionAverages';
// import { GetUserSubjects } from '../../logic/GetUserSubjects';
import { GetPendingUsersNeedingReview } from '../../logic/GetPendingUsersNeedingReview';
import { CalculateReviewAverage } from '../../logic/CalculateReviewAverage';
import { UniversityTutorialResolver } from './Tutorial';

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
        type: IndustryResolver,
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await user.getIndustry();
        }
      },
      'reviews': {
        type: new GraphQLObjectType({
          name: 'UserReviewSplit',
          fields: () => {
            return {
              'report': {
                type: new GraphQLObjectType({
                  name: 'UserReportSplit',
                  fields: () => {
                    return {
                      'average': {
                        type: ReviewResolver,
                        resolve(reviews, args, context) {
                          return reviews.average;
                        }
                      },
                      'sorted': {
                        type: new GraphQLList(new GraphQLObjectType({
                          name: 'UserSortedAverageArray',
                          fields: () => {
                            return {
                              'field': {
                                type: GraphQLString,
                                resolve(sorted, args, context) {
                                  return sorted[0];
                                }
                              },
                              'value': {
                                type: GraphQLFloat,
                                resolve(sorted, args, context) {
                                  return sorted[1];
                                }
                              }
                            }
                          }
                        })),
                        resolve(reviews, args, context) {
                          const sortable = [];
                          for (const field in reviews.average) {
                            sortable.push([field, reviews.average[field]]);
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
                resolve(reviews, args, context) {
                  return CalculateReviewAverage(reviews, args, context);
                }
              },
              'default': {
                type: new GraphQLList(ReviewResolver),
                resolve(reviews, args, context) {
                  return reviews;
                }
              }
            }
          }
        }),
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }

          return await UniversityReview.findAll({
            attributes: { exclude: ['submitter_id'] },
            where: { receiver_id: user._id, submitter_id: { [Op.not]: user._id } }
          });
        }
      },
      'submissions': {
        type: new GraphQLList(ReviewResolver),
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }

          return await UniversityReview.findAll({
            attributes: { exclude: ['receiver_id'] },
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
        type: ReviewResolver,
        async resolve(user: any, args: any, context: any) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await GetReflectionAverages(user, args, context);
        }
      },
      'createdAt': {
        type: GraphQLString,
        resolve(user: any, args: any, context: any) {
          return user.createdAt;
        }
      },
      'updatedAt': {
        type: GraphQLString,
        resolve(user: any, args: any, context: any) {
          return user.updatedAt;
        }
      }
    }
  }
});

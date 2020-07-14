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

import { sequelize } from '../../../../lib/sequelize';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

import { UniversityUser } from '../../models/User';
import { TeamResolver } from './Team';
import { ReviewResolver } from './Review';
import { Op } from 'sequelize';
import { IndustryResolver } from './Industry';
import { GetAverageReflectionResult, GetPendingUsersNeedingReview, GetUserSubjects } from '../../logic/User';
import { SubjectResolver } from './Subject';
import { UserResolver } from '../../../../identity/graphql/resolvers/User';
import { UniversityReview } from '../../models/Review';

export const UniversityUserResolver: GraphQLObjectType<UniversityUser> = new GraphQLObjectType({
  name: 'UserResolver',
  description: 'This represents a User',
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
          return await user.getUser({
            exclude: ['password']
          });
        }
      },
      'team': {
        type: GraphQLList(TeamResolver),
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
        type: GraphQLList(SubjectResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await GetUserSubjects(user, args, context);
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
                  const average: any = {
                    calm: 0,
                    clearInstructions: 0,
                    cooperatively: 0,
                    crossTeam: 0,
                    distractions: 0,
                    easilyExplainsComplexIdeas: 0,
                    empathy: 0,
                    usesRegulators: 0,
                    influences: 0,
                    managesOwn: 0,
                    newIdeas: 0,
                    openToShare: 0,
                    positiveBelief: 0,
                    proactive: 0,
                    resilienceFeedback: 0,
                    signifiesInterest: 0,
                    workDemands: 0
                  };

                  let counter = 0;
                  for (const review of reviews) {
                    average.calm += review.calm;
                    average.clearInstructions += review.clearInstructions;
                    average.cooperatively += review.cooperatively;
                    average.crossTeam += review.crossTeam;
                    average.distractions += review.distractions;
                    average.easilyExplainsComplexIdeas += review.easilyExplainsComplexIdeas;
                    average.empathy += review.empathy;
                    average.usesRegulators += review.usesRegulators;
                    average.influences += review.influences;
                    average.managesOwn += review.managesOwn;
                    average.newIdeas += review.newIdeas;
                    average.openToShare += review.openToShare;
                    average.positiveBelief += review.positiveBelief;
                    average.proactive += review.proactive;
                    average.resilienceFeedback += review.resilienceFeedback;
                    average.signifiesInterest += review.signifiesInterest;
                    average.workDemands += review.workDemands;
                    counter++;
                  }
                  for (const key in average) {
                    average[key] = average[key] / counter;
                  }
                  return {
                    'reviews': reviews,
                    'average': average
                  };
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
        type: new GraphQLList(TeamResolver),
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
          return await GetAverageReflectionResult(user, args, context);
        }
      }
    }
  }
});

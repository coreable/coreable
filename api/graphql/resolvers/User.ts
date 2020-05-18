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

import { sequelize } from '../../lib/sequelize';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean
} from 'graphql';

import { User } from '../../models/User';
import { Manager } from '../../models/Manager';
import { TeamResolver } from './Team';
import { ReviewResolver } from './Review';
import { Op } from 'sequelize';
import { Team } from '../../models/Team';
import { Subject } from '../../models/Subject';
import { IndustryResolver } from './Industry';

export const UserResolver: GraphQLObjectType<User> = new GraphQLObjectType({
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
      'firstName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.firstName;
        }
      },
      'lastName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.lastName;
        }
      },
      'email': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.email
        }
      },
      'teams': {
        type: GraphQLList(TeamResolver),
        resolve(user: any, args, context) {
          // if (context.USER._id === user._id || context.USER instanceof Manager) {
          return user.teams;
          // }
          // return null;
        }
      },
      'industry': {
        type: IndustryResolver,
        resolve(user, args, context) {
          return user.industry;
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
          if (context.USER._id === user._id || context.USER instanceof Manager) {
            user.reviews = await sequelize.models.Review.findAll({ attributes: { exclude: ['submitter_id'] }, where: { receiver_id: user._id, submitter_id: { [Op.not]: user._id } } });
            return user.reviews;
          }
          return null;
        }
      },
      'submissions': {
        type: new GraphQLList(ReviewResolver),
        async resolve(user: any, args, context) {
          if (context.USER._id === user._id || context.USER instanceof Manager) {
            user.submissions = await sequelize.models.Review.findAll({ attributes: { exclude: ['receiver_id'] }, where: { submitter_id: user._id, receiver_id: { [Op.not]: user._id } } });
            return user.submissions;
          }
          return null;
        }
      },
      'pending': {
        type: new GraphQLList(TeamResolver),
        async resolve(user, args, context) {
          // if the user retrieved is not the logged in user
          // and the logged in user is not manager
          // or the user being retrieved is a manager
          if ((context.USER._id !== user._id &&
            !(context.USER instanceof Manager)) ||
            user instanceof Manager) {
            return null;
          }

          const teams = await (user as any).getTeams({ model: Team, include: [{ model: Subject, as: 'subject' }], attributes: { exclude: ['inviteCode'] } });

          for (const team of teams) {
            const hasReviewed = await sequelize.models.Review.findAll({ where: { submitter_id: context.USER._id, subject_id: team.subject._id, state: team.subject.state }});
            team.users = [];
            if (!hasReviewed.length) {
              team.users = await team.getUsers();
            }
          }

          return teams;
        }
      },
      'reflection': {
        type: ReviewResolver,
        async resolve(user: any, args: any, context: any) {
          if (user._id !== context.USER._id) {
            return null;
          }
          let reflection = await sequelize.models.Review.findAll({ where: { receiver_id: context.USER._id, submitter_id: context.USER._id } });
          if (!reflection) {
            return null;
          }
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
          for (const review of reflection) {
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
          user.reflection = average;
          return user.reflection;
        }
      },
      'completedOnboarding': {
        type: GraphQLBoolean,
        resolve(user, args, context) {
          return user.completedOnboarding;
        }
      }
    }
  }
});

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
import { GetUserSubjects } from '../../logic/GetUserSubjects';
import { GetUserTutorials } from '../../logic/GetUserTutorials';
import { GetUserTeams } from '../../logic/GetUserTeams';
import { UniversityOrganisationResolver } from './Organisation';
import { GetUserOrganisations } from '../../logic/GetUserOrganisation';
import { UniversityCollaborationTraitsResolver } from './CollaborationTraits';
import { UniversityCollaborationFacetsResolver } from './CollaborationFacets';
import { UniversityCommunicationFacetsResolver } from './CommunicationFacets';
import { UniversityCommunicationTraitsResolver } from './CommunicationTraits';

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
        type: new GraphQLList(UniversityTeamResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id && !context.MANAGER) {
            return null;
          }
          return await GetUserTeams(user, args, context);
        }
      },
      'subject': {
        type: new GraphQLList(UniversitySubjectResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id && !context.MANAGER) {
            return null;
          }

          return await GetUserSubjects(user, args, context);
        }
      },
      'tutorial': {
        type: new GraphQLList(UniversityTutorialResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id && !context.MANAGER) {
            return null;
          }

          return await GetUserTutorials(user, args, context);
        }
      },
      'organisation': {
        type: new GraphQLList(UniversityOrganisationResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id && !context.MANAGER) {
            return null;
          }

          return await GetUserOrganisations(user, args, context);
        }
      },
      'industry': {
        type: UniversityIndustryResolver,
        async resolve(user: any, args, context) {
          if (context.USER._id !== user._id && !context.MANAGER) {
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
                  if (context.USER._id !== user._id && !context.MANAGER) {
                    return null;
                  }

                  return await UniversityReview.findAll({
                    attributes: {
                      exclude: ['createdAt', 'updatedAt']
                    },
                    where: { receiver_id: user._id, submitter_id: { [Op.not]: user._id } },
                  });
                }
              },
              'submissions': {
                type: new GraphQLList(UniversityReviewResolver),
                async resolve(user: any, args, context) {
                  if (context.USER._id !== user.user_id && !context.MANAGER) {
                    return null;
                  }
        
                  return await UniversityReview.findAll({
                    attributes: {
                      exclude: ['createdAt', 'updatedAt']
                    },
                    where: { submitter_id: user._id, receiver_id: { [Op.not]: user._id } }
                  });
                }
              },
              'reflection': {
                type: UniversityReviewResolver,
                async resolve(user: any, args: any, context: any) {
                  if (context.USER._id !== user.user_id && !context.MANAGER) {
                    return null;
                  }
        
                  return await GetReflectionAverages(user, args, context);
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
                      'communication': {
                        type: new GraphQLObjectType({
                          name: 'UniversityUserCommunication',
                          fields: () => {
                            return {
                              'traits': {
                                type: UniversityCommunicationTraitsResolver,
                                resolve(averages, args, context) {
                                  return averages;
                                }
                              },
                              'facets': {
                                type: UniversityCommunicationFacetsResolver,
                                resolve(averages, args, context) {
                                  return averages;
                                }
                              }
                            }
                          }
                        }),
                      },
                      'collaboration': {
                        type: new GraphQLObjectType({
                          name: 'UniversityUserCollaboration',
                          fields: () => {
                            return {
                              'traits': {
                                type: UniversityCollaborationTraitsResolver,
                                resolve(averages, args, context) {
                                  return averages;
                                }
                              },
                              'facets': {
                                type: UniversityCollaborationFacetsResolver,
                                resolve(averages, args, context) {
                                  return averages;
                                }
                              }
                            }
                          }
                        }),
                        async resolve(averages, args, context) {
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
                        resolve(averages, args, context) {
                          if (averages.length === 1) {
                            const sortable = [];
                            for (const field in averages) {
                              if (!isNaN(averages[field]) && Number.isFinite(averages[field])) {
                                sortable.push([field, averages[field]]);
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
                  const DATE_QUERY: any = {};

                  if (!topRecord || (Date.parse(topRecord.createdAt) < weekAgo)) {
                    await UniversityUserAverage.create({
                      ...latestAverage,
                      user_id: user._id
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

                  const averages: any = await UniversityUserAverage.findAll({
                    where: {
                      user_id: user._id,
                      createdAt: DATE_QUERY
                    }
                  });

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
      'pending': {
        type: new GraphQLList(UniversityTeamResolver),
        async resolve(user, args, context) {
          if (context.USER._id !== user.user_id && !context.MANAGER) {
            return null;
          }

          return await GetPendingUsersNeedingReview(user, args, context);
        }
      }
    }
  }
});

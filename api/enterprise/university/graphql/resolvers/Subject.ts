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
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

import { UniversitySubject } from '../../models/Subject';
import { UniversityTeamResolver } from './Team';
import { UniversityReviewResolver } from './Review';

import { Op } from 'sequelize';
import { UniversitySubjectAverage } from '../../models/SubjectAverage';
import { GetSubjectAverages } from '../../logic/GetSubjectAverages';
import { GetSubjectTutorials } from '../../logic/GetSubjectTutorials';
import { GetSubjectTeams } from '../../logic/GetSubjectTeams';
import { UniversityOrganisationResolver } from './Organisation';
import { GetSubjectOrganisation } from '../../logic/GetSubjectOrganisation';
import { UniversityUserResolver } from './User';
import { GetSubjectUsers } from '../../logic/GetSubjectUsers';
import { UniversityCommunicationTraitsResolver } from './CommunicationTraits';
import { UniversityCommunicationFacetsResolver } from './CommunicationFacets';
import { UniversityCollaborationTraitsResolver } from './CollaborationTraits';
import { UniversityCollaborationFacetsResolver } from './CollaborationFacets';

export const UniversitySubjectResolver: GraphQLObjectType<UniversitySubject> = new GraphQLObjectType({
  name: 'UniversitySubjectResolver',
  description: 'This represents a UniversitySubject',
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
      'tutorial': {
        type: new GraphQLList(UniversityTeamResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(subject, args, context) {
          return await GetSubjectTutorials(subject, args, context);
        }
      },
      'teams': {
        type: new GraphQLList(UniversityTeamResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(subject, args, context) {
          return await GetSubjectTeams(subject, args, context);
        }
      },
      'organisation': {
        type: UniversityOrganisationResolver,
        async resolve(subject, args, context) {
          return await GetSubjectOrganisation(subject, args, context);
        }
      },
      'users': {
        type: new GraphQLList(UniversityUserResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(subject, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await GetSubjectUsers(subject, args, context);
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'UniversitySubjectAverageReport',
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
                  name: 'UniversitySubjectAverageSingle',
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
                          name: 'UniversitySubjectCommunication',
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
                          name: 'UniversitySubjectCollaboration',
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
                          name: 'UniversitySubjectSortedAverageArray',
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
                async resolve(subject, args, context) {
                  // ALWAYS CALCULATE AND STORE THE NEWEST VALUE IF
                  // THE TOP RECORD IN THE DATABASE IS OLDER THAN A WEEK OLD
                  const latestAverage: any = await GetSubjectAverages(subject, args, context);
                  const topRecord: any = await UniversitySubjectAverage.findOne({
                    where: { subject_id: subject._id },
                    order: [['createdAt', 'DESC']]
                  });

                  const weekAgo = Date.now() - 604800000;
                  const DATE_QUERY: any = {};

                  if (!topRecord || (Date.parse(topRecord.createdAt) < weekAgo)) {
                    await UniversitySubjectAverage.create({
                      ...latestAverage,
                      subject_id: subject._id
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

                  const averages: any = await UniversitySubjectAverage.findAll({
                    where: {
                      subject_id: subject._id,
                      createdAt: DATE_QUERY
                    }
                  });

                  return averages;
                }
              }
            }
          }
        }),
        resolve(subject, args, context) {
          return subject;
        }
      }
    }
  }
});

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

import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from "graphql";
import { UniversitySubjectResolver } from "./Subject";
import { UniversityTutorialAverage } from "../../models/TutorialAverage";
import { Op } from "sequelize";
import { UniversityReviewResolver } from "./Review";
import { GetTutorialAverages } from "../../logic/GetTutorialAverages";
import { GetTutorialSubject } from "../../logic/GetTutorialSubject";
import { UniversityTeamResolver } from "./Team";
import { GetTutorialTeams } from "../../logic/GetTutorialTeams";
import { UniversityOrganisationResolver } from "./Organisation";
import { GetTutorialOrganisation } from "../../logic/GetTutorialOrganisation";
import { UniversityUserResolver } from "./User";
import { GetTutorialUsers } from "../../logic/GetTutorialUsers";
import { UniversityCommunicationTraitsResolver } from "./CommunicationTraits";
import { UniversityCommunicationFacetsResolver } from "./CommunicationFacets";
import { UniversityCollaborationTraitsResolver } from "./CollaborationTraits";
import { UniversityCollaborationFacetsResolver } from "./CollaborationFacets";

export const UniversityTutorialResolver = new GraphQLObjectType({
  name: 'UniversityTutorialResolver',
  description: 'This represents a UniversityTutorial',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(tutorial, args, context) {
          return tutorial._id;
        }
      },
      'name': {
        type: GraphQLString,
        resolve(tutorial, args, context) {
          return tutorial.name;
        }
      },
      'subject': {
        type: UniversitySubjectResolver,
        async resolve(tutorial, args, context) {
          return await GetTutorialSubject(tutorial, args, context);
        }
      },
      'team': {
        type: new GraphQLList(UniversityTeamResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(tutorial, args, context) {
          return await GetTutorialTeams(tutorial, args, context);
        }
      },
      'organisation': {
        type: UniversityOrganisationResolver,
        async resolve(tutorial, args, context) {
          return await GetTutorialOrganisation(tutorial, args, context);
        }
      },
      'users': {
        type: new GraphQLList(UniversityUserResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(tutorial, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await GetTutorialUsers(tutorial, args, context);
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'UniversityTutorialAverageReport',
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
                  name: 'UniversityTutorialAverageSingle',
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
                          name: 'UniversityTutorialSortedAverageArray',
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
                async resolve(tutorial, args, context) {
                  // ALWAYS CALCULATE AND STORE THE NEWEST VALUE IF
                  // THE TOP RECORD IN THE DATABASE IS OLDER THAN A WEEK OLD
                  const latestAverage: any = await GetTutorialAverages(tutorial, args, context);
                  const topRecord: any = await UniversityTutorialAverage.findOne({
                    where: { tutorial_id: tutorial._id },
                    order: [['createdAt', 'DESC']]
                  });

                  const weekAgo = Date.now() - 604800000;
                  const DATE_QUERY: any = {};

                  if (!topRecord || (Date.parse(topRecord.createdAt) < weekAgo)) {
                    await UniversityTutorialAverage.create({
                      ...latestAverage,
                      tutorial_id: tutorial._id
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

                  const averages: any = await UniversityTutorialAverage.findAll({
                    where: {
                      tutorial_id: tutorial._id,
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
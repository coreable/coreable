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

import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat } from "graphql";
import { UniversityOrganisation } from "../../models/Organisation";
import { UniversityTutorialResolver } from "./Tutorial";
import { UniversityTeamResolver } from "./Team";
import { UniversitySubjectResolver } from "./Subject";
import { UniversityUserResolver } from "./User";
import { GetOrganisationUsers } from "../../logic/GetOrganisationUsers";
import { GetOrganisationSubjects } from "../../logic/GetOrganisationSubjects";
import { GetOrganisationTeams } from "../../logic/GetOrganisationTeams";
import { GetOrganisationTutorials } from "../../logic/GetOrganisationTutorials";
import { UniversityOrganisationAverage } from "../../models/OrganisationAverage";
import { Op } from "sequelize";
import { GetOrganisationAverages } from "../../logic/GetOrganisationAverages";
import { UniversityReviewResolver } from "./Review";
import { UniversityCommunicationTraitsResolver } from "./CommunicationTraits";
import { UniversityCommunicationFacetsResolver } from "./CommunicationFacets";
import { UniversityCollaborationTraitsResolver } from "./CollaborationTraits";
import { UniversityCollaborationFacetsResolver } from "./CollaborationFacets";

export const UniversityOrganisationResolver: GraphQLObjectType<UniversityOrganisation> = new GraphQLObjectType({
  name: 'UniversityOrganisationResolver',
  description: 'This represents a UniversityOrganisation',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(organisation, args, context) {
          return organisation._id;
        }
      },
      'name': {
        type: GraphQLString,
        resolve(organisation, args, context) {
          return organisation.name;
        }
      },
      'tutorial': {
        type: new GraphQLList(UniversityTutorialResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(organisation, args, context) {
          return await GetOrganisationTutorials(organisation, args, context);
        }
      },
      'team': {
        type: new GraphQLList(UniversityTeamResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(organisation, args, context) {
          return await GetOrganisationTeams(organisation, args, context);
        }
      },
      'subject': {
        type: new GraphQLList(UniversitySubjectResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(organisation, args, context) {
          return await GetOrganisationSubjects(organisation, args, context);
        }
      },
      'user': {
        type: new GraphQLList(UniversityUserResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(organisation, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await GetOrganisationUsers(organisation, args, context);
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'UniversityOrganisationAverageReport',
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
                  name: 'UniversityOrganisationAverageSingle',
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
                          name: 'UniversityOrganisationCommunication',
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
                          name: 'UniversityOrganisationCollaboration',
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
                          name: 'UniversityOrganisationSortedAverageArray',
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
                async resolve(organisation, args, context) {
                  // ALWAYS CALCULATE AND STORE THE NEWEST VALUE IF
                  // THE TOP RECORD IN THE DATABASE IS OLDER THAN A WEEK OLD
                  const latestAverage: any = await GetOrganisationAverages(organisation, args, context);
                  const topRecord: any = await UniversityOrganisationAverage.findOne({
                    where: { organisation_id: organisation._id },
                    order: [['createdAt', 'DESC']]
                  });

                  const weekAgo = Date.now() - 604800000;
                  const DATE_QUERY: any = {};

                  if (!topRecord || (Date.parse(topRecord.createdAt) < weekAgo)) {
                    await UniversityOrganisationAverage.create({
                      ...latestAverage,
                      subject_id: organisation._id
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

                  const averages: any = await UniversityOrganisationAverage.findAll({
                    where: {
                      organisation_id: organisation._id,
                      createdAt: DATE_QUERY
                    }
                  });

                  return averages;
                }
              }
            }
          }
        }),
        resolve(organisation, args, context) {
          return organisation;
        }
      }
    }
  }
});
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

import { UniversityIndustry } from "../../models/Industry";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList
} from "graphql";

import { UniversityReviewResolver } from "./Review";
import { Op } from "sequelize";
import { UniversityIndustryAverage } from "../../models/IndustryAverage";
import { GetIndustryAverages } from "../../logic/GetIndustryAverages";
import { UniversityUserResolver } from "./User";
import { UniversityUser } from "../../models/User";

export const UniversityIndustryResolver: GraphQLObjectType<UniversityIndustry> = new GraphQLObjectType({
  name: 'UniversityIndustryResolver',
  description: 'UniversityIndustryResolver',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(industry, args, context) {
          return industry._id;
        }
      },
      'name': {
        type: GraphQLString,
        resolve(industry, args, context) {
          return industry.name;
        }
      },
      'users': {
        type: new GraphQLList(UniversityUserResolver),
        async resolve(industry: any, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await UniversityUser.findAll({
            where: {
              industry_id: industry._id
            }
          });
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'UniversityIndustryAverageReport',
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
                  name: 'UniversityIndustryAverageSingle',
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
                          name: 'UniversityIndustrySortedAverageArray',
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
                async resolve(industry, args, context) {
                  // ALWAYS CALCULATE AND STORE THE NEWEST VALUE IF
                  // THE TOP RECORD IN THE DATABASE IS OLDER THAN A WEEK OLD
                  const latestAverage: any = await GetIndustryAverages(industry, args, context);
                  const topRecord: any = await UniversityIndustryAverage.findOne({
                    where: { industry_id: industry._id },
                    order: [ [ 'createdAt', 'DESC' ]]
                  });

                  const weekAgo = Date.now() - 604800000;
                  const DATE_QUERY: any = {};

                  if (!topRecord || (Date.parse(topRecord.createdAt) < weekAgo)) {
                    await UniversityIndustryAverage.create({
                      ...latestAverage,
                      industry_id: industry._id
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

                  const averages: any =  await UniversityIndustryAverage.findAll({
                    where: {
                      industry_id: industry._id,
                      createdAt: DATE_QUERY
                    }
                  });

                  return averages;
                }
              }
            }
          }
        }),
        resolve(industry, args, context) {
          return industry;
        }
      }
    }
  }
});

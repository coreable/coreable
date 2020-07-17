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
  GraphQLFloat,
  GraphQLNonNull,
} from 'graphql';

import { UniversitySubject } from '../../models/Subject';
import { UniversityTeamResolver } from './Team';
import { ReviewResolver } from './Review';
import { sequelize } from '../../../../lib/sequelize';
import { Op } from 'sequelize';
import { SubjectAverage } from '../../models/SubjectAverage';
import { GetSubjectAverages } from '../../logic/GetSubjectAverages';

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
      'teams': {
        type: new GraphQLList(UniversityTeamResolver),
        async resolve(subject: any, args, context) {
          return await subject.getTeams();
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'UniversitySubjectAverageReport',
          fields: () => {
            return {
              'average': {
                type: new GraphQLObjectType({
                  name: 'UniversitySubjectAverageSingle',
                  fields: () => {
                    return {
                      'default': {
                        type: ReviewResolver,
                        resolve(average, args, context) {
                          return average;
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
                      }
                    }
                  }
                }),
                async resolve(subject, args, context) {
                  let averages: any;
                  let week;
                  week = 7 * 60 * 60 * 24 * 1000; // week = 7 * 60 * 60 * 24 * 1000;
                  week = new Date(Date.now() - week);
                  averages = await sequelize.models.SubjectAverage.findOne({
                    where: {
                      subject_id: subject._id,
                      createdAt: {
                        [Op.gte]: week
                      }
                    }
                  });
                  if (averages) {
                    return averages;
                  }
                  averages = await GetSubjectAverages(subject, args, context);
                  averages = await SubjectAverage.create({
                    subject_id: subject._id,
                    calm: averages.dataValues.calm,
                    clearInstructions: averages.dataValues.clearInstructions,
                    cooperatively: averages.dataValues.cooperatively,
                    crossTeam: averages.dataValues.crossTeam,
                    distractions: averages.dataValues.distractions,
                    easilyExplainsComplexIdeas: averages.dataValues.easilyExplainsComplexIdeas,
                    empathy: averages.dataValues.empathy,
                    usesRegulators: averages.dataValues.usesRegulators,
                    influences: averages.dataValues.influences,
                    managesOwn: averages.dataValues.managesOwn,
                    newIdeas: averages.dataValues.newIdeas,
                    openToShare: averages.dataValues.openToShare,
                    positiveBelief: averages.dataValues.positiveBelief,
                    proactive: averages.dataValues.proactive,
                    resilienceFeedback: averages.dataValues.resilienceFeedback,
                    signifiesInterest: averages.dataValues.signifiesInterest,
                    workDemands: averages.dataValues.workDemands,
                  });
                  return averages;
                }
              },
              'averages': {
                type: new GraphQLList(ReviewResolver),
                args: {
                  limit: {
                    type: GraphQLInt,
                  },
                  start: {
                    type: new GraphQLNonNull(GraphQLString),
                  }
                },
                async resolve(subject, args, context) {
                  let averages: any;
                  try {
                    args.start = Date.parse(args.start);
                    args.start = new Date(args.start);
                  } catch (err) {
                    return err;
                  }
                  averages = await sequelize.models.SubjectAverage.findAll({
                    where: {
                      subject_id: subject._id,
                      createdAt: {
                        [Op.gte]: args.start
                      }
                    },
                    limit: args.limit
                  });
                  if (averages) {
                    return averages;
                  }
                  averages = await GetSubjectAverages(subject, args, context);
                  averages = await SubjectAverage.create({
                    subject_id: subject._id,
                    calm: averages.dataValues.calm,
                    clearInstructions: averages.dataValues.clearInstructions,
                    cooperatively: averages.dataValues.cooperatively,
                    crossTeam: averages.dataValues.crossTeam,
                    distractions: averages.dataValues.distractions,
                    easilyExplainsComplexIdeas: averages.dataValues.easilyExplainsComplexIdeas,
                    empathy: averages.dataValues.empathy,
                    usesRegulators: averages.dataValues.usesRegulators,
                    influences: averages.dataValues.influences,
                    managesOwn: averages.dataValues.managesOwn,
                    newIdeas: averages.dataValues.newIdeas,
                    openToShare: averages.dataValues.openToShare,
                    positiveBelief: averages.dataValues.positiveBelief,
                    proactive: averages.dataValues.proactive,
                    resilienceFeedback: averages.dataValues.resilienceFeedback,
                    signifiesInterest: averages.dataValues.signifiesInterest,
                    workDemands: averages.dataValues.workDemands,
                  });
                  if (!Array.isArray(averages)) {
                    averages = [averages];
                  }
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